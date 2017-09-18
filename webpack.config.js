module.exports = (env = 'dev') => require('./config/webpack.' + env + '.js')();

/*
npm install webpack --save-dev
npm install webpack-dev-server --save-dev

webpack-dev-server

npm run dev
npm run prod
*/