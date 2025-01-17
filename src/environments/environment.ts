export class EnvironmentConfig {
  production = false;
  apiUrl = 'https://api.openweathermap.org';
  apiImageUrl = 'https://openweathermap.org';
  weatherApiId = 'abe1eb51289c21c167c66ce790c2fac3';
  forecastApiId = '0f3fb9fa31ad3d41f1bb2bd0841c3f2f';
}

export const environment = new EnvironmentConfig();
