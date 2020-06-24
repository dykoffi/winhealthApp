import io from 'socket.io-client';
const host = "localhost"
const pdfhost = "localhost"
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `https://${host}:8000` : `https://${host}:8000`,
    local: `https://${pdfhost}:3000`
}
export const socket = io(header.url)