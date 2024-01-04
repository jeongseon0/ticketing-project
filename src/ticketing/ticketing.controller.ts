import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { CreateTicketingDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  create(@Body() createTicketingDto: CreateTicketingDto, @Req() req) {
    return this.ticketingService.create(createTicketingDto.show_id, req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async findAll(@Req() req) {
    return this.ticketingService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ticketingService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTicketingDto: UpdateTicketingDto) {
  //   return this.ticketingService.update(+id, updateTicketingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketingService.remove(+id);
  // }
}
