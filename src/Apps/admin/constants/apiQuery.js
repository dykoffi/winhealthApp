export const header = {
    timeout: 1000,
    //url : 'https://apiwin.herokuapp.com',
    url: process.env.NODE_ENV === 'production' ? 'http://192.168.43.84:8000' : 'http://192.168.43.84:8000'
}