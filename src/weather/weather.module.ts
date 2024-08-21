import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { WeatherController } from './infra/controllers/weather.controller';
import { WeatherService } from './application/service/weather.service';


@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {

}