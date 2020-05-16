import io from 'socket.io-client';
 
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? 'http://192.168.16.125:8000' : 'http://192.168.16.125:8000'
}
export const socket = io(header.url)
