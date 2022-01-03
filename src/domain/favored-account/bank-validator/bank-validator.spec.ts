import { AccountType } from "../../../infrastructure/database/entity/favored-account.entity";
import { Banks } from "./bank-rules";
import { BankValidator } from "./bank-validator";

describe("Agency Validator", () => {
  it("should match banco do brasil agency validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BANCO_DO_BRASIL,
      agencyCode: "4444-5",
      accountCode: "45454545-8",
      accountType: AccountType.CURRENT,
    });
    const result = validator.validateAgency();
    expect(result).toBeTruthy();
  });
  it("should not match banco do brasil agency validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BANCO_DO_BRASIL,
      agencyCode: "44445-9",
      accountCode: "45454545-8",
      accountType: AccountType.CURRENT,
    });
    const result = validator.validateAgency();
    expect(result).toBeFalsy();
  });
  it("should match default agency validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BRADESCO,
      agencyCode: "4444-5",
      accountCode: "45454545-8",
      accountType: AccountType.CURRENT,
    });

    const result = validator.validateAgency();
    expect(result).toBeTruthy();
  });
  it("should not match default agency validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BRADESCO,
      agencyCode: "444488889-2",
      accountCode: "45454545-8",
      accountType: AccountType.CURRENT,
    });

    const result = validator.validateAgency();
    expect(result).toBeFalsy();
  });
});

describe("Account Validator", () => {
  it("should match banco do brasil account validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BANCO_DO_BRASIL,
      agencyCode: "4444-5",
      accountCode: "12345678-8",
      accountType: AccountType.CURRENT,
    });
    const result = validator.validateAccount();
    expect(result).toBeTruthy();
  });
  it("should not match banco do brasil account validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BANCO_DO_BRASIL,
      agencyCode: "44445-9",
      accountCode: "123456789-8",
      accountType: AccountType.CURRENT,
    });
    const result = validator.validateAccount();
    expect(result).toBeFalsy();
  });
  it("should match default account validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BRADESCO,
      agencyCode: "4444-5",
      accountCode: "12345678912-8",
      accountType: AccountType.CURRENT,
    });

    const result = validator.validateAccount();
    expect(result).toBeTruthy();
  });
  it("should not match default account validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BRADESCO,
      agencyCode: "444488889-2",
      accountCode: "1234567891234-8",
      accountType: AccountType.CURRENT,
    });

    const result = validator.validateAccount();
    expect(result).toBeFalsy();
  });
});

describe("AccountType Validator", () => {
  it("should match banco do brasil accountType validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BANCO_DO_BRASIL,
      agencyCode: "4444-5",
      accountCode: "12345678-8",
      accountType: AccountType.CURRENT,
    });
    const result = validator.validateAccountType();
    expect(result).toBeTruthy();
  });
  it("should match banco do brasil accountType validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BANCO_DO_BRASIL,
      agencyCode: "44445-9",
      accountCode: "123456789-8",
      accountType: AccountType.EASY,
    });
    const result = validator.validateAccountType();
    expect(result).toBeTruthy();
  });
  it("should match default account validator", () => {
    const validator = new BankValidator({
      bankCode: Banks.BRADESCO,
      agencyCode: "4444-5",
      accountCode: "12345678912-8",
      accountType: AccountType.EASY,
    });

    const result = validator.validateAccountType();
    expect(result).toBeFalsy();
  });
});

describe("Validate Field", () => {
  it("should return positive to field validation", () => {
    const validator = new BankValidator(null);
    const result = validator.validateField(
      "44448888",
      /^(?:^0*)[1-9][0-9]{0,7}$/,
      true
    );
    expect(result).toBeTruthy();
  });
  it("should return positive to missing field and not required", () => {
    const validator = new BankValidator(null);
    const result = validator.validateField(
      undefined,
      /^(?:^0*)[1-9][0-9]{0,7}$/,
      false
    );
    expect(result).toBeTruthy();
  });

  it("should return negative to missing field and required", () => {
    const validator = new BankValidator(null);
    const result = validator.validateField(
      undefined,
      /^(?:^0*)[1-9][0-9]{0,7}$/,
      true
    );
    expect(result).toBeFalsy();
  });
});
