import { DocumentType } from "../../database/entity/favored.entity";

export class FavoredCreateDto {
  name: string;
  documentType: DocumentType;
  document: string;
}
