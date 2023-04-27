import childProcess from "child_process";
import fs from "fs/promises";
import path from "path";

import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as tf from "@tensorflow/tfjs-node";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import { DetectedObjectDto } from "ᐸDtosᐳ";

@Injectable()
export class UploadImageUseCase implements OnModuleInit, OnModuleDestroy {
  private ffmpegStream!: childProcess.ChildProcessWithoutNullStreams;
  private model!: cocoSsd.ObjectDetection;

  public async execute(
    image: Express.Multer.File,
  ): Promise<DetectedObjectDto[]> {
    const data = tf.node.decodeImage(image.buffer, 3);

    return this.model.detect(data);
  }

  public onModuleDestroy(): void {
    this.ffmpegStream.kill("SIGKILL");
  }

  public async onModuleInit(): Promise<void> {
    this.model = await cocoSsd.load();

    this.ffmpegStream = childProcess.spawn("ffmpeg", [
      "-i",
      "rtsp://IP:8554/", // TODO: use you IP here!
      "-r",
      "1",
      "-f",
      "image2pipe",
      "-vcodec",
      "mjpeg",
      "-q:v",
      "1",
      "-",
    ]);

    let index = 1;

    this.ffmpegStream.stdout.on("data", (data: Buffer) => {
      fs.writeFile(
        path.join(process.cwd(), "tmp_stream", "imgs", `${index++}.jpg`),
        data,
      ).catch((error) => {
        console.error(error);
      });
    });

    // this.stream.on('exit', (code, signal) => {
    //   if (code === 1) {
    //     console.error('RTSP stream exited with error')
    //     this.exitCode = 1
    //     return this.emit('exitWithError')
    //   }
    // })
  }
}
