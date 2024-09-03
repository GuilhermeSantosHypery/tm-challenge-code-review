import { WheatherRepository } from '@/weather/domain/repository/weather.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WeatherUseCase {
  constructor(
    @Inject(WheatherRepository)
    private readonly wheatherRepository,
  ) {}

  async findAllCities() {
    return await this.wheatherRepository.findCities();
  }

  async findOneCity(city: string) {
    return await this.wheatherRepository.findCity(city);
  }
}
