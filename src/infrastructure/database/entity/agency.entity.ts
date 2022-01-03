import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BankEntity } from "./bank.entity";

@Entity("agency")
export class AgencyEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => BankEntity)
  bank: BankEntity;

  //audit
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: string;
}
