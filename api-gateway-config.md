```bash
curl -i -X POST \
--url http://localhost:8001/services \
--data 'name=v2-messages' \
--data 'protocol=http' \
--data 'host=localhost' \
--data 'port=11004' \
--data 'path=/v2/messages'
curl -i -X POST \
--url http://localhost:8001/services \
--data 'name=v2-whatsapp_callback' \
--data 'protocol=http' \
--data 'host=localhost' \
--data 'port=11004' \
--data 'path=/v2/whatsapp_callback'

curl -i -X POST \
--url http://localhost:8001/services/v2-messages/routes \
--data 'hosts[]=localhost' \
--data 'hosts[]=api.abdullahroy.com' \
--data 'hosts[]=api.yadrusu.com' \
--data 'paths[]=/v2/messages' \
--data 'methods[]=OPTIONS' \
--data 'methods[]=GET' \
--data 'methods[]=POST' \
--data 'methods[]=PUT' \
--data 'methods[]=PATCH' \
--data 'methods[]=DELETE'
curl -i -X POST \
--url http://localhost:8001/services/v2-whatsapp_callback/routes \
--data 'hosts[]=localhost' \
--data 'hosts[]=api.abdullahroy.com' \
--data 'hosts[]=api.yadrusu.com' \
--data 'paths[]=/v2/whatsapp_callback' \
--data 'methods[]=OPTIONS' \
--data 'methods[]=GET' \
--data 'methods[]=POST' \
--data 'methods[]=PUT' \
--data 'methods[]=PATCH' \
--data 'methods[]=DELETE'
```