import { WheatherMapper } from '@/weather/application/mapper/weather.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@shared/infra/database/prisma/PrismaRepository';
import { WeatherDomain } from '../entity/Weather.domain';

@Injectable()
export class WheatherRepository {
  constructor(private prismaWeatherRepository: PrismaRepository) {}
  async findCities(): Promise<WeatherDomain[]> {
    const cities = await this.prismaWeatherRepository.weather.findMany();

    if (!cities.length) {
      return [];
    }

    return cities.map((city) => WheatherMapper.toPersistence(city));
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

    return WheatherMapper.toPersistence(found);
  }
}
