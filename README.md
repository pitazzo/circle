# Circle
Este repositorio contiene el código fuente y ficheros de configuración de Circle. Circle es la prueba de concepto asociada al Trabajo Fin de Grado
"Arquitecturas de microservicios sobre inafraestructuras distribuidas heterogéneas: una prueba de concepto". En él, se pretende estudiar la viabilidad
de la "arquitectura socializada".

## Probar el sistema
Para probar el sistema con fines demostrativos, se recomienda seguir los siguientes pasos
### Prerequisitos
- Instalación funcional de Docker sobre sistema Linux
- Un cliente GraphQL, por ejemplo [Insomnia](https://insomnia.rest/) (opcional)

### Proceso
1. Arrancar (al menos) una instancia de cada servicio. Es posible que otro usuario esté ya ejecutándolos, pero no existe garantía de ello
```bash
docker run pitazzo/circle:users-service
docker run pitazzo/circle:content-service
docker run pitazzo/circle:notifications-service
```
2. Realizar una primera petición de prueba a http://frozen-plateau-06813.herokuapp.com/graphql para despertar
la instancia del API *Gateway* de Heroku. Esta petición fallará.
3. Esperar 20 segundos
4. Proceder a las pruebas deseadas

## Construcción local
A continuación, se detalla el proceso de construcción local de los contenedores que forman el sistema. De esta forma, podrá probarse el sistema usando una
*gateway* y base de datos propia.

### Prerequisitos
- Base de datos PostgreSQL accesible
- Clúster de RabbitMQ. Se recomienda [CloudAMQP](https://www.cloudamqp.com/)
- Servicio de SMTP para envío de *emails*. Se recomienda [Ethereal](https://ethereal.email/) para evitar un gran número de emails innecesarios
- Instalación funcional de Docker sobre sistema Linux
- Un cliente GraphQL, por ejemplo [Insomnia](https://insomnia.rest/) (opcional)

### Proceso
1. Clonar este repositorio
2. Creación de un fichero ```.env``` en con el siguiente contenido en la raíz del repositorio
```
DB_HOST= <SUSTITUIR>
DB_PORT= <SUSTITUIR>
DB_USER= <SUSTITUIR>
DB_PASSWORD= <SUSTITUIR>
DB_DATABASE= <SUSTITUIR>
MAIL_HOST= <SUSTITUIR>
MAIL_PORT= <SUSTITUIR>
MAIL_USER= <SUSTITUIR>
MAIL_PASSWORD= <SUSTITUIR>
```
3. Ejecutar **desde el directorio raíz del repositorio** los comandos de construcción de contenedores
```
docker build -t circle/gateway-service $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") -f gateway-service/Dockerfile .
docker build -t circle/users-service $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") -f users-service/Dockerfile .
docker build -t circle/content-service $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") -f content-service/Dockerfile .
docker build -t circle/notifications-service $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") -f notifications-service/Dockerfile .
```
4. Levantar los contenedores construídos (al menos, una instancia de cada, menos del *gatewat*, del cual solo debe ejecutarse una)
```bash
docker run circle/gateway-service -p 3000:3000
docker run circle/users-service
docker run circle/content-service
docker run circle/notifications-service
```

5. Proceder a las pruebas en http://localhost:3000/graphql
