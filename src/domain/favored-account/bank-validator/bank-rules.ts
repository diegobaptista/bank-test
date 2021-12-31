import { AccountType } from "../../../infrastructure/database/entity/favored-account.entity";

export enum Banks {
  BANCO_DO_BRASIL = "001",
  BRADESCO = "237",
  CAIXA_ECONOMICA_FEDERAL = "104",
  SICOOB = "756",
}

export const bankRules = [
  {
    bankCode: Banks.BANCO_DO_BRASIL,
    agency: {
      required: true,
      pattern: /^(?:^0*)[1-9][0-9]{0,3}$/,
      digit: {
        required: false,
        pattern: /^[xX0-9]{0,1}$/,
      },
    },
    account: {
      required: true,
      pattern: /^(?:^0*)[1-9][0-9]{0,7}$/,
      digit: {
        required: true,
        pattern: /^[xX0-9]{0,1}$/,
      },
    },
    accountType: {
      required: true,
      allowedTypes: [
        AccountType.CURRENT,
        AccountType.SAVINGS,
        AccountType.EASY,
      ],
    },
  },
];

export const defaultRule = {
  agency: {
    required: true,
    pattern: /^(?:^0*)[1-9][0-9]{0,3}$/,
    digit: {
      required: false,
      pattern: /^[xX0-9]{0,1}$/,
    },
  },
  account: {
    required: true,
    pattern: /^(?:^0*)[1-9][0-9]{0,10}$/,
    digit: {
      required: true,
      pattern: /^[0-9]{0,1}$/,
    },
  },
  accountType: {
    required: true,
    allowedTypes: [AccountType.CURRENT, AccountType.SAVINGS],
  },
};

// export const findBankRulesStrategy = (bankCode: string) => {
//   const correctRule = bankRules.find((rule) => rule.bankCode === bankCode);
//   if (!correctRule) return defaultRule;

//   return correctRule;
// };
