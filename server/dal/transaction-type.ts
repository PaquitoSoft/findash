import { readFile } from 'node:fs/promises';
import { TTransactionCategory } from '~/types';

const DATA_SOURCE_FILE_NAME = './data/transaction_types.json';
type TDataSource = Record<string, TTransactionCategory>;

export const getTransactionTypes = async (): Promise<TTransactionCategory[]> => {
  const fileContents = await readFile(DATA_SOURCE_FILE_NAME, { encoding: 'utf8' });
  const data: TDataSource = JSON.parse(fileContents);
  return Object.values(data);
};
