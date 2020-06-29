import io from 'socket.io-client';
const hostprod = "mail.altea-ci.com:35000"
const hosttest = "192.168.16.211"
const pdfhost = "localhost"
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `https://${hostprod}` : `https://${hostprod}`,
    local: `http://${pdfhost}:3000`
}
export const socket = io(header.url)