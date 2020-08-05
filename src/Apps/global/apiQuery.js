import io from 'socket.io-client';
const apihostprod = "mail.altea-ci.com:35000"
const apihosttest = "localhost:8000"
const pdfhosttest = "localhost:3000"
const pdfhostprod = "localhost:3000"

export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `http://${apihostprod}` : `http://${apihosttest}`,
    local: process.env.NODE_ENV === 'production' ? `https://${pdfhostprod}` : `http://${pdfhosttest}`,
}
export const socket = process.env.NODE_ENV === 'production' ? io(`http://${apihostprod}`) : io(`http://${apihosttest}`)
