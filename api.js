const axios = require('axios');

axios.get('https://datosabiertos.gob.ec/api/3/action/package_list')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });