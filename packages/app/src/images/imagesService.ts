import { Injectable } from "@nestjs/common";

import { DetectedObjectDto } from "ᐸDtosᐳ";

import { UploadImageUseCase } from "./useCases";

@Injectable()
export class ImagesService {
  public constructor(private readonly uploadImageUseCase: UploadImageUseCase) {}

  public uploadImage(image: Express.Multer.File): Promise<DetectedObjectDto[]> {
    return this.uploadImageUseCase.execute(image);
  }
}
