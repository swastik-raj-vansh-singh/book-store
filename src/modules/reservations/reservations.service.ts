// src/modules/reservations/reservations.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reservation } from './reservations.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  // Create a new reservation
  async createReservation(userName: string, userContact: string, slotId: number) {
    // In a real-world scenario, ensure that slot is free or handle concurrency
    const reservation = this.reservationRepo.create({
      userName,
      userContact,
      slot: { id: slotId } as any,
    });
    return this.reservationRepo.save(reservation);
  }

  // Get reservation details by ID
  async getReservation(id: number): Promise<Reservation> {
    return this.reservationRepo.findOne({
      where: { id },
      relations: ['slot', 'slot.carpenter'],
    });
  }

  // Cancel reservation
  async cancelReservation(id: number): Promise<void> {
    await this.reservationRepo.delete(id);
  }
}
