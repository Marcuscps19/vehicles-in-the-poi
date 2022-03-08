# Vehicles In The POI :car:

### Descrição:
API em Node que faz a leitura de dois arquivos CSV: 
- o primeiro mostra a posição de um POI(Pontos de interesse) em latitude e longitude e um raio;
- o segundo mostra a posição dos veículos em latitude e longitude;

A API verifica se os veículos estão dentro de um POI, e quanto tempo permaneceram lá dentro.

### Tecnologias utilizadas:
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Bibliotecas utilizadas:
[Haversine](https://www.npmjs.com/package/haversine)
[Joi](https://joi.dev/api/?v=17.6.0)
[Moment](https://momentjs.com/docs/)
[Papaparse](https://www.papaparse.com/docs)

### Utilizando a aplicação no Visual Studio Code:

Abra um terminal e siga os seguintes comandos:

```sh
git clone https://github.com/Marcuscps19/vehicles-in-the-poi.git

code vehicles-in-the-poi

npm install

npm start
```

### Requisições para a API:

**GET** http://localhost:3001/

Corpo da requisição:
```json
"date": "2018-12-16" // formato YYYY-MM-DD
"plate": "TESTE001"  // qualquer string
```

Tanto **date** quanto **plate** são opcionais, servem para filtrar por data ou por placa do veículo.

O retorno da API será no seguinte formato:

```json
"response": [
    {
      "PONTO 1": [
        {
          "TESTE001": {
            "days": 23,
            "hours": 19,
            "minutes": 24,
            "seconds": 33
          }
        }
      ]
    }
 ]
 ```

 **Ponto:** é a identificação do POI <br />
 **TESTE001:** placa do veículo

### Próximos passos:
- Expor em um front-end;

##### Para mais informações ou sugestões:

[LinkedIn](https://www.linkedin.com/in/marcus-husemann/)<br />
[GitHub](https://github.com/Marcuscps19)<br />
*Email:* mchusemann@gmail.com

Aplicação criada para o processo seletivo da [Mobi7](https://www.mobi7.com.br/)
