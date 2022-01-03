import Joi, { ObjectSchema } from "joi";
import {
  AccountStatus,
  AccountType,
} from "../../infrastructure/database/entity/favored-account.entity";
import { DocumentType } from "../../infrastructure/database/entity/favored.entity";

export class FavoredAccountCreateUpdateDto {
  name: string;
  documentType: DocumentType;
  document: string;
  status?: AccountStatus;
  email: string;
  bankCode: string;
  agencyCode: string;
  accountCode: string;
  accountType: AccountType;
}

export const favoredAccountCreateValidationSchema: ObjectSchema<FavoredAccountCreateUpdateDto> =
  Joi.object({
    name: Joi.string().required(),
    document: Joi.string().required(),
    documentType: Joi.string().required(),
    status: Joi.string().optional(),
    email: Joi.string().required(),
    bankCode: Joi.string().required(),
    agencyCode: Joi.string().required(),
    accountCode: Joi.string().required(),
    accountType: Joi.string().required(),
  });
