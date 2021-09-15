const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');

const PORT = 3004;
const app = express();

const indexRouter = require('./routes/indexRouter');
const convertorRouter = require('./routes/convertorRouter');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(morgan('dev'));

app.use('/', indexRouter);
app.use('/convert', convertorRouter);

app.listen(PORT, () => {
  console.log('Server start on ', PORT)
})
