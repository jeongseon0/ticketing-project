import { Injectable } from '@nestjs/common';
// import { CreateTicketingDto } from './dto/create-ticketing.dto';
// import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticketing } from './entities/ticketing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketingService {
  constructor(
    @InjectRepository(Ticketing)
    private readonly ticketingRepository: Repository<Ticketing>
  ) {}

  async create(show_id: number, user_id: number) {
    return await this.ticketingRepository.save({
      show: { id: show_id },
      user: { id: user_id }
    });
  }

  async findAll(user_id: number) {
    const tickets = await this.ticketingRepository.find({ where: { user: { id: user_id } }, relations: ['show'] });

    if (!tickets) {
      throw new Error('Ticket not found');
    }

    return tickets.map((ticket) => {
      const showTitle = ticket.show.title;
      const showLocation = ticket.show.location;
      const showDate = ticket.show.date;
      const showPrice = ticket.show.price;
      return {
        ticketId: ticket.id,
        showTitle,
        showLocation,
        showDate,
        showPrice
      };
    });
  }

  async findOne(id: number) {
    const ticket = await this.ticketingRepository.findOne({ where: { id }, relations: ['show'] });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const showTitle = ticket.show.title;
    const showLocation = ticket.show.location;
    const showDate = ticket.show.date;
    const showPrice = ticket.show.price;

    return {
      ticketId: ticket.id,
      showTitle,
      showLocation,
      showDate,
      showPrice
    };
  }

  // update(id: number, updateTicketingDto: UpdateTicketingDto) {
  //   return `This action updates a #${id} ticketing`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} ticketing`;
  // }
}
