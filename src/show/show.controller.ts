import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';

@UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createShowDto: CreateShowDto) {
    return await this.showService.create(createShowDto);
  }

  @Get()
  findAll() {
    return this.showService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showService.findOne(+id);
  }

  // @Roles(Role.Admin)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShowDto: UpdateShowDto) {
  //   return this.showService.update(+id, updateShowDto);
  // }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showService.remove(+id);
  }
}
