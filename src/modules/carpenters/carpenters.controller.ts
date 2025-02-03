// src/modules/carpenters/carpenters.controller.ts

import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CarpentersService } from './carpenters.service';

@Controller('carpenters')
export class CarpentersController {
  constructor(private readonly carpentersService: CarpentersService) {}

  @Get()
  async getAllCarpenters() {
    return this.carpentersService.findAll();
  }

  @Get(':id')
  async getCarpenter(@Param('id', ParseIntPipe) id: number) {
    return this.carpentersService.findOne(id);
  }

  @Post()
  async createCarpenter(@Body() body: { name: string; contact?: string }) {
    return this.carpentersService.create(body);
  }
}
