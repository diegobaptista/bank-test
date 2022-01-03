import { getConnection, Repository } from "typeorm";
import { FavoredEntity } from "../../infrastructure/database/entity/favored.entity";

export class FavoredService {
  private favoredRepository: Repository<FavoredEntity>;

  constructor() {
    this.favoredRepository = getConnection().getRepository(FavoredEntity);
  }
  find() {
    return this.favoredRepository.find();
  }
}
