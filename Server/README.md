# PERN application
 Это приложение является приложением для обмена валюты

#Все записи базы данных находиится в файл "models data"
#Все модель находится в Server/models
#Файл с запросами 'index.js'

#Сущность Currency
 GET запрос - http://localhost:9000/currency
 POST запрос -  http://localhost:9000/currency
     пример записи
     {
        "currency_name": "USD",
        "selling_rate": "3.395",
        "buying_rate": "3.36"
     }
     
 UPDATE запрос -  http://localhost:9000/currency/:id
 DELETE запрос - http://localhost:9000/currency/:id


 #Сущность Transaction
 GET запрос - http://localhost:9000/transaction
 POST запрос -  http://localhost:9000/transaction
    пример записи
    {
        "sold_currency_code": "USD",
        "bought_currency_code": "EUR",
        "cashier_id": 31,
        "client_id": 85,
        "transaction_date": "2024-11-18T21:00:00.000Z",
        "transaction_time": "09:00:00",
        "sold_amount": "100.00",
        "bought_amount": "85.00"
    }
    
 UPDATE запрос -  http://localhost:9000/transaction/:id
 DELETE запрос - http://localhost:9000/transaction/:id

  #Сущность Cashier
 GET запрос - http://localhost:9000/cashier
 POST запрос -  http://localhost:9000/cashier
    пример записи
    {
         "full_name": "Clyde Kanwe"
    }
    
 UPDATE запрос -  http://localhost:9000/cashier/:id
 DELETE запрос - http://localhost:9000/cashier/:id

 #Сущность Client
 GET запрос - http://localhost:9000/get
 POST запрос -  http://localhost:9000/get
    пример записи
    {
         "full_name": "Clyde Kanwe",
         "passport_number":"PN444444"
    }
    
 UPDATE запрос -  http://localhost:9000/get/:id
 DELETE запрос - http://localhost:9000/get/:id

