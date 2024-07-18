import { EventEmitter } from "@angular/core";

export class Auth {
    static authEmitter = new EventEmitter<boolean>();
    
}