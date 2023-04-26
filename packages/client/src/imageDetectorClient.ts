import { HttpClient } from "@byndyusoft/nest-http-client";
import { Injectable } from "@nestjs/common";

import { DetectedObjectDto } from "ᐸDtosᐳ";

@Injectable()
export class ImageDetectorClient {
  public constructor(private readonly httpClient: HttpClient) {}

  public uploadImage(request: Buffer): Promise<DetectedObjectDto[]> {
    // TODO: FormData here!

    return this.httpClient.endpoint("POST /images", {
      data: request,
      headers: {},
    });
  }
}
