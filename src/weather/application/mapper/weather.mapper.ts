import { Prisma } from "@prisma/client";
import { WeatherDomain } from "../domain/entity/Weather.domain";

export class WheatherMapper {
  static toPersistence(
    weather: WeatherDomain
  ): Prisma.weatherUncheckedCreateInput {
    return {
      id: weather._id,
      cloudPct: weather.cloudPct,
      feelsLike: weather.feelsLike,
      humidity: weather.humidity,
      maxTemp: weather.maxTemp,
      minTemp: weather.minTemp,
      sunrise: weather.sunrise,
      sunset: weather.sunset,     

    } as unknown as Prisma.weatherUncheckedCreateInput;
  }
}
