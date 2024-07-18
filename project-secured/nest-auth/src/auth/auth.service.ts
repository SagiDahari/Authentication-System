import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.interface';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
    }

    // registering a user to the database
    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);   
    }
    
    // searching for a user in the database
    async findOneBy(condition: Partial<User>): Promise<User> {
        return await this.userRepository.findOneBy(condition);
    }

    // handle a 3 log-in failure attempts.
    async handleFailedLoginAttempt(user: User) {
        user.loginAttempts += 1;

        if (user.loginAttempts >= 3) {
            user.isLocked = true;
        }

        await this.userRepository.save(user);
    }

    // Resetting the user's login attempts.
    async resetLoginAttempts(user: User) {
        user.loginAttempts = 0;
        await this.userRepository.save(user);
    }

    // Updating the new password in the users DB.
    async update(id: number, data): Promise<any> {
        // Update password history
        return await this.userRepository.update(id, data);
    }
}
