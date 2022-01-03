import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FavoredAccountCreateUpdateDto } from "../../../presentation/favored-account/favored-account-create.dto";
import { AgencyEntity } from "./agency.entity";
import { FavoredEntity } from "./favored.entity";

@Entity("favored_account")
export class FavoredAccountEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  code: string;

  @Column()
  status: AccountStatus;

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
    id: string,
    accountDto: FavoredAccountCreateUpdateDto,
    agency: AgencyEntity,
    favored: FavoredEntity
  ) {
    const { accountCode, accountType } = accountDto;
    const status = accountDto.status ?? AccountStatus.SKETCH;

    const account = new FavoredAccountEntity();
    account.id = id;
    account.code = accountCode;
    account.status = AccountStatus.SKETCH;
    account.agency = agency;
    account.owner = favored;
    account.status = status;
    account.accountType = accountType;

    return account;
  }
}

export enum AccountStatus {
  SKETCH = "SKETCH",
  VALIDATE = "VALIDATE",
}

export enum AccountType {
  CURRENT = "CURRENT",
  SAVINGS = "SAVINGS",
  EASY = "EASY",
}
