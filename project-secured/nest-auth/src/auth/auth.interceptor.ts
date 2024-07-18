import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor( private jwtService: JwtService) {
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies['jwt'];

      if (!this.jwtService.verify(jwt)) {
        throw new UnauthorizedException();
    }} catch (e) {
        throw new UnauthorizedException();
    }
    return next.handle();
  }
}
