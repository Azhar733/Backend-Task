# Backend-Task

curl

get data
curl --location 'http://Azhar:123456@localhost:4000/tasks'

get data by id
curl --location 'http://Azhar:123456@localhost:4000/tasks/2'

post 
curl --location 'http://Azhar:123456@localhost:4000/tasks' \
--header 'Content-Type: application/json' \
--data '{
        "title":"nami",
        "description":"Home coming"
}'


put
curl --location --request PUT 'http://Azhar:123456@localhost:4000/tasks/2' \
--header 'Content-Type: application/json' \
--data '{
    "title":"Zoro",
    "description":"worlds greatest swords Men"
}'

delete
curl --location --request DELETE 'http://Azhar:123456@localhost:4000/tasks/2'

post with page
curl --location 'http://Azhar:123456@localhost:4000/tasks?page=2' \
--header 'Content-Type: application/json' \
--data '{
        "title":"nami",
        "description":"Home coming"
}'

get data by filter
curl --location 'http://Azhar:123456@localhost:4000/tasks?filter=2s'


get data by page and page size
curl --location 'http://Azhar:123456@localhost:3000/tasks?page=3&pageSize=3'

get data by sorting
curl --location 'http://Azhar:123456@localhost:4000/tasks?sortBy=id&sortOrder=des'


get data combind filter pagination sorting desc
curl --location 'http://Azhar:123456@localhost:4000/tasks?page=2&pageSize=2&sortBy=title&sortOrder=asc&filter=2'
