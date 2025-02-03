// src/modules/slots/slots.controller.ts

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { SlotsService } from './slots.service';
  
  @Controller('slots')
  export class SlotsController {
    constructor(private readonly slotsService: SlotsService) {}
  
    @Get('available')
    getAvailableSlots() {
      return this.slotsService.findAvailableSlots();
    }
  
    @Post('create')
    createSlot(
      @Body() body: { startTime: string; endTime: string; carpenterId: number },
    ) {
      return this.slotsService.createSlot({
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        carpenter: { id: body.carpenterId } as any,
      });
    }
  
    @Post('book/:id')
    bookSlot(@Param('id', ParseIntPipe) slotId: number) {
      return this.slotsService.bookSlot(slotId);
    }
  
    @Post('cancel/:id')
    cancelSlot(@Param('id', ParseIntPipe) slotId: number) {
      return this.slotsService.freeSlot(slotId);
    }
  }
  