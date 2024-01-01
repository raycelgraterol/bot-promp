const axios = require("axios");
const { getMonitor } = require("consulta-dolar-venezuela");


const authenticateAndGetToken = async (username, password) => {
  try {
    const authConfig = {
      method: 'post',
      url: 'https://devapi.laexporterp.com/api/authenticate/login',
      data: {
        username: username,
        password: password,
      },
    };

    const authResponse = await axios(authConfig);
    const token = authResponse.data.token;

    return token;
  } catch (e) {
    console.error('Error authenticating:', e);
    throw e;
  }
};

const getLastValue = async () => {
  try {
    const username = 'raycel.graterol@gmail.com';
    const password = 'Guatire.2023';

    const token = await authenticateAndGetToken(username, password);

    const apiConfig = {
      method: 'get',
      url: 'https://devapi.laexporterp.com/api/ExchangeRate/LastValue',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(apiConfig);
    return response.data;
  } catch (e) {
    console.error('Error getting last value:', e);
    return null;
  }
};

const getValuesMonitor = async () => {
  try {

    const exchangeRates = getMonitor("BCV", "lastUpdate").then($ =>{
      return $;
    });

    return exchangeRates;
  } catch (e) {
    console.error('Error getting monitor value:', e);
    return null;
  }
};

module.exports = { getLastValue, getValuesMonitor };
