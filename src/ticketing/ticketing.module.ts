import { Module } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { TicketingController } from './ticketing.controller';
import { Ticketing } from './entities/ticketing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ticketing])],
  controllers: [TicketingController],
  providers: [TicketingService],
  exports: [TicketingService]
})
export class TicketingModule {}
