import type { I18nOptions } from 'vue-i18n';

export default {
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      utilities: {
        months: {
          '0': 'January',
          '1': 'February',
          '2': 'March',
          '3': 'April',
          '4': 'May',
          '5': 'June',
          '6': 'July',
          '7': 'August',
          '8': 'September',
          '9': 'October',
          '10': 'November',
          '11': 'December',
        },
        transactionTypes: {
          'invoice': 'Invoice',
          'deposit': 'Deposit',
          'withdrawal': 'Withdrawal',
          'payment': 'Payment',
        },
      }
    }
  }
} as I18nOptions;
