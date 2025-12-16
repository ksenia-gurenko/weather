export default class WeatherService {
    constructor() {
        this.OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';
        this.NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
        
        this.cityCoordinates = {
            'москва': { lat: 55.7558, lon: 37.6173, name: 'Москва' },
            'санкт-петербург': { lat: 59.9343, lon: 30.3351, name: 'Санкт-Петербург' },
            'новосибирск': { lat: 55.0084, lon: 82.9357, name: 'Новосибирск' },
            'екатеринбург': { lat: 56.8389, lon: 60.6057, name: 'Екатеринбург' },
            'казань': { lat: 55.7961, lon: 49.1064, name: 'Казань' },
            'нижний новгород': { lat: 56.2965, lon: 43.9361, name: 'Нижний Новгород' },
            'челябинск': { lat: 55.1644, lon: 61.4368, name: 'Челябинск' },
            'самара': { lat: 53.1951, lon: 50.1067, name: 'Самара' },
            'омск': { lat: 54.9885, lon: 73.3242, name: 'Омск' },
            'ростов-на-дону': { lat: 47.2224, lon: 39.7186, name: 'Ростов-на-Дону' }
        };
    }

    async getWeatherByCity(city) {
        const coords = await this.getCityCoordinates(city);
        return await this.getWeatherByCoordinates(coords.lat, coords.lon);
    }

    async getWeatherByCoordinates(lat, lon) {
        try {
            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(`${this.OPEN_METEO_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&timezone=auto`),
                fetch(`${this.OPEN_METEO_URL}?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`)
            ]);

            if (!currentResponse.ok || !forecastResponse.ok) {
                throw new Error('Ошибка получения данных о погоде');
            }

            const [currentData, forecastData] = await Promise.all([
                currentResponse.json(),
                forecastResponse.json()
            ]);

            return {
                current: this.convertCurrentWeather(currentData, lat, lon),
                forecast: this.convertForecast(forecastData)
            };
        } catch (error) {
            console.error('Weather API error:', error);
            throw new Error('Не удалось получить данные о погоде');
        }
    }

    async getCityCoordinates(city) {
        const cityLower = city.toLowerCase().trim();
        
        if (this.cityCoordinates[cityLower]) {
            return this.cityCoordinates[cityLower];
        }

        try {
            const response = await fetch(
                `${this.NOMINATIM_URL}?format=json&q=${encodeURIComponent(city + ', Россия')}&limit=1`
            );

            if (!response.ok) throw new Error('Ошибка геокодирования');

            const data = await response.json();
            
            if (data.length > 0) {
                const coords = {
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon),
                    name: data[0].display_name.split(',')[0]
                };
                this.cityCoordinates[cityLower] = coords;
                return coords;
            } else {
                throw new Error('Город не найден');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            return this.cityCoordinates['москва'];
        }
    }

    async getCityByCoordinates(lat, lon) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await response.json();
            return data.address.city || data.address.town || data.address.village || 'Ваше местоположение';
        } catch (error) {
            return 'Ваше местоположение';
        }
    }

    convertCurrentWeather(data, lat, lon) {
        const weatherInfo = this.getWeatherInfo(data.current.weather_code);
        
        return {
            temperature: Math.round(data.current.temperature_2m),
            feelsLike: Math.round(data.current.apparent_temperature),
            humidity: data.current.relative_humidity_2m,
            pressure: Math.round(data.current.pressure_msl),
            windSpeed: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code,
            description: weatherInfo.description,
            main: weatherInfo.main,
            coordinates: { lat, lon }
        };
    }

    convertForecast(data) {
        const forecasts = [];
        
        for (let i = 0; i < 5; i++) {
            const weatherInfo = this.getWeatherInfo(data.daily.weather_code[i]);
            
            forecasts.push({
                day: i,
                tempHigh: Math.round(data.daily.temperature_2m_max[i]),
                tempLow: Math.round(data.daily.temperature_2m_min[i]),
                description: weatherInfo.description,
                main: weatherInfo.main,
                weatherCode: data.daily.weather_code[i]
            });
        }
        
        return forecasts;
    }

    getWeatherInfo(weatherCode) {
        const weatherMap = {
            0: { main: 'clear', description: 'ясно' },
            1: { main: 'clear', description: 'преимущественно ясно' },
            2: { main: 'clouds', description: 'переменная облачность' },
            3: { main: 'clouds', description: 'пасмурно' },
            45: { main: 'mist', description: 'туман' },
            51: { main: 'rain', description: 'легкая морось' },
            61: { main: 'rain', description: 'небольшой дождь' },
            63: { main: 'rain', description: 'умеренный дождь' },
            65: { main: 'rain', description: 'сильный дождь' },
            71: { main: 'snow', description: 'небольшой снег' },
            73: { main: 'snow', description: 'умеренный снег' },
            75: { main: 'snow', description: 'сильный снег' },
            95: { main: 'thunderstorm', description: 'гроза' }
        };

        return weatherMap[weatherCode] || { main: 'clear', description: 'ясно' };
    }

    getDemoWeather(city) {
        const temp = 18 + Math.floor(Math.random() * 10) - 3;
        
        return {
            current: {
                temperature: temp,
                feelsLike: temp - 2,
                humidity: 40 + Math.floor(Math.random() * 40),
                pressure: 980 + Math.floor(Math.random() * 40),
                windSpeed: 2 + Math.random() * 8,
                description: 'ясно',
                main: 'clear',
                weatherCode: 800
            },
            forecast: Array.from({ length: 5 }, (_, i) => ({
                day: i,
                tempHigh: temp + Math.floor(Math.random() * 6),
                tempLow: temp - Math.floor(Math.random() * 6),
                description: ['ясно', 'облачно', 'дождь', 'облачно', 'ясно'][i],
                main: ['clear', 'clouds', 'rain', 'clouds', 'clear'][i],
                weatherCode: [800, 802, 500, 802, 800][i]
            }))
        };
    }
}
