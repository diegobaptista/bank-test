import { getConnection, Repository } from "typeorm";
import { AgencyEntity } from "../../infrastructure/database/entity/agency.entity";
import { BankEntity } from "../../infrastructure/database/entity/bank.entity";
import { FavoredAccountEntity } from "../../infrastructure/database/entity/favored-account.entity";
import { FavoredEntity } from "../../infrastructure/database/entity/favored.entity";
import { FavoredAccountCreateDto } from "../../presentation/favored-account/favored-account-create.dto";
import { FavoredCreateDto } from "../../presentation/favored/favored-create.dto";

export const favoredAccountService = () => {
  const favoredAccountRepository: Repository<FavoredAccountEntity> =
    getConnection().getRepository(FavoredAccountEntity);

  const bankRepository: Repository<BankEntity> =
    getConnection().getRepository(BankEntity);

  const agencyRepository: Repository<AgencyEntity> =
    getConnection().getRepository(AgencyEntity);

  const favoredRepository: Repository<FavoredEntity> =
    getConnection().getRepository(FavoredEntity);

  const verifyAndCreateAgency = async (
    favoredAccountDto: FavoredAccountCreateDto,
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
    favoredAccountDto: FavoredAccountCreateDto
  ) => {
    const { document, documentType, name, email } = favoredAccountDto;

    const favored = await favoredRepository.findOne({
      document,
      documentType,
    });

    if (!favored) {
      return favoredRepository.save({ document, documentType, name, email });
    }

    return favored;
  };

  const findAccountByDocumentAgencyBank = async (
    favoredAccountDto: FavoredAccountCreateDto
  ) => {
    const { bankCode, agencyCode, accountCode, document, documentType } =
      favoredAccountDto;

    return await favoredAccountRepository.findOne(
      {
        owner: { document, documentType },
        agency: { code: agencyCode, bank: { code: bankCode } },
        code: accountCode,
      },
      { relations: ["owner", "agency", "agency.bank"] }
    );
  };

  return {
    find() {
      return favoredAccountRepository.find();
    },

    async create(favoredAccountDto: FavoredAccountCreateDto) {
      const { bankCode } = favoredAccountDto;

      const account = await findAccountByDocumentAgencyBank(favoredAccountDto);

      console.log(account);

      if (account) {
        console.log("account already exists");
        return;
      }

      const bank = await bankRepository.findOne({ code: bankCode });

      console.log(bank);

      if (!bank) {
        console.log("error bank");
        return;
      }

      const favored = await verifyAndCreateFavoured(favoredAccountDto);

      console.log(favored);
      const agency = await verifyAndCreateAgency(favoredAccountDto, bank);

      console.log(agency);

      const accountEntity = FavoredAccountEntity.fromFavoredCreateDto(
        favoredAccountDto,
        agency,
        favored
      );

      console.log(accountEntity);

      favoredAccountRepository.save(accountEntity);
    },

    update(favoredDto: FavoredCreateDto) {
      console.log("not implemented");
    },

    delete(favoredDto: FavoredCreateDto) {
      console.log("not implemented");
    },
  };
};
