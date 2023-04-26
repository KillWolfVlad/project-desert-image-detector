import { ApiBody, ApiConsumes, ApiTags } from "@byndyusoft/nest-swagger";
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { UserDto } from "ᐸDtosᐳ";

import { ApiCommonResponses } from "../infrastructure";

import { ImagesService } from "./imagesService";

@ApiTags("Images")
@Controller({
  path: "/images",
  version: "1",
})
export class ImagesController {
  public constructor(private readonly service: ImagesService) {}

  @ApiCommonResponses(HttpStatus.BAD_REQUEST)
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image: {
          type: "string",
          format: "binary",
        },
      },
      required: ["image"],
    },
  })
  @UseInterceptors(FileInterceptor("image"))
  @HttpCode(HttpStatus.OK)
  @Post("/")
  public uploadImage(
    @UploadedFile() image: Express.Multer.File,
  ): Promise<UserDto> {
    return this.service.uploadImage(image);
  }
}
