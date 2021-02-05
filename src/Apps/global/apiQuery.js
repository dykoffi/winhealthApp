import io from 'socket.io-client';
const apihostprod = `mail.altea-ci.com:35000`
const apihosttest = `${window.location.hostname}:8000`
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `http://${apihostprod}` : `http://${apihosttest}`,
}
export const socket = process.env.NODE_ENV === 'production' ? io(`http://${apihostprod}`) : io(`http://${apihosttest}`)
