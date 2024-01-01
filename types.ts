export type TTransactionCategory = {
  id: string;
  code: string;
  color: string;
  tokens: string[];
};

export type TTransaction = {
  id: string;
  hash: string;
  timestamp: number;
  amount: number;
  description: string;
  categoriesIds: string[];
}

export type TFinancialRecord = {
  id: string;
  timestamp: number;
  amount: number;
  description: string;
  categories: Omit<TTransactionCategory, 'tokens'>[];
};

export type TMonthSummary = {
  index: number;
  income: number;
  expenses: number;
  year: number;
};
