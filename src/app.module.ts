// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CarpentersModule } from './modules/carpenters/carpenters.module';
import { SlotsModule } from './modules/slots/slots.module';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
  imports: [
    // Loads .env automatically, isGlobal means available everywhere
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // For dev only! Auto-creates/updates tables.
      }),
    }),

    CarpentersModule,
    SlotsModule,
    ReservationsModule,
  ],
})
export class AppModule {}
