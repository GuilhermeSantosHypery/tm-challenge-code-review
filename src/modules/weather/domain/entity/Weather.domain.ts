import { Entity } from '@shared/base/entity';
import { UniqueEntityID } from '@shared/base/UniqueEntityID';

export interface WeatherProps {
  id?: UniqueEntityID;
  cloud_pct: bigint;
  temp: bigint;
  feels_like: bigint;
  humidity: bigint;
  min_temp: bigint;
  max_temp: bigint;
  wind_speed: bigint;
  wind_degrees: bigint;
  sunrise: bigint;
  sunset: bigint;
}

export class WeatherDomain extends Entity<WeatherProps> {
  private constructor(props: WeatherProps, id?: string) {
    super(props, id);
  }

  static create(props: WeatherProps, id?: string) {
    return new WeatherDomain(props, id);
  }

  get cloudPct(): bigint {
    return this.props.cloud_pct;
  }
  get temp(): bigint {
    return this.props.temp;
  }

  get feelsLike(): bigint {
    return this.props.feels_like;
  }
  get humidity(): bigint {
    return this.props.humidity;
  }

  get minTemp(): bigint {
    return this.props.min_temp;
  }

  get maxTemp(): bigint {
    return this.props.max_temp;
  }

  get windSpeed(): bigint {
    return this.props.wind_speed;
  }

  get windDegrees(): bigint {
    return this.props.wind_degrees;
  }

  get sunrise(): bigint {
    return this.props.sunrise;
  }
  get sunset(): bigint {
    return this.props.sunset;
  }
}
