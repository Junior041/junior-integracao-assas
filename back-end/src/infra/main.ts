import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HABILITA CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('Junior Integração Assas')
    .setVersion('1.0')
    .addBearerAuth({
      scheme: 'bearer',
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
