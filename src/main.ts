import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet()); 
 
  const config = new DocumentBuilder()
    .setTitle('User-Service')
    .setDescription('User Service : Stores & Handle User Authentication / Authorization & ACL')
    .setVersion('1.0')   
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document,{
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(process.env.PORT);

  console.log(`App running on ${await app.getUrl()}`);

  

}
bootstrap();
