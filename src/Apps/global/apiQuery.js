import io from 'socket.io-client';
const hostprod = "winapi.herokuapp.com"
const hosttest = "localhost:8000"
const pdfhost = "localhost"
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `https://${hostprod}` : `http://${hosttest}`,
    local: `http://${pdfhost}:3000`
}
export const socket = io("http://localhost:8000")