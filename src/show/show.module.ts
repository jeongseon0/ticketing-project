import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { Show } from './entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [ShowController],
  providers: [ShowService],
  exports: [ShowService]
})
export class ShowModule {}
