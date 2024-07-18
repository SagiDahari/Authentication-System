import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHistoryEntity } from 'src/auth/models/password_history.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHistoryService {

    constructor(
        @InjectRepository(PasswordHistoryEntity)
        private passwordHistoryRepository: Repository<PasswordHistoryEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {

    }

    // Updating the user's password history every time he changes his password.
    async updatePasswordHistory(user: Partial<User>, hashedNewPassword: string, plainNewPassword: string): Promise<void> {

        const foundUser = await this.userRepository.findOne({
            where: {id: user.id},
            relations: ['passwordHistory'],
          });

        if(!foundUser) {
            throw new NotFoundException("User is not found!");
        }

        // Ensure that the user has an associated PasswordHistoryEntity
        if (!foundUser.passwordHistory) {
            foundUser.passwordHistory = new PasswordHistoryEntity();
            foundUser.passwordHistory.user = foundUser;
            foundUser.passwordHistory.password1 = hashedNewPassword;
            foundUser.passwordHistory.password2 = foundUser.passwordHistory.password3 = '';
        }
        else {
            // Check if the new password is different from the last three passwords
            const isUnique = await this.isPasswordUnique(foundUser, plainNewPassword);
            if (!isUnique) {
                throw new BadRequestException('New password must be different from the last three passwords.');
            }
            // Shift existing passwords
            foundUser.passwordHistory.password3 = foundUser.passwordHistory.password2;
            foundUser.passwordHistory.password2 = foundUser.passwordHistory.password1;
            foundUser.passwordHistory.password1 = hashedNewPassword;
        }
    
        await this.passwordHistoryRepository.save(foundUser.passwordHistory);
      }

    // Method to check if the new password is different from the last three passwords
    async isPasswordUnique(user: User, newPassword: string): Promise<boolean> {
        const { password1, password2, password3 } = user.passwordHistory;

        // Compare hashed passwords
        const isPassword1Match =  await bcrypt.compare(newPassword, password1);
        const isPassword2Match =  await bcrypt.compare(newPassword, password2);
        const isPassword3Match =  await bcrypt.compare(newPassword, password3);

        return !(isPassword1Match || isPassword2Match || isPassword3Match);
    }
    
}
