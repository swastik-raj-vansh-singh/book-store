// src/modules/carpenters/carpenters.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Slot } from '../slots/slots.entity';

@Entity()
export class Carpenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  contact?: string;

  @OneToMany(() => Slot, (slot) => slot.carpenter)
  slots: Slot[];
}
