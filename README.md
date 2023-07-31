# Alquiler Campus
Una empresa de alquiler de autos desea mejorar su sistema de gestión de alquileres y reservas para optimizar su proceso y brindar un mejor servicio a sus clientes. Actualmente, la empresa lleva el registro de sus clientes, automóviles disponibles, alquileres y reservas en tablas separadas en una base de datos MySQL.

## Requisitos previos

-Tener instalado node.js en tu sistema operativo. De no cumplir con este requisito descarga e instala [Node.js](https://nodejs.org/es/download)

## Instalacion

Para la instalacion seguir los siguientes pasos, usar los comandos en la terminal:

1. Clonar el repositorio (asegurate que el link sea el de este repositorio)
```bash
https://github.com/AoKuangg/FiltroNodejs-Alquiler-Autos.git
```
2. Instalar las dependencias del proyecto con el siguiente comando:
```bash
npm install
```
3. En la carpeta llamada "db", se encuentra todo el codigo sql usado para este proyecto, ir a el archivo llamado "db_campus_alquiler.sql" y ejecutar todos los codigos sql en orden.
4. En el arhivo .env cambia las variables de entorno a las tuyas.
```
MY_CONFIG={"hostname":"", "port":}
MY_CONNECTION={"host":"", "user":"","password":"","database":"", "port":}
JWT_PRIVATE_KEY = {""}
```
5. Ejecuta el siguiente comando para iniciar el servidor, al inicial el servidor en la consola saldra la url para utilizar los endpoints:
```bash
npm run dev
```
6. Crea un archivo `tsconfig.json` con el el comando:
```bash
npx tsc --init
```
7. En el archivo `tsconfig.json` reemplazar el contenido con lo siguiente:
```ts
{
  "compilerOptions": {
    "target": "es6",//Esta opción especifica la versión de ECMAScript
    "module": "ES6",//especifica el sistema de módulos que se utilizará al compilador 
    "moduleResolution": "node",//define cómo se resolverán los módulos al importarlos
    "outDir": "./controller",//especifica la carpeta de destino
    "esModuleInterop": true,//Esta opción habilita la interoperabilidad de módulos
    "experimentalDecorators": true,//Esta opción habilita el soporte para decoradores 
    "emitDecoratorMetadata": true//Esta opción habilita la generación de metadatos
  }
}
```
## Uso
Nota:
Las url mostradas en la siguiente parte son de ejemplo y pueden variar dependiendo de la configuracion en las variables de entorno que pusiste al momento de la instalacion y configuracion explicados en la seccion anterior.
Aparte utilizar thunder client para ultilizar los endpoints.

Para el uso de JWT en el thunder client en la seccion de headers, agregar una nueva llamado authorization y en seguida poner el token generado, cada token dura 2 horas, a continuacion un ejemplo del token:
```json
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqc29uIjp7fSwiaWF0IjoxNjkwODQzMDk3LCJleHAiOjE2OTA4NTc0OTd9.VPnnwiKhNkjnFCPPVlMxraZcCJu5qGz80hgoBSCLiHM"
```

### Endpoints

1. #### Clientes
    - En este endpoint se muestran todos los clientes registrados en la base de datos. Tambien al final de este endpoint se entrega un token de acceso necesario para el resto de las consultas relacionadas en esta seccion.
    ```
    http://127.16.16.16:4550/clientes
    ```
    - En este endpoint se filtran todos los clientes con un DNI especifico. (Nota: en esta url, cambia la parte ":DNI" por el DNI del cliente que deseas buscar)
    ```
    http://127.16.16.16:4550/clientes/:DNI
    ```
    - En este endpoint se obtienen los datos de los clientes que realizaron al menos un alquiler.
    ```
    http://127.16.16.16:4550/clientes/alquiler
    ```
    - En este endpoint se obtienen los datos del Cliente que realizo la reserva dando el id de la reserva en especifico. (Nota: en esta url, cambia la parte ":idReserva" por el id de la reserva que se desea buscar)
    ```
    http://127.16.16.16:4550/clientes/reserva/:idReserva
    ```

2. #### Autos
    - En este enpoint se filtran todos los automoviles y se muestran los que estan disponibles para alquiler.
    ```
    http://127.16.16.16:4550/autos
    ```
    - En este enpoint se filtran todos los automoviles y se muestran los que tienen una capacidad mayor a 5 pasajeros.
    ```
    http://127.16.16.16:4550/autos/capacidad
    ```
    - En este enpoint se ordenan todos los automoviles de manera ascendente dada la marca de este.
    ```
    http://127.16.16.16:4550/autos/marca
    ```
    - En este enpoint se filtran todos los automoviles y se muestran los que estan disponibles y tienen una capacidad de 5 pasajeros.
    ```
    http://127.16.16.16:4550/autos/capacidad/disponible
    ```
3. #### Alquiler
    - En este endpoint se traen todos los alquileres y los datos de los clietes los cuales alquilaron y estan activos.
    ```
    http://127.16.16.16:4550/alquiler
    ```
    - En este endpoint se traen los datos de los de los alquileres que tienen fecha de inicio igual a  "2023-07-05"
    ```
    http://127.16.16.16:4550/alquiler/fecha
    ```
    - En este endpoint se traen los datos de los alquileres entre las fechas "2023-07-05" y "2023-07-10"
    ```
    http://127.16.16.16:4550/alquiler/entrefechas
    ```
    - En este endpoint se traen la cantidad total de alquileres que se han registrado en la base de datos.
    ```
    http://127.16.16.16:4550/alquiler/total
    ```
    - En este endpoint se trae el costo total de un alquiler especifico que se filtra con el id del alquiler (Nota: en esta url, cambia la parte ":IdAlquiler" por el id del alquiler que se desea buscar)
    ```
    http://127.16.16.16:4550/alquiler/costo/:IdAlquiler
    ```
    - En este endpoint se trae los datos del alquiler especifico que se filtra con el id del alquiler (Nota: en esta url, cambia la parte ":IdAlquiler" por el id del alquiler que se desea buscar)
    ```
    http://127.16.16.16:4550/alquiler/:IdAlquiler
    ```
4. #### Reserva
    - En este endpoint se traen todas las reservas junto con los datos del cliente y el automovil reservado.
    ```
    http://127.16.16.16:4550/reserva
    ```
    - En este endpoint se traen las reservas pendientes que tiene un cliente en especifico (Nota: en esta url, cambia la parte ":ICliente" por el id del cliente que se desea buscar)
    ```
    http://127.16.16.16:4550/reserva/:idCliente
    ```
5. #### Empleados
    - En este endpoint se traen todos los empleados que tienen el cargo vendedor
    ```
    http://127.16.16.16:4550/empleados
    ```
    - En este endpoint se traen todos los empleados con un cargo alto, es decir "Gerente" o "Asistente"
    ```
    http://127.16.16.16:4550/empleados/altoCargo
    ```
6. #### Sucursal
    - En este endpoint se muestran la cantidad de autos disponibles en cada sucursal.
    ```
    http://127.16.16.16:4550/sucursal
    ```
    - En este endpoint se muestran la cantidad de autos disponibles en cada sucursal junto a su direccion.
    ```
    http://127.16.16.16:4550/sucursal/datos
    ```

### Falta
No alcanze a implementar el dto ni los jwt en las consultas


### AUTOR

[Juan Camilo Paez Ariza](https://github.com/AoKuangg)
