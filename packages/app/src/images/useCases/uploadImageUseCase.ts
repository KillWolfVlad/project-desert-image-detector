import { Injectable } from "@nestjs/common";

import { UserDto } from "ᐸDtosᐳ";

@Injectable()
export class UploadImageUseCase {
  public execute(image: Express.Multer.File): Promise<UserDto> {
    return Promise.resolve(image.mimetype as unknown as UserDto);
  }
}
