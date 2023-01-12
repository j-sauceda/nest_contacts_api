import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);
  const corsHost: string = configService.get('CORS_HOST');
  app.enableCors({
    origin: [corsHost, /\.vercel\.app$/],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('My API documentation')
    .setDescription('This API serves data for a React-based Contact Manager')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('contacts')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5000);
}
bootstrap();
