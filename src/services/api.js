import axios from 'axios';

//BASE URL: https://free.currencyconverterapi.com/api/v5/
// > convert?q=USD_BRL&compact=ultra&apiKey=42be2a924ef783a2fde4

const api = axios.create({
    baseURL: 'https://free.currencyconverterapi.com/api/v5'
});

export default api;