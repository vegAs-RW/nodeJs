const dayjs = require('dayjs');
const locale_fr = require('dayjs/locale/fr');

dayjs.locale(locale_fr);

function formatDate(dateString) {
  return dayjs(dateString).format('DD MMMM YYYY');
}

module.exports = { formatDate };