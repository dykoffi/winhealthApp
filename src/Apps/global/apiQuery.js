import io from 'socket.io-client';
const apihostprod = `mail.altea-ci.com:35000`
const pdfhostprod = `${process.env.API_HOST}:35000`
//
const apihosttest = `${process.env.API_HOST}:8000`
const pdfhosttest = `${process.env.API_HOST}:8000`
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `http://${apihostprod}` : `http://${apihosttest}`,
    local: process.env.NODE_ENV === 'production' ? `http://${pdfhostprod}` : `http://${pdfhosttest}`,
}
export const socket = process.env.NODE_ENV === 'production' ? io(`http://${apihostprod}`) : io(`http://${apihosttest}`)
