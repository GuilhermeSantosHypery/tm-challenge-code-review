import { WeatherResponseData } from '@/weather/weather.response.data';
import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  API_KEY = '5rlMUfq9kA0DKxIOTX9eZg==xKkXNXcuWp8Q9lRn';
  API_HOST = 'https://api.api-ninjas.com';
  API_VERSION = 'v1';

  constructor(private readonly httpService: HttpService) {}

  private async fetchData(
    path: string,
    params?: Record<string, string>,
  ): Promise<WeatherResponseData> {
    try {
      const rc = {
        headers: {
          'X-Api-Key': this.API_KEY,
          'Content-Type': 'application/json',
        },
      };

      const url = new URL(`${this.API_HOST}/${this.API_VERSION}/${path}`);
      if (params)
        for (const key in params) {
          url.searchParams.append(key, params[key]);
        }

      const { data } = await firstValueFrom(
        this.httpService.get<WeatherResponseData>(url.toString(), rc).pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw error.response.data;
          }),
        ),
      );
      return data;
    } catch (err) {
      throw new InternalServerErrorException({
        descriptionOrOptions: err,
      });
    }
  }

  async getCity(city: string): Promise<WeatherResponseData> {
    try {
      return this.fetchData('weather', { city });
    } catch (err) {
      throw new InternalServerErrorException({
        descriptionOrOptions: err,
      });
    }
  }

  async getCities(cities: string[]): Promise<Array<WeatherResponseData>> {
    const allCitiesPromises: Promise<WeatherResponseData>[] = [];

    cities.forEach((city) => {
      allCitiesPromises.push(this.fetchData('weather', { city }));
    });

    return Promise.all(allCitiesPromises);
  }

  async getAverage(city: string): Promise<number> {
    const { max_temp, min_temp } = await this.getCity(city);
    return (max_temp - min_temp) / 2;
  }
}
