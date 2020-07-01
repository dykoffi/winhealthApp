import io from 'socket.io-client';
const hostprod = "winapi.herokuapp.com"
const hosttest = "localhost"
const pdfhost = "localhost"
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `https://${hostprod}` : `http://${hosttest}:8000`,
    local: `http://${pdfhost}:3000`
}
export const socket = io("http://localhost:8000")