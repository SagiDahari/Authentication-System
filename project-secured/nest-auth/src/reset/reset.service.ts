import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetEntity } from './reset.entity';
import { Repository } from 'typeorm';
import { Reset } from './reset.interface';

@Injectable()
export class ResetService {
    constructor(
        @InjectRepository(ResetEntity) private readonly resetRepository: Repository<ResetEntity>
    ) {
    }

    // saving the Reset data into the database
    async create(reset: Reset): Promise<Reset> {

        const foundUser = await this.resetRepository.findOne({
            where: {email: reset.email},
          });

        if(!foundUser) {
            return await this.resetRepository.save(reset)
        }
        else { 
            foundUser.token = reset.token;
            foundUser.code = reset.code;
            return await this.resetRepository.save(foundUser);
        }
    }

    // searching for the token in the DB in order to find the email linked to the user's account
    async findOne(condition: Partial <Reset> ): Promise<Reset> {
        return await this.resetRepository.findOneBy(condition);
    }
    // Remove the entry from the reset database after the password has been reset.
    async invalidateToken(email: string): Promise<void> {
        const reset = await this.resetRepository.findOne({ where: { email } });
        if (reset) {
          await this.resetRepository.remove(reset);
        }
      }


}
