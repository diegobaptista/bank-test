import Joi, { ObjectSchema } from "joi";
import {
  AccountType,
  FavoredAccountStatus,
} from "../../infrastructure/database/entity/favored-account.entity";
import { DocumentType } from "../../infrastructure/database/entity/favored.entity";

export class FavoredAccountCreateDto {
  name: string;
  documentType: DocumentType;
  document: string;
  email: string;
  bankCode: string;
  agencyCode: string;
  accountCode: string;
  accountType: AccountType;
}

export const favoredAccountCreateValidationSchema: ObjectSchema<FavoredAccountCreateDto> =
  Joi.object({
    name: Joi.string().required(),
    document: Joi.string().required(),
    documentType: Joi.string(),
    email: Joi.string().required(),
    bankCode: Joi.string().required(),
    agencyCode: Joi.string().required(),
    accountCode: Joi.string().required(),
    accountType: Joi.string().required(),
  });
