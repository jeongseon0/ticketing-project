import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Repository } from 'typeorm';
import _ from 'lodash';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>
  ) {}

  async create(createShowDto: CreateShowDto) {
    const existShow = await this.findByTitle(createShowDto.title);
    if (existShow) throw new ConflictException('이미 존재하는 공연입니다.');

    const date = new Date(
      createShowDto.date[0],
      createShowDto.date[1],
      createShowDto.date[2],
      createShowDto.date[3],
      createShowDto.date[4],
      createShowDto.date[5]
    );

    return await this.showRepository.save({
      title: createShowDto.title,
      contents: createShowDto.contents,
      image: createShowDto.image,
      location: createShowDto.location,
      date: date,
      category: createShowDto.category
    });
  }

  async findByTitle(title: string) {
    return await this.showRepository.findOneBy({ title });
  }

  async findAll() {
    return await this.showRepository.find({ select: { id: true, title: true, location: true, date: true } });
  }

  async findOne(id: number) {
    return await this.showRepository.findOneBy({ id });
  }

  // async update(id: number, updateShowDto: UpdateShowDto) {
  //   await this.verifyShowById(id);
  //   await this.showRepository.update({ id }, updateShowDto);
  // }

  async remove(id: number) {
    await this.verifyShowById(id);
    await this.showRepository.delete({ id });
  }

  private async verifyShowById(id: number) {
    const show = await this.showRepository.findOneBy({ id });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return show;
  }
}
