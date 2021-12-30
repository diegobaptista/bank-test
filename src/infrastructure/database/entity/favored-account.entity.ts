import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AgencyEntity } from "./agency.entity";
import { FavoredEntity } from "./favored.entity";

@Entity("favored_account")
export class FavoredAccountEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  code: string;

  @ManyToOne(() => AgencyEntity)
  agency: AgencyEntity;

  @ManyToOne(() => FavoredEntity)
  owner: FavoredEntity;

  @Column()
  accountType: string;

  //audit
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: string;
}
