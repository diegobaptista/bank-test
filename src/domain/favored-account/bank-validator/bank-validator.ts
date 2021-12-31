import { BankContextValidator } from "./bank-context-validor";
import { bankRules, defaultRule } from "./bank-rules";

export class BankValidator {
  private rule;

  constructor(public bankContext: BankContextValidator) {
    const { bankCode } = this.bankContext;
    const correctRule = bankRules.find((rule) => rule.bankCode === bankCode);
    this.rule = correctRule;
    if (!correctRule) this.rule = defaultRule;
  }

  validateAgency() {
    const { agencyCode } = this.bankContext;

    const [code, digit] = agencyCode.split("-");

    const codePattern = this.rule.agency.pattern;
    const digitPatern = this.rule.agency.digit.pattern;

    ///////////////////////////////////////////
    const isDigitRequired = this.rule.agency.pattern.required;

    const isCodeMatching = codePattern.test(code);
    const isDigitMatching = digitPatern.test(digit);

    return isCodeMatching && isDigitMatching;
  }

  validateAccount() {
    const { accountCode } = this.bankContext;

    const [code, digit] = accountCode.split("-");

    const codePattern = this.rule.account.pattern;
    const digitPatern = this.rule.account.digit.pattern;

    ///////////////////////////////////////////
    const isDigitRequired = this.rule.account.pattern.required;

    const isCodeMatching = codePattern.test(code);
    const isDigitMatching = digitPatern.test(digit);

    return isCodeMatching && isDigitMatching;
  }

  validateAccountType() {
    const { accountType } = this.bankContext;

    const allowedTypes: [] = this.rule.accountType.allowedTypes;

    console.log(
      allowedTypes,
      accountType,
      allowedTypes.some((type) => type === accountType)
    );
    return allowedTypes.some((type) => type === accountType);
  }
}
