"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const helmet = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(helmet());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('User-Service')
        .setDescription('User Service : Stores & Handle User Authentication / Authorization & ACL')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
    await app.listen(process.env.PORT);
    console.log(`App running on ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map