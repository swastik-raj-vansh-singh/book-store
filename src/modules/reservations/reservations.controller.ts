// src/modules/reservations/reservations.controller.ts

import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    ParseIntPipe,
    Delete,
  } from '@nestjs/common';
  import { ReservationsService } from './reservations.service';
  
  @Controller('reservations')
  export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}
  
    @Post('create')
    createReservation(
      @Body() body: { userName: string; userContact: string; slotId: number },
    ) {
      return this.reservationsService.createReservation(
        body.userName,
        body.userContact,
        body.slotId,
      );
    }
  
    @Get(':id')
    getReservation(@Param('id', ParseIntPipe) reservationId: number) {
      return this.reservationsService.getReservation(reservationId);
    }
  
    @Delete(':id')
    async cancelReservation(@Param('id', ParseIntPipe) reservationId: number) {
      await this.reservationsService.cancelReservation(reservationId);
      return { message: `Reservation #${reservationId} cancelled.` };
    }
  }
  