import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { CustomerEntity } from './models/customer.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PasswordHistoryModule } from 'src/password_history/password_history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,CustomerEntity]),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '1d' },
    }),
    PasswordHistoryModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
