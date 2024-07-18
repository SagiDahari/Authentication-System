import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHistoryEntity } from 'src/auth/models/password_history.entity';
import { PasswordHistoryService } from './password_history.service';
import { UserEntity } from 'src/auth/models/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PasswordHistoryEntity, UserEntity],
        ),
    ],
    
    providers: [PasswordHistoryService],
    exports: [PasswordHistoryService]
    
})
export class PasswordHistoryModule {}
