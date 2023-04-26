import { Module } from "@nestjs/common";

import { ImagesController } from "./imagesController";
import { ImagesService } from "./imagesService";
import * as useCases from "./useCases";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, ...Object.values(useCases)],
})
export class ImagesModule {}
