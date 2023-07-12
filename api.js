const axios = require('axios');

axios.get('https://datosabiertos.gob.ec/api/3/action/package_list')
  .then(response => {
    let listadataset = response.data;
    console.log(listadataset.result);
  })
  .catch(error => {
    console.error(error);
  });