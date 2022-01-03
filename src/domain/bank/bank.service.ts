import { Repository } from "typeorm";
import { getConnection } from "typeorm";
import { BankEntity } from "../../infrastructure/database/entity/bank.entity";

export class BankService {
  private bankRepository: Repository<BankEntity>;

  constructor() {
    this.bankRepository = getConnection().getRepository(BankEntity);
  }
  find() {
    return this.bankRepository.find();
  }
}
