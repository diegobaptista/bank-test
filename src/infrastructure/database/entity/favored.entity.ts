import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FavoredAccountEntity } from "./favored-account.entity";

@Entity("favored")
export class FavoredEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => FavoredAccountEntity, (account) => account.owner)
  accounts: FavoredAccountEntity;

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
