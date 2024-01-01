import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { faker } from '@faker-js/faker';

const TRANSACTION_TYPES_COUNT = 10;
const MIN_TRANSACTIONS_PER_MONTH = 10;
const MAX_TRANSACTIONS_PER_MONTH = 50;


const transactionTypes = (new Array(TRANSACTION_TYPES_COUNT).fill('0'))
  .map(() => ({
    id: faker.string.uuid(),
    code: faker.finance.transactionType(),
  }));

const getMonthDate = (monthOrdinal) => {
  const startDate = `2023-${monthOrdinal >= 10 ? monthOrdinal : '0' + monthOrdinal}-01T00:00:00.000Z`;
  const endDate = `2023-${monthOrdinal >= 10 ? monthOrdinal : '0' + monthOrdinal}-28T23:00:00.000Z`;
  return new Date(
    faker.date.between({
      from: startDate,
      to: endDate,
    })
  );
};
const createTransaction = (monthOrdinal) => {
  const transactionDate = getMonthDate(monthOrdinal);

  const transaction = {
    id: faker.string.uuid(),
    timestamp: transactionDate.getTime(),
    amount: parseFloat(faker.finance.amount({ max: 150 }), 10) * -1,
    description: faker.finance.transactionDescription(),
    categories: faker.helpers.arrayElements(transactionTypes, { min: 1, max: 4 }),
  };

  const hash = createHash('sha256');
  hash.update(`${transaction.Date}__${transaction.amount}__${transaction.description}`);
  return {
    ...transaction,
    hash: hash.digest('hex'),
  };
};

const execute = () => {

  const transactions = [];

  for (let index = 12; index > 0; index--) {
    let transactionsCount = faker.number.int({
      min: MIN_TRANSACTIONS_PER_MONTH,
      max: MAX_TRANSACTIONS_PER_MONTH
    });

    for (; transactionsCount > 0; transactionsCount--) {
      transactions.push(createTransaction(index));
    }

    // Salary transaction
    transactions.push({
      id: faker.string.uuid(),
      timestamp: getMonthDate(index).getTime(),
      amount: 1500,
      description: 'Company salary',
      categories: [],
      hash: faker.string.uuid(),
    });
  }

  writeFileSync(
    '../data/transactions.json',
    JSON.stringify(transactions, null, 2),
    { encoding: 'utf-8' }
  );
};

execute();
