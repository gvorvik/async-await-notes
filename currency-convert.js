const axios = require('axios');

// const getExchangeRate = (from, to) => {
//     return axios.get(url)
//         .then(response => {
//             const euro = 1 / response.data.rates[from];
//             const rate = euro * response.data.rates[to];
//             return rate;
//         })
//         .catch(err => console.log(err));
// }

const getExchangeRate = async (from, to) => {
    try {
        const url = 'http://data.fixer.io/api/latest?access_key=6a32e796b5cf391e4ef3c14aea03c5ae';
        const response = await axios.get(url);
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        if(isNaN(rate)) {
            throw new Error()
        }
        return rate;
    } catch(e) {
        throw new Error(`Unable to get exchange rate from ${from} and ${to}`);
    }
}

// const getCountries = (currencyCode) => {
//     const url = `https://restcountries.eu/rest/v2/currency/${currencyCode}`;
//     return axios.get(url).then(response => {
//         return response.data.map(country => country.name)
//     })
// }

const getCountries = async (currencyCode) => {
    try{
        const url = `https://restcountries.eu/rest/v2/currency/${currencyCode}`;
        const response = await axios.get(url);
        return response.data.map(country => country.name);
    }catch(e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
}

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to);
//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend this money in the following countries: ${countries.join(', ')}`;
//     });
// }

const convertCurrencyAlt = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const convertedAmount = (rate*amount).toFixed(2);
    const countries = await getCountries(to);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend this money in the following countries: ${countries.join(', ')}`;
}

convertCurrencyAlt('USD', 'CAD', 40)
    .then(string => console.log(string))
    .catch(e=>console.log(e.message));

