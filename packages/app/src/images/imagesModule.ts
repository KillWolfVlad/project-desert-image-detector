import {Module} from "@nestjs/common";

import {ImagesController} from "./imagesController";
import {ImagesService} from "./imagesService";
import * as jobs from "./jobs";
import * as useCases from "./useCases";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, ...Object.values(jobs), ...Object.values(useCases)],
})
export class ImagesModule {
}
