export function getLocationTitle(location) {
    const parts: any = [];
    if (location.city) {
        parts.push(location.city);
    }
    if (location.state) {
        parts.push(location.state);
    }
    if (location.country) {
        parts.push(location.country);
    }
    if (parts.length === 0) {
        return 'Ubicación no especificada';
    }
    return parts.join(', ');
}
