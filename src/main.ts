import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle("Multikart Rest API")
    .setDescription("For the Admin and Shop")
    .setVersion("1.0.0-alpha")
    .addTag("users", "navbars")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
