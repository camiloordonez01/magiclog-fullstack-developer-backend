import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  get dbConfig() {
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<number>('DB_PORT');
    const username = this.configService.get<string>('DB_USER');
    const password = this.configService.get<string>('DB_PASS');
    const database = this.configService.get<string>('DB_NAME');
    return {
        entities: [__dirname + '/../**/*.model{.ts,.js}'],
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
    }
  }

  get jwtConfig() {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
    return {
      secret: secret ?? '12345678',
      expiresIn: expiresIn ?? '1h',
    };
  }
}