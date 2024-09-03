import { WeatherRepository } from '@/weather/domain/repository/weather.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WeatherUseCase {
  constructor(
    @Inject(WeatherRepository)
    private readonly weatherRepository,
  ) {}

  async findAllCities() {
    return await this.weatherRepository.findCities();
  }

  async findOneCity(city: string) {
    return await this.weatherRepository.findCity(city);
  }
}
