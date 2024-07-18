import { Injectable } from '@nestjs/common';
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
        return await this.resetRepository.save(reset);
    }

    // searching for the token in the DB in order to find the email linked to the user's account
    async findOne(condition: Partial <Reset> ): Promise<Reset> {
        return await this.resetRepository.findOneBy(condition);
    }


}
