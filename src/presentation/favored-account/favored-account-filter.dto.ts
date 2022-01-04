import Joi, { ObjectSchema } from "joi";

export class FavoredAccountFilterDto {
  name: string[];
  document: string[];
  agencyCode: string[];
  accountCode: string[];
  pageIndex: number;
  pageSize: number;

  static fromQuery(query) {
    const filterOrder = new FavoredAccountFilterDto();

    filterOrder.name = this.parseToArray(query.name);
    filterOrder.agencyCode = this.parseToArray(query.agencyCode);
    filterOrder.accountCode = this.parseToArray(query.accountCode);
    filterOrder.document = this.parseToArray(query.document);
    filterOrder.pageIndex = query.pageIndex;
    filterOrder.pageSize = query.pageSize;

    return filterOrder;
  }

  static parseToArray(field: string): string[] {
    return field?.split(",");
  }
}

export const favoredFilterSchema: ObjectSchema<FavoredAccountFilterDto> =
  Joi.object({
    name: Joi.string().optional(),
    document: Joi.string().optional(),
    agencyCode: Joi.string().optional(),
    accountCode: Joi.string().optional(),
    pageIndex: Joi.number().optional(),
    pageSize: Joi.number().optional(),
  });
