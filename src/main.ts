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
    .setVersion("1.0.2-alpha")
    .addTag("users", "Users")
    .addTag("categories", "Category")
    .addTag("menus", "Menu")
    .addTag("menu-childrens", "Children in Menu or Sub Menu")
    .addTag("menu-self-childrens", "Children in Menu or Sub Menu")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidateInputPipe());
  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
});
  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
