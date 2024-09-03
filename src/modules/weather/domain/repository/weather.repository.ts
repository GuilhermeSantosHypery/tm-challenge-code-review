import { WheatherMapper } from '@/weather/application/mapper/weather.mapper';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared/base/base.repository';
import { PrismaRepository } from '@shared/infra/database/prisma/PrismaRepository';
import { WeatherDomain } from '../entity/Weather.domain';

@Injectable()
export class WheatherRepository extends BaseRepository {
  constructor(private prismaWeatherRepository: PrismaRepository) {
    super(prismaWeatherRepository, 'weather', true);
  }
  async findCities(): Promise<WeatherDomain[]> {
    const cities = await this.prismaWeatherRepository.weather.findMany();

    if (!cities.length) {
      return [];
    }

    return cities.map((city) => WheatherMapper.toPersistence(city));
  }

  async findByCity(id: number): Promise<WeatherDomain> {
    const found = await this.prismaWeatherRepository.weather.findFirst({
      where: {
        id: id,
      },
    });

    if (!found) {
      return;
    }

    return WheatherMapper.toPersistence(found);
  }
}
