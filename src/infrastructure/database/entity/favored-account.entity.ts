import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FavoredAccountCreateDto } from "../../../presentation/favored-account/favored-account-create.dto";
import { AgencyEntity } from "./agency.entity";
import { FavoredEntity } from "./favored.entity";

@Entity("favored_account")
export class FavoredAccountEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  code: string;

  @Column()
  status: FavoredAccountStatus;

  @ManyToOne(() => AgencyEntity)
  agency: AgencyEntity;

  @ManyToOne(() => FavoredEntity)
  owner: FavoredEntity;

  @Column()
  accountType: AccountType;

  //audit
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: string;

  static fromFavoredCreateDto(
    accountDto: FavoredAccountCreateDto,
    agency: AgencyEntity,
    favored: FavoredEntity
  ) {
    const { accountCode, accountType } = accountDto;

    const account = new FavoredAccountEntity();
    account.code = accountCode;
    account.status = FavoredAccountStatus.SKETCH;
    account.agency = agency;
    account.owner = favored;
    account.accountType = accountType;

    return account;
  }
}

export enum FavoredAccountStatus {
  SKETCH = "SKETCH",
  VALIDATE = "VALIDATE",
}

export enum AccountType {
  CURRENT = "CURRENT",
  SAVINGS = "SAVINGS",
  EASY = "EASY",
}
