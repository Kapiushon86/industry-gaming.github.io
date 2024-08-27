let consentGiven = false;

document.addEventListener('DOMContentLoaded', function() {
    const notificationModal = document.querySelector('.notification-modal');
    const allowButton = document.getElementById('allow-button');
    const denyButton = document.getElementById('dont-allow-button');
    const infoContainer = document.querySelector('.diagnostics-section');

    allowButton.addEventListener('click', function() {
        consentGiven = true;
        infoContainer.style.display = 'block';
        if (notificationModal) {
            notificationModal.parentNode.removeChild(notificationModal);
        }
        if (consentGiven) {
            initializeRealTimeUpdates();
        }
    });

    denyButton.addEventListener('click', function() {
        if (notificationModal) {
            notificationModal.parentNode.removeChild(notificationModal);
        }
    });
});

function initializeRealTimeUpdates() {
    fetchIPv4Address();
    fetchIPv6Address();
    fetchGeolocationInfo();

    const targetNodes = document.querySelectorAll('#city, #state, #country, #region-code, #timezone, #zip-code, #currency, #calling-code, #language, #latitude, #longitude');
    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                fetchIPv4Address();
                fetchIPv6Address();
                fetchGeolocationInfo();
            }
        });
    });

    const config = { subtree: true, characterData: true, childList: true };
    targetNodes.forEach(node => {
        observer.observe(node, config);
    });
}

// Geolocation

function fetchIPv4Address() {
    fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
            const currentIPv4 = document.getElementById('ipv4-address').textContent;
            const newIPv4 = formatIPv4(data.ip);
            if (currentIPv4 !== newIPv4) {
                document.getElementById('ipv4-address').textContent = newIPv4;
            }
        })
        .catch(error => {
            console.error('Error fetching IPv4 address:', error);
            document.getElementById('ipv4-address').textContent = 'Failed to fetch IPv4 address';
        });
}

function formatIPv4(ip) {
    if (!ip) return 'Unknown';
    let parts = ip.split('.');
    if (parts.length !== 4) return 'Invalid IPv4';
    for (let i = 0; i < parts.length; i++) {
        if (isNaN(parts[i]) || parseInt(parts[i]) < 0 || parseInt(parts[i]) > 255) {
            return 'Invalid IPv4';
        }
    }
    return parts.join('.');
}

function fetchIPv6Address() {
    fetch('https://api64.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
            const currentIPv6 = document.getElementById('ipv6-address').textContent;
            const newIPv6 = data.ip || 'Not Found';
            if (currentIPv6 !== newIPv6) {
                document.getElementById('ipv6-address').textContent = newIPv6;
            }
        })
        .catch(error => {
            console.error('Error fetching IPv6 address:', error);
            document.getElementById('ipv6-address').textContent = 'Failed to fetch IPv6 address';
        });
}

function fetchGeolocationInfo() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            updateGeolocationInfo(data);
        })
        .catch(error => {
            console.error('Error fetching geolocation information:', error);
            updateGeolocationError();
        });
}

function updateGeolocationInfo(data) {
    const cityElement = document.getElementById('city');
    const stateElement = document.getElementById('state');
    const countryElement = document.getElementById('country');
    const regionCodeElement = document.getElementById('region-code');
    const timezoneElement = document.getElementById('timezone');
    const zipCodeElement = document.getElementById('zip-code');
    const currencyElement = document.getElementById('currency');
    const callingCodeElement = document.getElementById('calling-code');
    const languageElement = document.getElementById('language');
    const latitudeElement = document.getElementById('latitude');
    const longitudeElement = document.getElementById('longitude');

    cityElement.textContent = data.city || 'Not Found';
    stateElement.textContent = data.region || 'Not Found';
    countryElement.textContent = data.country_name || 'Not Found';
    regionCodeElement.textContent = data.region_code || 'Not Found';
    timezoneElement.textContent = data.timezone || 'Not Found';
    zipCodeElement.textContent = data.postal || 'Not Found';
    currencyElement.textContent = data.currency || 'Not Found';
    callingCodeElement.textContent = data.country_calling_code || 'Not Found';
    languageElement.textContent = data.languages || 'Not Found';
    latitudeElement.textContent = data.latitude || 'Not Found';
    longitudeElement.textContent = data.longitude || 'Not Found';
}

function updateGeolocationError() {
    const cityElement = document.getElementById('city');
    const stateElement = document.getElementById('state');
    const countryElement = document.getElementById('country');
    const regionCodeElement = document.getElementById('region-code');
    const timezoneElement = document.getElementById('timezone');
    const zipCodeElement = document.getElementById('zip-code');
    const currencyElement = document.getElementById('currency');
    const callingCodeElement = document.getElementById('calling-code');
    const languageElement = document.getElementById('language');
    const latitudeElement = document.getElementById('latitude');
    const longitudeElement = document.getElementById('longitude');

    cityElement.textContent = 'Failed to fetch city';
    stateElement.textContent = 'Failed to fetch state';
    countryElement.textContent = 'Failed to fetch country';
    regionCodeElement.textContent = 'Failed to fetch region code';
    timezoneElement.textContent = 'Failed to fetch timezone';
    zipCodeElement.textContent = 'Failed to fetch ZIP Code';
    currencyElement.textContent = 'Failed to fetch currency';
    callingCodeElement.textContent = 'Failed to fetch calling code';
    languageElement.textContent = 'Failed to fetch language';
    latitudeElement.textContent = 'Failed to fetch latitude';
    longitudeElement.textContent = 'Failed to fetch longitude';
}