import { createHash } from 'node:crypto';
import xslx from 'node-xlsx';
import { parse } from 'date-fns';
import { TTransaction } from '~/types';
import { saveTransaction } from '../dal/transaction';
import { HttpError } from '~/utils/errors';

const ALLOWED_FILE_TYPES = ['application/vnd.ms-excel'];

function processRawTransaction(transactionData: unknown[]): Omit<TTransaction, 'id'> {
  const [operationDate, , description, amount, balance] = transactionData;
  const hash = createHash('sha256');
  hash.update(`${operationDate}__${amount}__${balance}__${description}`);
  return {
    timestamp: parse(`${operationDate} 08:00`, 'dd/MM/yyyy HH:mm', new Date()).getTime(),
    description: description as string,
    amount: amount as number,
    hash: hash.digest('hex'),
    categories: [],
  };
}

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const transactionsFile = formData?.find(item => item.name === 'transactions_file');

  if (!transactionsFile) {
    throw new HttpError('Transactions file not found in the request', 412);
  }

  if (transactionsFile && !ALLOWED_FILE_TYPES.includes(transactionsFile.type || '')) {
    throw new HttpError('Transactions file must be an Excel one.', 412);
  }

  const workSheets = xslx.parse(transactionsFile.data, {
    type: 'buffer',
  });

  if (workSheets.length !== 1) {
    throw new HttpError('File must contain only one sheet.', 412);
  }

  const [sheet] = workSheets;
  const originalTransactions = sheet.data.slice(8, sheet.data.length);
  const processedTransactions = originalTransactions.map(processRawTransaction);

  let importedTransactionsCount = 0;
  for (const incomingTransaction of processedTransactions) {
    try {
      await saveTransaction(incomingTransaction);
      importedTransactionsCount++;
    } catch (error) {
      console.warn(`Could not import transaction with hash: ${incomingTransaction.hash}`);
      console.log('Transaction date:', new Date(incomingTransaction.timestamp).toISOString());
      console.log(JSON.stringify(incomingTransaction, null, 2));
      console.warn(error);
    }
  }

  return {
    processedTransactionsCount: originalTransactions.length,
    importedTransactionsCount,
  };
});
