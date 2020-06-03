import io from 'socket.io-client';
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? 'http://192.168.43.84:8000' : 'http://192.168.43.84:8000',
    local: 'http://192.168.43.84:3000'
}
export const socket = io(header.url)