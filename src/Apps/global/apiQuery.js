import io from 'socket.io-client';
const hostprod = "winapi.herokuapp.com"
const hosttest = "winapi.herokuapp.com"
const pdfhost = "localhost"
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `https://${hostprod}` : `https://${hosttest}`,
    local: `http://${pdfhost}:3000`
}
export const socket = io(header.url)