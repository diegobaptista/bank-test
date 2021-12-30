import { getConnection, Repository } from "typeorm";
import { AgencyEntity } from "../../infrastructure/database/entity/agency.entity";

export const agencyService = () => {
  const agencyRepository: Repository<AgencyEntity> =
    getConnection().getRepository(AgencyEntity);

  return {
    find() {
      return agencyRepository.find();
    },
  };
};
