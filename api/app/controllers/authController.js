const axios = require('axios');
const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const { Users } = require('../models');

exports.exchangeCode = async (req, res) => {
  const { code, url } = req.body;
  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: url,
      },
    });
    const userData = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        authorization: `Bearer ${data.access_token}`,
      },
    });
    const [user] = await Users.upsert({
      access_token: data.access_token,
      username: userData.data.email,
      name: userData.data.name,
      type: 'google',
    });
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  } catch (e) {
    error(e);
    res.status(401).json({ loggedIn: false });
  }
};

exports.registerUser = async (req, res) => {
  await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const [user] = await Users.upsert({
      username: req.body.email,
      name: req.body.name,
      password: hash,
      type: 'regular',
    });
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await Users.findAll({ where: { username: email } });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET);
        res.json({ token, loggedIn: true });
      } else {
        console.log('API: Invalid credentials');
        res.json({ loggedIn: false, error: 'Invalid credentials!' });
      }
    });
  } else {
    console.log('API: No user found');
    res.json({ loggedIn: false, error: 'No user found!' });
  }
};
