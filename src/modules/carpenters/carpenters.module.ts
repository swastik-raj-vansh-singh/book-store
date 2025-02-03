// src/modules/carpenters/carpenters.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Carpenter } from './carpenters.entity';
import { CarpentersController } from './carpenters.controller';
import { CarpentersService } from './carpenters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carpenter])],
  controllers: [CarpentersController],
  providers: [CarpentersService],
  exports: [CarpentersService],
})
export class CarpentersModule {}
