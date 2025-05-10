export async function reserveTicket(eventId) {
    // TODO: Implementar la llamada real a la API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventId,
                userId: 'current-user-id',
                status: 'confirmed',
                createdAt: new Date().toISOString()
            });
        }, 1000);
    });
}
