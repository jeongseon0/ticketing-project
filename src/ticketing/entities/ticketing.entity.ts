import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ticketing' })
export class Ticketing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true, cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Show, { eager: true, cascade: true })
  @JoinColumn({ name: 'show_id' })
  show: Show;
}
