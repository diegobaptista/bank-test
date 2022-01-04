import { BankContextValidator } from "./bank-context-validor";
import { bankRules, defaultRule } from "./bank-rules";

export class BankValidator {
  private rule;

  constructor(public bankContext: BankContextValidator) {
    const { bankCode } = this.bankContext ?? {};
    const correctRule = bankRules.find((rule) => rule.bankCode === bankCode);
    this.rule = correctRule;
    if (!correctRule) this.rule = defaultRule;
  }

  validate() {
    const isAgencyValid = this.validateAgency();
    const isAccountValid = this.validateAccount();
    const isAccountTypeValid = this.validateAccountType();

    return isAgencyValid && isAccountValid && isAccountTypeValid;
  }

  validateAgency() {
    const { agencyCode } = this.bankContext;

    const [code, digit] = agencyCode.split("-");
    const { pattern: digitPattern, required: digitRequired } =
      this.rule.agency.digit;

    const { pattern: codePattern, required: codeRequired } = this.rule.agency;

    const isCodeValid = this.validateField(code, codePattern, codeRequired);
    const isDigitValid = this.validateField(digit, digitPattern, digitRequired);

    return isCodeValid && isDigitValid;
  }

  validateAccount() {
    const { accountCode } = this.bankContext;

    const [code, digit] = accountCode.split("-");
    const { pattern: digitPattern, required: digitRequired } =
      this.rule.account.digit;

    const { pattern: codePattern, required: codeRequired } = this.rule.account;

    const isCodeValid = this.validateField(code, codePattern, codeRequired);
    const isDigitValid = this.validateField(digit, digitPattern, digitRequired);

    return isCodeValid && isDigitValid;
  }

  validateField(field: string, pattern: RegExp, required = true) {
    if (field) {
      const isPatternMatching = pattern.test(field);
      return isPatternMatching;
    }
    const isOptional = !required;
    return isOptional;
  }

  validateAccountType() {
    const { accountType } = this.bankContext;

    const allowedTypes: [] = this.rule.accountType.allowedTypes;

    return allowedTypes.some((type) => type === accountType);
  }
}
