import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetModule } from './reset/reset.module';
import { CustomerModule } from './customer/customer.module';
import { PasswordHistoryModule } from './password_history/password_history.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'auth',
      entities: [
        "dist/**/*.entity.js"
      ],
      synchronize: true,
    }),
    ResetModule,
    CustomerModule,
    PasswordHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
