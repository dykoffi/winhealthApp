import io from 'socket.io-client';
const apihostprod = `${process.env.API_HOST}:8000`
const apihosttest = `${process.env.API_HOST}:8000`
export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? `https://${apihostprod}` : `http://${apihosttest}`,
}
export const socket = process.env.NODE_ENV === 'production' ? io(`https://${apihostprod}`) : io(`http://${apihosttest}`)
