import { getConnection, Repository } from "typeorm";
import { AgencyEntity } from "../../infrastructure/database/entity/agency.entity";
import { BankEntity } from "../../infrastructure/database/entity/bank.entity";
import {
  AccountStatus,
  FavoredAccountEntity,
} from "../../infrastructure/database/entity/favored-account.entity";
import { FavoredEntity } from "../../infrastructure/database/entity/favored.entity";
import { FavoredAccountCreateUpdateDto } from "../../presentation/favored-account/favored-account-create.dto";
import { FavoredCreateDto } from "../../presentation/favored/favored-create.dto";
import { BankValidator } from "./bank-validator/bank-validator";

export const favoredAccountService = () => {
  const favoredAccountRepository: Repository<FavoredAccountEntity> =
    getConnection().getRepository(FavoredAccountEntity);

  const bankRepository: Repository<BankEntity> =
    getConnection().getRepository(BankEntity);

  const agencyRepository: Repository<AgencyEntity> =
    getConnection().getRepository(AgencyEntity);

  const favoredRepository: Repository<FavoredEntity> =
    getConnection().getRepository(FavoredEntity);

  const validateBankInput = (
    favoredAccountDto: FavoredAccountCreateUpdateDto
  ) => {
    const { accountCode, accountType, agencyCode, bankCode } =
      favoredAccountDto;

    const bankValidator = new BankValidator({
      accountCode,
      agencyCode,
      bankCode,
      accountType,
    });

    const isInputValid = bankValidator.validate();
    if (!isInputValid)
      throw new Error(`The input is not valid to bank-code: ${bankCode}`);
  };

  const verifyAndCreateAgency = async (
    favoredAccountDto: FavoredAccountCreateUpdateDto,
    bank: BankEntity
  ) => {
    const { bankCode, agencyCode } = favoredAccountDto;

    const agency = await agencyRepository.findOne(
      { code: agencyCode, bank: { code: bankCode } },
      { relations: ["bank"] }
    );

    if (!agency) {
      return agencyRepository.save({ code: agencyCode, bank });
    }

    return agency;
  };

  const verifyAndCreateFavoured = async (
    favoredAccountDto: FavoredAccountCreateUpdateDto
  ) => {
    const { document, documentType, name, email } = favoredAccountDto;

    const favored = await favoredRepository.findOne({
      document,
      documentType,
    });

    if (!favored) {
      return favoredRepository.save({
        id: favored.id,
        document,
        documentType,
        name,
        email,
      });
    }

    return favored;
  };

  const findAccountByDocumentAgencyBank = async (
    favoredAccountDto: FavoredAccountCreateUpdateDto
  ) => {
    const { bankCode, agencyCode, accountCode, document, documentType } =
      favoredAccountDto;

    return await favoredAccountRepository.findOne(
      {
        agency: { code: agencyCode, bank: { code: bankCode } },
        code: accountCode,
      },
      { relations: ["agency", "agency.bank"] }
    );
  };

  const editAccountAssortmentAndSave = async (
    favoredAccountDto: FavoredAccountCreateUpdateDto,
    id?: string
  ) => {
    const { bankCode } = favoredAccountDto;
    const bank = await bankRepository.findOne({ code: bankCode });

    if (!bank) {
      throw new Error(`Bank does not exists`);
    }

    const favored = await verifyAndCreateFavoured(favoredAccountDto);

    const agency = await verifyAndCreateAgency(favoredAccountDto, bank);

    const accountEntity = FavoredAccountEntity.fromFavoredCreateDto(
      id,
      favoredAccountDto,
      agency,
      favored
    );

    favoredAccountRepository.save(accountEntity);
  };

  return {
    find() {
      return favoredAccountRepository.find();
    },

    async create(favoredAccountDto: FavoredAccountCreateUpdateDto) {
      validateBankInput(favoredAccountDto);

      const account = await findAccountByDocumentAgencyBank(favoredAccountDto);

      console.log(account);

      if (account) {
        throw new Error(`Account already exists`);
      }

      editAccountAssortmentAndSave(favoredAccountDto);
    },

    async update(favoredAccountDto: FavoredAccountCreateUpdateDto, id: string) {
      validateBankInput(favoredAccountDto);
      const account = await findAccountByDocumentAgencyBank(favoredAccountDto);

      if (!account) {
        throw new Error(`Account does not exists`);
      }
      if (account.status === AccountStatus.VALIDATE) {
        throw new Error(`Account with status validated can't be edited`);
      }

      editAccountAssortmentAndSave(favoredAccountDto, id);
    },

    delete(id: string) {
      favoredAccountRepository.softDelete(id);
    },

    deleteByManyIds(ids: string[]) {
      favoredAccountRepository.softDelete(ids);
    },
  };
};
