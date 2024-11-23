import { Injectable } from '@nestjs/common';
import {
  AuthGuard,
  PassportStrategy,
} from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
