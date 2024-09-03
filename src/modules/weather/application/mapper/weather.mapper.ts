import { WeatherDomain } from '@/weather/domain/entity/Weather.domain';
import { Weather } from '@prisma/client';

export class WeatherMapper {
  static toPersistence(weather: Weather): WeatherDomain {
    return WeatherDomain.create(
      {
        cloud_pct: weather.cloudPct,
        feels_like: weather.feelsLike,
        max_temp: weather.maxTemp,
        min_temp: weather.minTemp,
        wind_speed: weather.windSpeed,
        wind_degrees: weather.windDegrees,
        humidity: weather.humidity,
        sunrise: weather.sunrise,
        sunset: weather.sunset,
        temp: weather.temp,
      },
      weather.id,
    );
  }
}
