import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/shared/base/base.repository";
import { WeatherDomain } from "../../application/domain/entity/Weather.domain";
import { WheatherMapper } from "../../application/mapper/weather.mapper";

import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";

@Injectable()
export class WheatherRepository  extends BaseRepository{
  constructor(private prismaWeatherRepository: PrismaRepository) {
    super(prismaWeatherRepository, "weather", true);
  }
  async findCities(): Promise<WeatherDomain> {
    const found = await this.prismaWeatherRepository.wheather.findMany({      
    });

    if (!found) {
      return;
    }

    return WheatherMapper.toPersistence(found);
  }

  async findByCity(id: string): Promise<WeatherDomain> {
    const found = await this.prismaWeatherRepository.weather.findFirst({
      where: {
        id: id
      }
    });

    if (!found) {
      return;
    }

    return WheatherMapper.toPersistence(found);
  }

}