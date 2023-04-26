import { Injectable } from "@nestjs/common";

import { UserDto } from "ᐸDtosᐳ";

import { UploadImageUseCase } from "./useCases";

@Injectable()
export class ImagesService {
  public constructor(private readonly uploadImageUseCase: UploadImageUseCase) {}

  public uploadImage(image: Express.Multer.File): Promise<UserDto> {
    return this.uploadImageUseCase.execute(image);
  }
}
