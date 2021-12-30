import { Repository } from "typeorm";
import { getConnection } from "typeorm";
import { BankEntity } from "../../infrastructure/database/entity/bank.entity";

export const bankService = () => {
  const bankRepository: Repository<BankEntity> =
    getConnection().getRepository(BankEntity);

  return {
    find() {
      return bankRepository.find();
    },
  };
};
