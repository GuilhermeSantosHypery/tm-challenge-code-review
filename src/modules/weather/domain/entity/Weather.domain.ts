import { Entity } from '@shared/base/entity';

export interface WeatherProps {
  id?: string;
  cloud_pct: number;
  temp: number;
  feels_like: number;
  humidity: number;
  min_temp: number;
  max_temp: number;
  wind_speed: number;
  wind_degrees: number;
  sunrise: Date;
  sunset: Date;
}

export class WeatherDomain extends Entity<WeatherProps, string> {
  private constructor(props: WeatherProps, id?: string) {
    super(props, id);
  }

  static create(props: WeatherProps, id?: string) {
    return new WeatherDomain(props, id);
  }

  get cloudPct(): number {
    return this.props.cloud_pct;
  }
  get temp(): number {
    return this.props.temp;
  }

  get feelsLike(): number {
    return this.props.feels_like;
  }
  get humidity(): number {
    return this.props.humidity;
  }

  get minTemp(): number {
    return this.props.min_temp;
  }

  get maxTemp(): number {
    return this.props.max_temp;
  }

  get windSpeed(): number {
    return this.props.wind_speed;
  }

  get windDegrees(): number {
    return this.props.wind_degrees;
  }

  get sunrise(): Date {
    return this.props.sunrise;
  }
  get sunset(): Date {
    return this.props.sunset;
  }
}
