import Joi, { ObjectSchema } from "joi";
import {
  DocumentType,
  FavoredEntity,
  FavoredStatus,
} from "../../infrastructure/database/entity/favored.entity";

export class FavoredCreateDto {
  name: string;
  documentType: DocumentType;
  document: string;
  email: string;
  status: FavoredStatus;

  static toFavoredEntity(favoredDto: FavoredCreateDto) {
    const favoredEntity = new FavoredEntity();
    favoredEntity.name = favoredDto.name;
    favoredEntity.documentType = favoredDto.documentType;
    favoredEntity.document = favoredDto.document;
    favoredEntity.email = favoredDto.email;
    favoredEntity.status = favoredDto.status;

    return favoredEntity;
  }
}

export const favoredCreateValidationSchema: ObjectSchema<FavoredCreateDto> =
  Joi.object({
    name: Joi.string().required(),
    document: Joi.string().required(),
    documentType: Joi.string(),
    email: Joi.string().required(),
    status: Joi.string().required(),
  });
