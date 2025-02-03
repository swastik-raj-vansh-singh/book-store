// src/modules/slots/slots.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { Carpenter } from '../carpenters/carpenters.entity';
  import { Reservation } from '../reservations/reservations.entity';
  
  @Entity()
  export class Slot {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    startTime: Date;
  
    @Column()
    endTime: Date;
  
    // If a slot is booked or not
    @Column({ default: false })
    booked: boolean;
  
    // Many slots can belong to one Carpenter
    @ManyToOne(() => Carpenter, (carpenter) => carpenter.slots)
    carpenter: Carpenter;
  
    // Optional: link to Reservation (One-to-One)
    @OneToOne(() => Reservation, (reservation) => reservation.slot, {
      nullable: true,
    })
    @JoinColumn()
    reservation: Reservation | null;
  }
  