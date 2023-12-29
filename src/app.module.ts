import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { TicketingModule } from './ticketing/ticketing.module';
import { SeatModule } from './seat/seat.module';

import { User } from './user/entities/user.entity';
import { Show } from './show/entities/show.entity';
import { Ticketing } from './ticketing/entities/ticketing.entity';
import { Seat } from './seat/entities/seat.entity';
import { AuthModule } from './auth/auth.module';

import Joi from 'joi';

const typeOrmModuleOptions = {
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [User, Show, Ticketing, Seat],
    synchronize: configService.get('DB_SYNC'),
    logging: true
  }),
  inject: [ConfigService]
};
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required()
      })
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    ShowModule,
    TicketingModule,
    SeatModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
