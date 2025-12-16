import { getWeatherSVG, getForecastSVG, formatWindSpeed } from '../utils/helpers.js';

export default class UI {
    constructor() {
        this.days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    }

    render() {
        const app = document.getElementById('app');
        app.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `
            <div class="container">
                <div class="weather-app">
                    <!-- Header -->
                    <header class="app-header">
                        <div class="header-content">
                            <h1 class="app-title">
                                <i class="fas fa-cloud-sun"></i>
                                <span>Погода</span>
                            </h1>
                            <p class="app-subtitle">Точный прогноз погоды</p>
                        </div>
                    </header>

                    <!-- Search Section -->
                    <section class="search-section">
                        <div class="search-container">
                            <div class="search-box">
                                <i class="fas fa-search search-icon"></i>
                                <input type="text" 
                                       class="search-input" 
                                       id="city-input" 
                                       placeholder="Введите город..."
                                       value="Москва">
                                <button class="clear-btn" id="clear-btn" title="Очистить">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="search-actions">
                                <button class="btn btn-primary" id="search-btn">
                                    <i class="fas fa-search"></i>
                                    <span>Найти</span>
                                </button>
                                <button class="btn btn-secondary" id="location-btn" title="Мое местоположение">
                                    <i class="fas fa-location-arrow"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Quick Cities -->
                        <div class="quick-cities">
                            <span class="quick-label">Быстрый выбор:</span>
                            <div class="city-tags">
                                <button class="city-tag" data-city="Москва">Москва</button>
                                <button class="city-tag" data-city="Санкт-Петербург">СПб</button>
                                <button class="city-tag" data-city="Новосибирск">Новосибирск</button>
                                <button class="city-tag" data-city="Екатеринбург">Екатеринбург</button>
                                <button class="city-tag" data-city="Казань">Казань</button>
                            </div>
                        </div>

                        <!-- Error Message -->
                        <div class="error-message" id="error-message">
                            <i class="fas fa-exclamation-circle"></i>
                            <span id="error-text"></span>
                        </div>
                    </section>

                    <!-- Loading -->
                    <div class="loading" id="loading">
                        <div class="loading-spinner">
                            <div class="spinner"></div>
                            <p>Загрузка данных...</p>
                        </div>
                    </div>

                    <!-- Current Weather -->
                    <main class="weather-main">
                        <div class="current-weather-card">
                            <!-- Weather Icon -->
                            <div class="weather-visual">
                                <div class="weather-icon-large" id="weather-icon-large">
                                    ${getWeatherSVG('clear')}
                                </div>
                                <div class="weather-temp-main">
                                    <div class="temp-value" id="temperature">24°</div>
                                    <div class="temp-label">Сейчас</div>
                                </div>
                            </div>

                            <!-- Weather Info -->
                            <div class="weather-info">
                                <div class="city-info">
                                    <h2 class="city-name" id="city-name">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>Москва, Россия</span>
                                    </h2>
                                    <div class="date-time" id="date-time"></div>
                                </div>

                                <div class="weather-description">
                                    <span id="weather-text">Солнечно</span>
                                    <div class="feels-like" id="feels-like">
                                        Ощущается как <strong>23°</strong>
                                    </div>
                                </div>
                            </div>

                            <!-- Weather Details Grid -->
                            <div class="weather-details-grid">
                                <div class="detail-card">
                                    <div class="detail-icon humidity">
                                        <i class="fas fa-tint"></i>
                                    </div>
                                    <div class="detail-info">
                                        <div class="detail-label">Влажность</div>
                                        <div class="detail-value" id="humidity">65%</div>
                                    </div>
                                </div>

                                <div class="detail-card">
                                    <div class="detail-icon wind">
                                        <i class="fas fa-wind"></i>
                                    </div>
                                    <div class="detail-info">
                                        <div class="detail-label">Ветер</div>
                                        <div class="detail-value" id="wind-speed">12 км/ч</div>
                                    </div>
                                </div>

                                <div class="detail-card">
                                    <div class="detail-icon pressure">
                                        <i class="fas fa-compress-alt"></i>
                                    </div>
                                    <div class="detail-info">
                                        <div class="detail-label">Давление</div>
                                        <div class="detail-value" id="pressure">1013 гПа</div>
                                    </div>
                                </div>

                                <div class="detail-card">
                                    <div class="detail-icon visibility">
                                        <i class="fas fa-eye"></i>
                                    </div>
                                    <div class="detail-info">
                                        <div class="detail-label">Видимость</div>
                                        <div class="detail-value" id="visibility">10 км</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Weather Forecast -->
                        <section class="forecast-section">
                            <h3 class="section-title">
                                <i class="fas fa-calendar-alt"></i>
                                <span>Прогноз на 5 дней</span>
                            </h3>

                            <div class="forecast-cards" id="forecast-list">
                                <!-- Будет заполнено JavaScript -->
                            </div>
                        </section>
                    </main>

                    <!-- Footer -->
                    <footer class="app-footer">
                        <div class="footer-content">
                            <div class="footer-info">
                                <p>Данные предоставлены Open-Meteo</p>
                                <p class="footer-update" id="last-update">Обновлено: только что</p>
                            </div>
                            <div class="theme-toggle">
                                <button class="theme-btn" id="theme-toggle" title="Сменить тему">
                                    <i class="fas fa-moon"></i>
                                </button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        `;
    }

    updateCurrentWeather(data, cityName) {
        // Основная информация
        document.getElementById('city-name').innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            <span>${cityName}</span>
        `;
        
        document.getElementById('temperature').textContent = `${data.temperature}°`;
        document.getElementById('weather-text').textContent = data.description;
        document.getElementById('feels-like').innerHTML = `
            Ощущается как <strong>${data.feelsLike}°</strong>
        `;
        
        // Детали
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('wind-speed').textContent = formatWindSpeed(data.windSpeed);
        document.getElementById('pressure').textContent = `${data.pressure} гПа`;
        document.getElementById('visibility').textContent = '10 км';
        
        // Обновляем иконку
        const iconContainer = document.getElementById('weather-icon-large');
        iconContainer.innerHTML = getWeatherSVG(data.main);
        
        // Обновляем стиль карточки
        this.updateWeatherCardStyle(data.main);
    }

    updateForecast(forecastData) {
        const container = document.getElementById('forecast-list');
        const today = new Date();
        
        container.innerHTML = forecastData.map((forecast, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() + forecast.day);
            
            const dayName = forecast.day === 0 ? 'Сегодня' : this.days[date.getDay()];
            
            return `
                <div class="forecast-card fade-in" style="animation-delay: ${index * 0.1}s">
                    <div class="forecast-day">${dayName}</div>
                    <div class="forecast-image">
                        ${getForecastSVG(forecast.main)}
                    </div>
                    <div class="forecast-temp">
                        <span class="temp-high">${forecast.tempHigh}°</span>
                        <span class="temp-low">${forecast.tempLow}°</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateWeatherCardStyle(weatherType) {
        const card = document.querySelector('.current-weather-card');
        const classes = ['weather-sunny', 'weather-cloudy', 'weather-rainy', 'weather-snowy', 'weather-stormy'];
        
        classes.forEach(cls => card.classList.remove(cls));
        card.classList.add(`weather-${weatherType}`);
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        loading.classList.toggle('show', show);
    }

    showError(message) {
        const errorEl = document.getElementById('error-message');
        const textEl = document.getElementById('error-text');
        
        textEl.textContent = message;
        errorEl.classList.add('show');
        
        setTimeout(() => this.hideError(), 5000);
    }

    hideError() {
        document.getElementById('error-message').classList.remove('show');
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    startClock() {
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 60000);
    }

    updateDateTime() {
        const element = document.getElementById('date-time');
        if (!element) return;
        
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        element.textContent = now.toLocaleDateString('ru-RU', options);
    }

    updateLastUpdateTime() {
        const element = document.getElementById('last-update');
        if (!element) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        element.textContent = `Обновлено: ${timeString}`;
    }
}

