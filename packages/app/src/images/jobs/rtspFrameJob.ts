import childProcess from "child_process";
import fs from "fs/promises";
import path from "path";

import {Injectable, OnModuleInit} from "@nestjs/common";
import {Cron, CronExpression} from "@nestjs/schedule";

import {ConfigDto} from "../../infrastructure";

@Injectable()
export class RtspFrameJob implements OnModuleInit {

  private actualData!: Buffer[];
  private readonly filePath = path.join(process.cwd(), "tmp_stream")
  private tempData: Buffer[];

  public constructor(
    private readonly config: ConfigDto
  ) {
    this.tempData = new Array<Buffer>();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  public handler(): void {
    const FFMPEGSARGS = [
      "-i",
      this.config.rtspUrl,
      "-f",
      "image2",
      "-vframes",
      "1",
      "-"]

    const ffmpegStream = childProcess.spawn("ffmpeg", FFMPEGSARGS);

    ffmpegStream.stdout.on("data", (data: Buffer) => {
      this.tempData.push(data);
    });


    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    ffmpegStream.on("exit", async () => {

      this.actualData = [...this.tempData];
      this.tempData = [];

      await fs.writeFile(
        path.join(this.filePath, `${new Date().toISOString()}.jpg`),
        Buffer.concat(this.actualData),
      )
    })
  }

  public getActualImageBuffer(): Buffer[] {
    return this.actualData;
  }

  public async onModuleInit(): Promise<void> {
    await fs.mkdir(this.filePath, {recursive: true})
  }

}
