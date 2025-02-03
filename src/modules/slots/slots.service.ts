// src/modules/slots/slots.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Slot } from './slots.entity';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepo: Repository<Slot>,
  ) {}

  // Return all available slots
  findAvailableSlots() {
    return this.slotRepo.find({
      where: { booked: false },
      relations: ['carpenter'],
    });
  }

  // Create a slot (used for initial seeding or admin panel)
  createSlot(data: Partial<Slot>): Promise<Slot> {
    const slot = this.slotRepo.create(data);
    return this.slotRepo.save(slot);
  }

  // Book a slot by ID (set booked = true)
  async bookSlot(slotId: number): Promise<Slot> {
    const slot = await this.slotRepo.findOneBy({ id: slotId });
    if (!slot) {
      throw new Error('Slot not found');
    }
    slot.booked = true;
    return this.slotRepo.save(slot);
  }

  // Cancel a booked slot (set booked = false)
  async freeSlot(slotId: number): Promise<Slot> {
    const slot = await this.slotRepo.findOneBy({ id: slotId });
    if (!slot) {
      throw new Error('Slot not found');
    }
    slot.booked = false;
    return this.slotRepo.save(slot);
  }
}
