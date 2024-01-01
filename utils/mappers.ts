const transactionTypeColorMapping: Record<string, string> = {
  payment: '#22c55e',
  deposit: '#3b82f6 ',
  withdrawal: '#ec4899',
  invoice: '#f59e0b',
  default: '#6b7280',
};

export const transactionTypeColor = (transactionType: string) =>
  transactionTypeColorMapping[transactionType] || transactionTypeColorMapping.default;

