import { PasswordHistory } from "./password_history.interface";


export interface User{
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    loginAttempts?: number;
    isLocked?: boolean;
    passwordHistory?: PasswordHistory;


}