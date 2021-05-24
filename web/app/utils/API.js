const axios = require('axios');
const errorLog = require('debug')('web:error');

const api = (req, res, next) => {
  const API = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:4000',
  });

  API.interceptors.response.use(
    (response) => (response ? response.data : {}),
    (error) => {
      errorLog(error);
    },
  );

  API.interceptors.request.use(async (config) => {
    const { token } = req.session;
    if (!token) return config;

    return {
      ...config,
      headers: { common: { token } },
    };
  });

  req.API = API;
  next();
};

module.exports = api;
