//inicio de desarrollo 11 de julio de 2023.

const axios = require('axios');

let urlconjutodatos = 'https://datosabiertos.gob.ec/api/3/action/package_show?id=violencia-en-los-estadios';



axios.get(urlconjutodatos)
  .then(response => {
    let respuestaconjuntodatos = response.data.result;
    
    for (i = 0; i < respuestaconjuntodatos.length; i++) {
      // imprimir la lista de los nombres de los conjutos de datos numeradas
      //console.log(i+1, listadataset[i]);
      
      // se imprime una cadena de URL, URL que permitirá ir a obtener los detalles de cada conjuto de datos
      
      console.log(i+1, conjutodatos + listadataset[i]);
 

      console.log("TOTAL DE CONJUNTO DE DATOS:", i);

    };

  })
  .catch(error => {
    console.error(error);
  });
