export async function createEvent(data) {
    const formData: any = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('date', data.date);
    formData.append('time', data.time);
    if (data.type === 'presencial' && data.location) {
        formData.append('location', data.location);
    }
    if (data.image instanceof File) {
        formData.append('image', data.image);
    }
    const response: any = await fetch('/api/events', {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        const error: any = await response.json();
        throw new Error(error.message || 'Error al crear el evento');
    }
    return await response.json();
}
