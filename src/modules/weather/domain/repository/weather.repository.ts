import { WeatherMapper } from '@/weather/application/mapper/weather.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@shared/infra/database/prisma/PrismaRepository';
import { WeatherDomain } from '../entity/Weather.domain';

@Injectable()
export class WeatherRepository {
  constructor(private prismaWeatherRepository: PrismaRepository) {}
  async findCities(): Promise<WeatherDomain[]> {
    const cities = await this.prismaWeatherRepository.weather.findMany();

    if (!cities.length) {
      return [];
    }

    return cities.map((city) => WeatherMapper.toPersistence(city));
  }

  async findByCity(id: string): Promise<WeatherDomain | null> {
    const found = await this.prismaWeatherRepository.weather.findFirst({
      where: {
        id: id,
      },
    });

    if (!found) {
      return null;
    }

    return WeatherMapper.toPersistence(found);
  }
}
