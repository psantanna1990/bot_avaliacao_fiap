# Bot do telegram desenvolvido para o MBA em FullStack Development da FIAP

Este bot permite consultas as API's do projeto Brasil API

site para a documentação das API's que estamos ultilizando:
[Brasil API](https://brasilapi.com.br/docs) 

Recursos que estarão disponíveis

 - CEP - em desenvolvimento
 - DDD - em desenvolvimento
 - Bank - em desenvolvimento
 - CNPJ - em desenvolvimento
 - IBGE - em desenvolvimento
 - Feriados Nacionais - em desenvolvimento

## Para rodar o projeto:

1 - [criar um bot usando o Telegram Bot father](https://core.telegram.org/bots)

2 - Criar um grupo no Telegram  e adicionar o bot criado no passo anterior

3 - Descobrir o ID do grupo chamando a seguinte api do telegram: `` https://api.telegram.org/bot<YourBOTToken>/getUpdates`` 

3 - Setar as variáveis de ambiente no docker-compose.yaml

4 - executar o comando a partir da raiz do projeto:
    ``
      docker-compose up --build
    ``


## Membros da equipe:

 - Carlos Mateus Borges Junior
 - Daniel de Oliveira Carvalho
 - Pedro Sant Anna Lima Oliveira   
 - Willian Prestes Correia Cellos

