export class DetectedObjectDto {
  public readonly bbox!: number[];

  public readonly class!: string;

  public readonly score!: number;
}
