import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("favored")
export class FavoredEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  // ????
  @Column()
  status: FavoredStatus;

  @Column()
  documentType: DocumentType;

  @Column()
  document: string;

  //audit
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: string;
}

export enum DocumentType {
  CNPJ = "CNPJ",
  CPF = "CPF",
}

export enum FavoredStatus {
  SKETCH = "SKETCH",
  VALIDATE = "VALIDATE",
}
