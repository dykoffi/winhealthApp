export const header = {
    timeout: 1000,
    //url : 'https://apiwin.herokuapp.com',
    url: process.env.NODE_ENV === 'production' ? 'https://apiwin.herokuapp.com' : 'http://192.168.43.84:8000'
}