import {DynamicModule, Module} from "@nestjs/common";
import {ScheduleModule} from "@nestjs/schedule";

import {ImagesModule} from "./images/imagesModule";

@Module({})
export class AppModule {
  public static async register(): Promise<DynamicModule> {
    // InfrastructureModule must be imported last, due to decorated providers
    const {InfrastructureModule} = await import(
      "./infrastructure/infrastructureModule"
      );

    return {
      module: AppModule,
      imports: [ImagesModule, ScheduleModule.forRoot(), InfrastructureModule],
    };
  }
}
