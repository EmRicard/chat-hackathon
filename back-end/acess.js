const fs = require('fs');
const csv = require('csv-parser');

// Função para ler uma página do arquivo CSV
function readPage(pageNumber, pageSize) {
  const results = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream('dados.csv', { encoding: 'utf-8' }) // Definindo a codificação como UTF-8
      .pipe(csv({ separator: ';' })) // Especifica o separador como ';'
      .on('data', (data) => {
        // Verifica se o registro está na página atual
        if (count >= pageNumber * pageSize && count < (pageNumber + 1) * pageSize) {
          const candidato = {
            name: data.NM_CANDIDATO,
            number: data.NR_CANDIDATO,
            party: data.SG_PARTIDO,
            position: data.DS_CARGO,
            city: data.NM_UE // Adiciona o campo da cidade
          };
          results.push(candidato);
        }
        count++;
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Função de acesso que retorna uma promessa
const acess = async (pageNumber, pageSize) => {
  const dados = await readPage(pageNumber, pageSize);
  return dados;
};

module.exports = acess;
