import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../types/showCategory.type';

@Index('title', ['title'], { unique: true })
@Entity({ name: 'shows' })
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  contents: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'bigint', nullable: false })
  price: number;

  @Column({ type: 'enum', enum: Category, nullable: false })
  catergory: Category;

  // @ManyToOne(type => Seat, {eager: true})
  // @JoinColumn({name: 'seat_id'})
  // seat: Seat;
}
