import {Injectable} from "@nestjs/common";
import * as tf from "@tensorflow/tfjs-node";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import {DetectedObjectDto} from "ᐸDtosᐳ";

@Injectable()
export class UploadImageUseCase {
  private model!: cocoSsd.ObjectDetection;

  public async execute(
    image: Express.Multer.File,
  ): Promise<DetectedObjectDto[]> {
    const data = tf.node.decodeImage(image.buffer, 3);

    return this.model.detect(data);
  }
}
