import { getConnection, Repository } from "typeorm";
import { FavoredEntity } from "../../infrastructure/database/entity/favored.entity";
import { FavoredCreateDto } from "../../presentation/favored/favored-create.dto";

export const favoredService = () => {
  const favoredRepository: Repository<FavoredEntity> =
    getConnection().getRepository(FavoredEntity);

  return {
    find() {
      return favoredRepository.find();
    },

    create(favoredDto: FavoredCreateDto) {
      const favored = FavoredCreateDto.toFavoredEntity(favoredDto);
      return favoredRepository.save(favored);
    },

    update(favoredDto: FavoredCreateDto) {
      console.log("not implemented");
    },

    delete(favoredDto: FavoredCreateDto) {
      console.log("not implemented");
    },
  };
};
