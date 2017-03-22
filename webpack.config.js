module.exports = (env = 'dev') => require('./config/webpack.' + env + '.js')();

/*
npm run dev
npm run prod
*/