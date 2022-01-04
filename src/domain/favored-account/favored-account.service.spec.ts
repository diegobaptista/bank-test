import { getConnection } from "typeorm";
import { AccountType } from "../../infrastructure/database/entity/favored-account.entity";
import { DocumentType } from "../../infrastructure/database/entity/favored.entity";
import { FavoredAccountCreateUpdateDto } from "../../presentation/favored-account/favored-account-create.dto";
import { FavoredAccountService } from "./favored-account.service";
import { FavoredAccountServiceMock } from "./favored-account.service.mock";

const createFavoredMock: FavoredAccountCreateUpdateDto = {
  name: "LEKÃO",
  document: "444.444.456-4",
  documentType: DocumentType.CPF,
  email: "seila@gmail",
  bankCode: "237",
  agencyCode: "4444-4",
  accountCode: "44444446-4",
  accountType: AccountType.CURRENT,
};

describe("Create favored account", () => {
  it("Should throw account already exists", async () => {
    const service = new FavoredAccountServiceMock();

    service["favoredAccountRepository"] = {
      findOne: jest
        .fn()
        .mockResolvedValue({ id: "50250d42-8662-4df3-a463-6e9536817e49" }),
    } as any;

    expect(service.create(createFavoredMock)).rejects.toThrow(
      `Account already exists`
    );
  });
});

describe("Update favored account", () => {
  it("Should throw account don't  exists", async () => {
    const service = new FavoredAccountServiceMock();

    service["favoredAccountRepository"] = {
      findOne: jest.fn().mockResolvedValue(null),
    } as any;

    expect(service.create(createFavoredMock)).rejects.toThrow(
      `Account does not exists`
    );
  });
});
