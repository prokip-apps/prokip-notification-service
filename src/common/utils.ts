import { randomUUID } from 'crypto';

export class Utils {
  static getReferenceNumber(): string {
    return randomUUID();
  }

  static getOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  static getCountryInfo(code) {
    const record: object = {
      '234': {
        currencyCode: 'NGN',
        currency: 'Naira',
      },
      '233': {
        currencyCode: 'GHC',
        currency: 'Cedis',
      },
      '237': {
        currencyCode: 'CFA',
        currency: 'Franc',
      },
      '27': {
        currencyCode: 'ZAR',
        currency: 'Rand',
      },
      '254': {
        currencyCode: 'KSH',
        currency: 'Kenyan shilling',
      },
      '255': {
        currencyCode: 'TSH',
        currency: 'Tanzanian shilling',
      },
    };

    return record[code];
  }
}
