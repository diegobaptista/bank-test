import { getConnection, Repository } from "typeorm";
import { AgencyEntity } from "../../infrastructure/database/entity/agency.entity";

export class AgencyService {
  private agencyRepository: Repository<AgencyEntity>;

  constructor() {
    this.agencyRepository = getConnection().getRepository(AgencyEntity);
  }

  find() {
    return this.agencyRepository.find();
  }
}
