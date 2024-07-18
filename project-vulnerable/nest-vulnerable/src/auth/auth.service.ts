import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository, DataSource } from 'typeorm';
import { User } from './models/user.interface';




@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly dataSource: DataSource
    ) {
    }

     // Registering a user to the database
     async create(user: User): Promise<User> {
        const query = `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}')`;
        await this.dataSource.query(query);
        return user;
    }

    // Searching for a user in the database
    async isValidAccount(email: string, password: string): Promise<User> {
        const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
        console.log('Generated SQL Query for findOneBy:', query);
        const users = await this.dataSource.query(query);
        console.log("Users: ", users);
        return users[0];
    }

    async findOneBy(condition: Partial<User>): Promise<User> {
        const query = `SELECT * FROM users WHERE email = '${condition.email}' LIMIT 1`;
        const users = await this.dataSource.query(query);
        return users[0];
      }

      async findOneByID(condition: Partial<User>): Promise<User> {
        const query = `SELECT * FROM users WHERE id = '${condition.id}' LIMIT 1`;
        const users = await this.dataSource.query(query);
        return users[0];
      }
    
    

    // Handle a 3 log-in failure attempts.
    async handleFailedLoginAttempt(user: User) {
        const query = `UPDATE users SET loginAttempts = loginAttempts + 1 WHERE id = ${user.id}`;
        await this.dataSource.query(query);

        if (user.loginAttempts + 1 >= 3) {
            const lockQuery = `UPDATE users SET isLocked = true WHERE id = ${user.id}`;
            await this.dataSource.query(lockQuery);
        }
    }

    // Resetting the user's login attempts.
    async resetLoginAttempts(user: User) {
        const query = `UPDATE users SET loginAttempts = 0 WHERE id = ${user.id}`;
        await this.dataSource.query(query);
    }

    // Updating the new password in the users DB.
    async update(id: number, data): Promise<any> {
        const query = `UPDATE users SET password = '${data.password}' WHERE id = ${id}`;
        await this.dataSource.query(query);
    }
}

