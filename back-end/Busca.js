const fs = require('fs');
const csv = require('csv-parser');

// Função para ler o arquivo CSV inteiro, aplicando paginação e busca por nome, número e cidade
function readPage(pageNumber, pageSize, searchTerm, searchCity) {
  const results = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream('dados.csv')
      .pipe(csv({ separator: ';' })) // Especifica o separador como ';'
      .on('data', (data) => {
        // Verifica se o registro corresponde ao termo de busca e à cidade especificada
        if (
          ((searchTerm && (data.NM_CANDIDATO.includes(searchTerm) || data.NR_CANDIDATO.includes(searchTerm))) || !searchTerm) &&
          ((searchCity && data.NM_UE === searchCity) || !searchCity)
        ) {
          // Verifica se o registro está na página atual
          
          if (count >= pageNumber * pageSize && count < (pageNumber + 1) * pageSize) {
            const candidato = {
              name: data.NM_CANDIDATO,
              number: data.NR_CANDIDATO,
              party: data.SG_PARTIDO,
              position: data.DS_CARGO,
              city: data.NM_UE // Adiciona a cidade
            };

            
            results.push(candidato);
            console.log(results)
          }
          count++;
        }
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Função de busca que retorna uma promessa
const busca = async (pageNumber, pageSize, searchTerm, searchCity) => {
  const dados = await readPage(pageNumber, pageSize, searchTerm, searchCity);
  return dados;
};

module.exports = busca;
