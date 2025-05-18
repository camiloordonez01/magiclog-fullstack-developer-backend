import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './filters';
import { ResponseInterceptor } from './interceptors';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(
    new ExceptionsFilter(),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const configService = app.get(AppConfigService);
  await app.listen(configService.port);
}
bootstrap();
