import { Injectable } from '@nestjs/common';
import { CreateTicketingDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';

@Injectable()
export class TicketingService {
  create(createTicketingDto: CreateTicketingDto) {
    return 'This action adds a new ticketing';
  }

  findAll() {
    return `This action returns all ticketing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketing`;
  }

  update(id: number, updateTicketingDto: UpdateTicketingDto) {
    return `This action updates a #${id} ticketing`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketing`;
  }
}
