import io from 'socket.io-client';
const apihostprod = "mail.altea-ci.com:35000"
const apihosttest = "192.168.16.211:8000"
const pdfhosttest = "mail.altea-ci.com:36000"
const pdfhostprod = "192.168.16.211:3001"

export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `https://${apihostprod}` : `https://${apihosttest}`,
    local: process.env.NODE_ENV === 'production' ? `https://${pdfhostprod}` : `http://${pdfhosttest}`,
}
export const socket = process.env.NODE_ENV === 'production' ? io(`https://${apihostprod}`) : io(`https://${apihosttest}`)
