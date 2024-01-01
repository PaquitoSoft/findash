import { readFile } from 'node:fs/promises';
import { TTransactionCategory } from '~/types';

const DATA_SOURCE_FILE_NAME = './data/transaction_types.json';
type TDataSource = Record<string, TTransactionCategory>;

let _cachedTransactionTypes: TDataSource;

const read = async (): Promise<TDataSource> => {
  if (!_cachedTransactionTypes) {
    const fileContents = await readFile(DATA_SOURCE_FILE_NAME, { encoding: 'utf8' });
    _cachedTransactionTypes = JSON.parse(fileContents);
  }

  return _cachedTransactionTypes;
};

export const getTransactionTypesMap = read;

export const getTransactionTypes = async (): Promise<TTransactionCategory[]> => {
  const data = await read();
  return Object.values(data);
};

export const resolveTransactionTypes = async (transactionDescription: string): Promise<TTransactionCategory[]> => {
  const allTypes = await getTransactionTypes();
  return allTypes.filter(transactionType => transactionType.tokens.some(token => transactionDescription.toLowerCase().includes(token)));
};
