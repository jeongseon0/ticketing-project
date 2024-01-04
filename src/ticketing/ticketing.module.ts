import { Module } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { TicketingController } from './ticketing.controller';
import { Ticketing } from './entities/ticketing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ShowModule } from 'src/show/show.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticketing]), UserModule, ShowModule],
  controllers: [TicketingController],
  providers: [TicketingService, JwtStrategy],
  exports: [TicketingService]
})
export class TicketingModule {}
