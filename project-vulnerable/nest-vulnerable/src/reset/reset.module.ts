import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { ResetEntity } from './reset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from 'src/auth/auth.module';
import { PasswordHistoryModule } from 'src/password_history/password_history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResetEntity]),
    MailerModule.forRoot({
      transport: {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a6fbbbd57bf6ca",
          pass: "fee006c030a024"
          },
      },
      defaults: {
        from: '"No Reply" <noreply@localhost.com>',
      }
      }),
    AuthModule,
    PasswordHistoryModule
  ],
  providers: [ResetService],
  controllers: [ResetController]
})
export class ResetModule {}
