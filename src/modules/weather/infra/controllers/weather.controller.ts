import { WeatherService } from '@/weather/infra/external/weather.service';
import { WeatherResponseData } from '@/weather/weather.response.data';
import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Injectable,
  Query,
} from '@nestjs/common';

@Injectable()
@Controller('weather')
export class WeatherController {
  constructor(
    @Inject(WeatherService)
    private readonly service: WeatherService,
  ) {}

  @Get('/city')
  @HttpCode(200)
  createAccessToken(@Query('city') city: string): Promise<WeatherResponseData> {
    return this.service.getCity(city);
  }

  @Get('/cities')
  @HttpCode(200)
  getCities(
    @Query('cities') cities: string | string[],
  ): Promise<WeatherResponseData[]> {
    const cityArray = typeof cities === 'string' ? cities.split(',') : cities;
    return this.service.getCities(cityArray);
  }

  @Get('/average')
  @HttpCode(200)
  getAverage(@Query('city') city: string): Promise<number> {
    return this.service.getAverage(city);
  }
}
