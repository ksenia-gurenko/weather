// SVG иконки для погоды
export function getWeatherSVG(weatherType) {
    const svgs = {
        clear: '<svg width="120" height="120" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#FFD700"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
        clouds: '<svg width="120" height="120" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#A3BEDD" stroke="#6991c7" stroke-width="2"/></svg>',
        rain: '<svg width="120" height="120" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#4FACFE" stroke="#00F2FE" stroke-width="2"/><path d="M8 16l2 3M12 16l2 3M16 16l2 3" stroke="#4FACFE" stroke-width="2" stroke-linecap="round"/></svg>',
        snow: '<svg width="120" height="120" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#E6DADA" stroke="#274046" stroke-width="2"/><path d="M8 16l1 1-1 1M12 16l1 1-1 1M16 16l1 1-1 1" stroke="#274046" stroke-width="2" stroke-linecap="round"/></svg>',
        thunderstorm: '<svg width="120" height="120" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#0F2027" stroke="#203A43" stroke-width="2"/><path d="M10 16l4-6 4 6-4-6" stroke="#FFD700" stroke-width="2" fill="none"/></svg>',
        mist: '<svg width="120" height="120" viewBox="0 0 24 24"><path d="M5 10a7 7 0 0 1 14 0" stroke="#606c88" stroke-width="2" fill="none"/><path d="M3 14a7 7 0 0 1 14 0" stroke="#606c88" stroke-width="2" fill="none" opacity="0.7"/><path d="M1 18a7 7 0 0 1 14 0" stroke="#606c88" stroke-width="2" fill="none" opacity="0.4"/></svg>'
    };

    return svgs[weatherType] || svgs.clear;
}

export function getForecastSVG(weatherType) {
    const svgs = {
        clear: '<svg width="60" height="60" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="#FFD700"/><path d="M12 3v1M12 20v1M5.6 5.6l.7.7M17.4 17.4l.7.7M3 12h1M20 12h1M5.6 18.4l.7-.7M17.4 6.6l.7-.7" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
        clouds: '<svg width="60" height="60" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#A3BEDD" stroke="#6991c7" stroke-width="1.5"/></svg>',
        rain: '<svg width="60" height="60" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#4FACFE" stroke="#00F2FE" stroke-width="1.5"/><path d="M9 16l1 2M13 16l1 2M17 16l1 2" stroke="#4FACFE" stroke-width="1.5" stroke-linecap="round"/></svg>',
        snow: '<svg width="60" height="60" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#E6DADA" stroke="#274046" stroke-width="1.5"/><path d="M9 16l.5 1-.5 1M13 16l.5 1-.5 1M17 16l.5 1-.5 1" stroke="#274046" stroke-width="1.5" stroke-linecap="round"/></svg>',
        thunderstorm: '<svg width="60" height="60" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#0F2027" stroke="#203A43" stroke-width="1.5"/><path d="M11 16l2-3 2 3-2-3" stroke="#FFD700" stroke-width="1.5" fill="none"/></svg>',
        mist: '<svg width="60" height="60" viewBox="0 0 24 24"><path d="M6 10a5 5 0 0 1 10 0" stroke="#606c88" stroke-width="1.5" fill="none"/><path d="M4 14a5 5 0 0 1 10 0" stroke="#606c88" stroke-width="1.5" fill="none" opacity="0.7"/></svg>'
    };

    return svgs[weatherType] || svgs.clear;
}

export function formatWindSpeed(speed) {
    return Math.round(speed * 3.6) + ' км/ч';
}

export function formatDate(date) {
    return date.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function animateElement(element, animation = 'fade-in') {
    if (!element) return;
    
    element.classList.add(animation);
    setTimeout(() => {
        element.classList.remove(animation);
    }, 500);
}
