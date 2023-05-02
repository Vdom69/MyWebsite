const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/landing.html');

});

app.post('/sendmail', function(req, res) {
  const { message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'vdom6969@gmail.com',
      pass: 'cfjuyoxxwamagwkm'
    }
  });

  const mailOptions = {
    from: 'vdom6969@gmail.com',
    to: 'vica.mikhnevich@gmail.com',
    subject: 'Нове повідомлення',
    html: `
      <p>Повідомлення: ${message}</p>
    `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Помилка при відправці електронної пошти.');
    } else {
      console.log('Email відправлено: ' + info.response);
      res.send('Email відправлено.');
    }
  });
});

app.listen(8080, function() {
  console.log('Сервер запущено на порту 8080.');
});
