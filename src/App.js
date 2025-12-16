import WeatherService from './services/WeatherService.js';
import UI from './components/UI.js';

export default class App {
    constructor() {
        this.weatherService = new WeatherService();
        this.ui = new UI();
        this.currentCity = 'Москва';
        this.currentTheme = localStorage.getItem('weatherTheme') || 'light';
    }

    async init() {
        this.ui.render();
        this.setupEventListeners();
        this.ui.setTheme(this.currentTheme);
        await this.loadInitialData();
        this.ui.startClock();
    }

    setupEventListeners() {
        // Поиск города
        document.getElementById('search-btn').addEventListener('click', () => {
            const city = document.getElementById('city-input').value.trim();
            if (city) {
                this.getWeatherForCity(city);
            } else {
                this.ui.showError('Пожалуйста, введите название города');
            }
        });

        // Поиск по Enter
        document.getElementById('city-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('search-btn').click();
            }
        });

        // Геолокация
        document.getElementById('location-btn').addEventListener('click', () => {
            this.getUserLocation();
        });

        // Очистка поля
        document.getElementById('clear-btn').addEventListener('click', () => {
            document.getElementById('city-input').value = '';
        });

        // Переключение темы
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Быстрый выбор городов
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('city-tag')) {
                const city = e.target.dataset.city;
                document.getElementById('city-input').value = city;
                this.getWeatherForCity(city);
            }
        });
    }

    async loadInitialData() {
        const savedCity = localStorage.getItem('weatherCity') || 'Москва';
        document.getElementById('city-input').value = savedCity;
        await this.getWeatherForCity(savedCity);
    }

    async getWeatherForCity(city) {
        this.ui.showLoading(true);
        this.ui.hideError();

        try {
            const weatherData = await this.weatherService.getWeatherByCity(city);
            this.ui.updateCurrentWeather(weatherData, city);
            this.ui.updateForecast(weatherData.forecast);
            this.currentCity = city;
            localStorage.setItem('weatherCity', city);
            this.ui.updateLastUpdateTime();
        } catch (error) {
            console.error('Error:', error);
            this.ui.showError(error.message);
            // Показать демо-данные
            this.showDemoWeather(city);
        } finally {
            this.ui.showLoading(false);
        }
    }

    async getUserLocation() {
        if (!navigator.geolocation) {
            this.ui.showError('Геолокация не поддерживается');
            return;
        }

        this.ui.showLoading(true);

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000,
                    maximumAge: 60000
                });
            });

            const city = await this.weatherService.getCityByCoordinates(
                position.coords.latitude,
                position.coords.longitude
            );

            const weatherData = await this.weatherService.getWeatherByCoordinates(
                position.coords.latitude,
                position.coords.longitude
            );

            this.ui.updateCurrentWeather(weatherData, city);
            this.ui.updateForecast(weatherData.forecast);
            document.getElementById('city-input').value = city;
            this.currentCity = city;
            localStorage.setItem('weatherCity', city);
            this.ui.updateLastUpdateTime();

        } catch (error) {
            console.error('Geolocation error:', error);
            this.ui.showError('Не удалось определить местоположение');
        } finally {
            this.ui.showLoading(false);
        }
    }

    showDemoWeather(city) {
        const demoData = this.weatherService.getDemoWeather(city);
        this.ui.updateCurrentWeather(demoData, city);
        this.ui.updateForecast(demoData.forecast);
        localStorage.setItem('weatherCity', city);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('weatherTheme', this.currentTheme);
        this.ui.setTheme(this.currentTheme);
    }
}
