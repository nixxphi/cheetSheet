// location.util.js

/**
 * We get the user's current location using the browser's Geolocation API.
 * @returns {Promise<{latitude: number, longitude: number}>} A promise that resolves to an object containing the user's latitude and longitude.
 */
export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser'));
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(error);
            }
        );
    });
}

/**
 * Calculate the distance between two geographical coordinates using Haversine formula.
 * @param {number} lat1 Latitude of the first point.
 * @param {number} lon1 Longitude of the first point.
 * @param {number} lat2 Latitude of the second point.
 * @param {number} lon2 Longitude of the second point.
 * @returns {number} The distance between the two points in kilometers.
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
}

/**
 * Convert degrees to radians.
 * @param {number} degrees The angle in degrees.
 * @returns {number} The angle in radians.
 */
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
