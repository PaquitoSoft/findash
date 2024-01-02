import { readFile, writeFile } from 'node:fs/promises';
import { sub as substractDate } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { TFinancialRecord, TMonthSummary, TTransaction } from '~/types';

const DATA_SOURCE_FILE_NAME = './data/transactions.json';
type TDataSource = Record<string, TTransaction>;
type TGetTransactionsParams = {
  startDate?: Date;
  endDate?: Date;
};

let _cachedTransactions: TDataSource | null;

const read = async (): Promise<TDataSource> => {
  if (!_cachedTransactions) {
    const fileContents = await readFile(DATA_SOURCE_FILE_NAME, { encoding: 'utf8' });
    _cachedTransactions = JSON.parse(fileContents) as TDataSource;
  }
  return _cachedTransactions;
};

const write = async (newData: TDataSource) => {
  await writeFile(DATA_SOURCE_FILE_NAME, JSON.stringify(newData, null, 2), { encoding: 'utf8' });
  _cachedTransactions = null; // Invalidate in-memory cache
};

export const getTransactions = async (params: TGetTransactionsParams = {}): Promise<TTransaction[]> => {
  const data = await read();
  const allTransactions = Object.values(data);

  const startDate = params.startDate ? new Date(params.startDate) : substractDate(new Date(), { months: 1 });
  const endDate = params.endDate ? new Date(params.endDate) : new Date();

  return allTransactions.filter(transaction =>
    startDate.getTime() < transaction.timestamp && transaction.timestamp < endDate.getTime()
  );
};

export const saveTransaction = async (transaction: Omit<TTransaction, 'id'>): Promise<TTransaction> => {
  const data = await read();

  const existingTransaction = Object.values(data).find(_transaction => _transaction.hash === transaction.hash);
  if (existingTransaction) {
    throw new Error('Transaction already exists');
  }

  const newTransaction: TTransaction = {
    ...transaction,
    id: uuidv4(),
  };

  data[newTransaction.id] = newTransaction;
  await write(data);

  return newTransaction;
};

export const updateTransaction = async (transaction: TFinancialRecord): Promise<TTransaction> => {
  const data = await read();

  if (!data[transaction.id]) {
    throw new Error('Transaction to be updated does not exist.');
  }

  data[transaction.id] = {
    ...data[transaction.id],
    timestamp: transaction.timestamp,
    amount: transaction.amount,
    description: transaction.description,
    categoriesIds: transaction.categories.map(category => category.id),
  };

  await write(data);

  return data[transaction.id];
};

const getMonthSummary = async (monthDate: Date): Promise<TMonthSummary> => {
  const data = await read();
  const allTransactions = Object.values(data);

  const monthTransactions = allTransactions
  .filter(transaction => {
    const tDate = new Date(transaction.timestamp);
    return tDate.getMonth() === monthDate.getMonth() && tDate.getFullYear() === monthDate.getFullYear();
  });
  console.log(`===> ${monthTransactions.length} transactions for month ${monthDate.getMonth()} from year ${monthDate.getFullYear()}`);

  return allTransactions
    .filter(transaction => {
      const tDate = new Date(transaction.timestamp);
      return tDate.getMonth() === monthDate.getMonth() && tDate.getFullYear() === monthDate.getFullYear();
    })
    .reduce<TMonthSummary>(
      (acc, transaction) => {
        if (transaction.amount < 0) {
          acc.expenses += transaction.amount;
        } else {
          acc.income += transaction.amount;
        }
        return acc;
      },
      { year: monthDate.getFullYear(), index: monthDate.getMonth(), income: 0, expenses: 0 }
    );
};

export const getLastMonthsSummary = async (): Promise<TMonthSummary[]> => {
    const currentDate = new Date();
    const getMonthSummaryPromises: Promise<TMonthSummary>[] = [];

    for (let index = 0; index < 6; index++) {
      const monthDate = substractDate(currentDate, { months: index });
      getMonthSummaryPromises.push(getMonthSummary(monthDate));
    }

    const results = await Promise.all(getMonthSummaryPromises);

    return results.reverse();
  };

