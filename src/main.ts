import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import 'dotenv/config';

async function bootstrap() {

  console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
  console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
  console.log('DATABASE_USERNAME:', process.env.DATABASE_USERNAME);
  console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);
  console.log('DATABASE_NAME:', process.env.DATABASE_NAME);

  const app = await NestFactory.create(AppModule);

  // filters and interceptors
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('API contact manager')
    .setDescription('The contacts API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
