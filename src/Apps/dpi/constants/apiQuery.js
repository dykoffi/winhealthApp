export const header = {
    timeout: 1000,
    url: process.env.NODE_ENV === 'production' ? 'https://apiwin.herokuapp.com' : 'http://localhost:8000'
}