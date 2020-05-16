export const header = {
    timeout: 1000,
    //url : 'https://apiwin.herokuapp.com',
    url: process.env.NODE_ENV === 'production' ? 'http://localhost:8000' : 'http://localhost:8000'
}