import io from 'socket.io-client';
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? 'http://localhost:8000' : 'http://localhost:8000',
    local: 'http://localhost:3000'
}
export const socket = io(header.url)