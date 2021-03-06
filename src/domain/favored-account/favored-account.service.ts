import { getConnection, Repository } from "typeorm";
import { AgencyEntity } from "../../infrastructure/database/entity/agency.entity";
import { BankEntity } from "../../infrastructure/database/entity/bank.entity";
import {
  AccountStatus,
  FavoredAccountEntity,
} from "../../infrastructure/database/entity/favored-account.entity";
import { FavoredEntity } from "../../infrastructure/database/entity/favored.entity";
import { OptionalFilter } from "../../infrastructure/database/optiontal-filter";
import { FavoredAccountCreateUpdateDto } from "../../presentation/favored-account/favored-account-create.dto";
import { FavoredAccountFilterDto } from "../../presentation/favored-account/favored-account-filter.dto";
import { BankValidator } from "./bank-validator/bank-validator";

export class FavoredAccountService {
  private favoredAccountRepository: Repository<FavoredAccountEntity>;
  private bankRepository: Repository<BankEntity>;
  private agencyRepository: Repository<AgencyEntity>;
  private favoredRepository: Repository<FavoredEntity>;

  constructor() {
    this.favoredAccountRepository = this.getFavoredAccountRepository();
    this.bankRepository = this.getBankRepository();
    this.agencyRepository = this.getAgencyRepository();
    this.favoredRepository = this.getFavoredRepository();
  }

  getFavoredAccountRepository() {
    return getConnection().getRepository(FavoredAccountEntity);
  }

  getAgencyRepository() {
    return getConnection().getRepository(AgencyEntity);
  }

  getFavoredRepository() {
    return getConnection().getRepository(FavoredEntity);
  }

  getBankRepository() {
    return getConnection().getRepository(BankEntity);
  }

  find(filter: FavoredAccountFilterDto) {
    const { accountCode, agencyCode, document, name, pageIndex, pageSize } =
      filter;

    return this.favoredAccountRepository
      .createQueryBuilder("favored_account")
      .leftJoinAndSelect("favored_account.owner", "owner")
      .leftJoinAndSelect("favored_account.agency", "agency")
      .where(
        OptionalFilter(
          "favored_account.code IN (:...accountCode)",
          accountCode
        ),
        { accountCode }
      )
      .andWhere(OptionalFilter("agency.code IN (:...agencyCode)", agencyCode), {
        agencyCode,
      })
      .andWhere(OptionalFilter("owner.name IN (:...name)", name), { name })
      .andWhere(OptionalFilter("owner.document IN (:...document)", document), {
        document,
      })
      .skip(pageIndex)
      .take(pageSize)
      .getMany();
  }

  async create(favoredAccountDto: FavoredAccountCreateUpdateDto) {
    this.validateBankInput(favoredAccountDto);

    const account = await this.findAccountByDocumentAgencyBank(
      favoredAccountDto
    );

    if (account) {
      throw new Error(`Account already exists`);
    }

    this.editAccountAssortmentAndSave(favoredAccountDto);
  }

  async update(favoredAccountDto: FavoredAccountCreateUpdateDto, id: string) {
    this.validateBankInput(favoredAccountDto);
    const account = await this.findAccountByDocumentAgencyBank(
      favoredAccountDto
    );

    if (!account) {
      throw new Error(`Account does not exists`);
    }
    if (account.status === AccountStatus.VALIDATE) {
      throw new Error(`Account with status validated can't be edited`);
    }

    this.editAccountAssortmentAndSave(favoredAccountDto, id);
  }

  delete(id: string) {
    this.favoredAccountRepository.softDelete(id);
  }

  deleteByManyIds(ids: string[]) {
    this.favoredAccountRepository.softDelete(ids);
  }

  private validateBankInput = (
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

  private verifyAndCreateAgency = async (
    favoredAccountDto: FavoredAccountCreateUpdateDto,
    bank: BankEntity
  ) => {
    const { bankCode, agencyCode } = favoredAccountDto;

    const agency = await this.agencyRepository.findOne(
      { code: agencyCode, bank: { code: bankCode } },
      { relations: ["bank"] }
    );

    if (!agency) {
      return this.agencyRepository.save({ code: agencyCode, bank });
    }

    return agency;
  };

  private async verifyAndCreateFavoured(
    favoredAccountDto: FavoredAccountCreateUpdateDto
  ) {
    const { document, documentType, name, email } = favoredAccountDto;

    const favored = await this.favoredRepository.findOne({
      document,
      documentType,
    });

    if (!favored) {
      return this.favoredRepository.save({
        id: favored.id,
        document,
        documentType,
        name,
        email,
      });
    }

    return favored;
  }

  private async findAccountByDocumentAgencyBank(
    favoredAccountDto: FavoredAccountCreateUpdateDto
  ) {
    const { bankCode, agencyCode, accountCode } = favoredAccountDto;

    return await this.favoredAccountRepository.findOne(
      {
        agency: { code: agencyCode, bank: { code: bankCode } },
        code: accountCode,
      },
      { relations: ["agency", "agency.bank"] }
    );
  }

  private async editAccountAssortmentAndSave(
    favoredAccountDto: FavoredAccountCreateUpdateDto,
    id?: string
  ) {
    const { bankCode } = favoredAccountDto;
    const bank = await this.bankRepository.findOne({ code: bankCode });

    if (!bank) {
      throw new Error(`Bank does not exists`);
    }

    const favored = await this.verifyAndCreateFavoured(favoredAccountDto);

    const agency = await this.verifyAndCreateAgency(favoredAccountDto, bank);

    const accountEntity = FavoredAccountEntity.fromFavoredCreateDto(
      id,
      favoredAccountDto,
      agency,
      favored
    );

    this.favoredAccountRepository.save(accountEntity);
  }
}
