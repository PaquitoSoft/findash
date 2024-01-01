export type TTransactionCategory = {
  id: string;
  code: string;
  color: string;
};

export type TTransaction = {
  id: string;
  hash: string;
  timestamp: number;
  amount: number;
  description: string;
  categories: TTransactionCategory[];
}

export type TFinancialRecord = {
  id: string;
  timestamp: number;
  amount: number;
  description: string;
  categories: TTransactionCategory[];
};

export type TMonthSummary = {
  index: number;
  income: number;
  expenses: number;
  year: number;
};
