// src/modules/carpenters/carpenters.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carpenter } from './carpenters.entity';

@Injectable()
export class CarpentersService {
  constructor(
    @InjectRepository(Carpenter)
    private readonly carpenterRepo: Repository<Carpenter>,
  ) {}

  // Find all carpenters
  findAll(): Promise<Carpenter[]> {
    return this.carpenterRepo.find();
  }

  // Create a new carpenter
  create(data: Partial<Carpenter>): Promise<Carpenter> {
    const carpenter = this.carpenterRepo.create(data);
    return this.carpenterRepo.save(carpenter);
  }

  // For demonstration, optional
  findOne(id: number): Promise<Carpenter> {
    return this.carpenterRepo.findOneBy({ id });
  }
}
