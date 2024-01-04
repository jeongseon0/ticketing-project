import { IsNotEmpty } from 'class-validator';

export class CreateTicketingDto {
  @IsNotEmpty()
  show_id: number;
}
