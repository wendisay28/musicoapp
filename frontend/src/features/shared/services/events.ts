import { apiRequest } from '@/lib/api';
export async function getEvents() {
    const response: any = await apiRequest('GET', '/api/events');
    return response.data;
}
export async function getEvent(id) {
    const response: any = await apiRequest('GET', `/api/events/${id}`);
    return response.data;
}
export async function createEvent(data) {
    const response: any = await apiRequest('POST', '/api/events', data);
    return response.data;
}
export async function updateEvent(id, data) {
    const response: any = await apiRequest('PUT', `/api/events/${id}`, data);
    return response.data;
}
export async function deleteEvent(id) {
    await apiRequest('DELETE', `/api/events/${id}`);
}
