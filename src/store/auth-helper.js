export const authHeaders = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
}