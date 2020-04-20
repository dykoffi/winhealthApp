export const header = {
    timeout: 1000,
    //url : 'https://apiwin.herokuapp.com',
    url: process.env.NODE_ENV === 'production' ? 'https://apiwin.herokuapp.com' : 'http://localhost:8000'
}