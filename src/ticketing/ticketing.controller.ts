import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { CreateTicketingDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { ShowService } from 'src/show/show.service';

@Controller('ticketing')
export class TicketingController {
  constructor(
    private readonly ticketingService: TicketingService,
    private readonly userService: UserService,
    private readonly showService: ShowService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async create(@Body() createTicketingDto: CreateTicketingDto, @Req() req) {
    console.log('유저 아이디 >> ', req.user.id);
    const show = await this.showService.findOne(createTicketingDto.show_id);
    if (!show) throw new BadRequestException('공연 정보를 찾을 수 없습니다.');

    const ticket = await this.ticketingService.create(show.id, req.user.id);
    if (!ticket) throw new BadRequestException('예매 정보를 찾을 수 없습니다.');
    console.log(ticket, req.user.id);

    return await this.userService.usePoint(+req.user.id, show.price);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async findAll(@Req() req) {
    return this.ticketingService.findAll(req.user.id);
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
