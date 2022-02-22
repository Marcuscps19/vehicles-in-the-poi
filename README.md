# Vehicles In The POI :car:

### Descrição:
API em Node que faz a leitura de dois arquivos CSV: 
- o primeiro mostra a posição de um POI(Pontos de interesse) em latitude e longitude e um raio;
- o segundo mostra a posição dos veículos em latitude e longitude;

A API verifica se os veículos estão dentro de um POI, e quanto tempo permaneceram lá dentro.
O retorno da API é no seguinte formato:

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
 
### Tecnologias utilizadas:
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Próximos passos:

- Adicionar filtragem por placa de veículo e por data;
- Expor em um front-end;

##### Para mais informações ou sugestões:

[LinkedIn](https://www.linkedin.com/in/marcus-husemann/)<br />
[GitHub](https://github.com/Marcuscps19)<br />
*Email:* mchusemann@gmail.com

Aplicação criada para o processo seletivo da [Mobi7](https://www.mobi7.com.br/)
