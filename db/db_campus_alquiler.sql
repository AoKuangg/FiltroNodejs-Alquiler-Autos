/* Nombre de la base de datos: db_campus_alquiler */ 
CREATE DATABASE db_campus_alquiler; 
USE db_campus_alquiler; 

-- Tabla: Cliente 
CREATE TABLE Cliente ( 
    ID_Cliente INT PRIMARY KEY, 
    Nombre VARCHAR(100), 
    Apellido VARCHAR(100), 
    DNI VARCHAR(20), 
    Direccion VARCHAR(255), 
    Telefono VARCHAR(20), 
    Email VARCHAR(100) 
); 

-- Tabla: Automóvil 
CREATE TABLE Automovil ( 
    ID_Automovil INT PRIMARY KEY, 
    Marca VARCHAR(100), 
    Modelo VARCHAR(100), 
    Anio INT, 
    Tipo VARCHAR(50), 
    Capacidad INT, 
    Precio_Diario DECIMAL(10, 2)
); 

-- Tabla: Alquiler 
CREATE TABLE Alquiler ( 
    ID_Alquiler INT PRIMARY KEY, 
    ID_Cliente INT, 
    ID_Automovil INT, 
    Fecha_Inicio DATE, 
    Fecha_Fin DATE, 
    Costo_Total DECIMAL(10, 2), 
    Estado VARCHAR(50), 
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente (ID_Cliente), 
    FOREIGN KEY (ID_Automovil) REFERENCES Automovil (ID_Automovil) 
); 

-- Tabla: Reserva 
CREATE TABLE Reserva ( 
    ID_Reserva INT PRIMARY KEY, 
    ID_Cliente INT, 
    ID_Automovil INT, 
    Fecha_Reserva DATE, 
    Fecha_Inicio DATE, 
    Fecha_Fin DATE, 
    Estado VARCHAR(50), 
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente (ID_Cliente), 
    FOREIGN KEY (ID_Automovil) REFERENCES Automovil (ID_Automovil) 
); 

-- Tabla: Sucursal 
CREATE TABLE Sucursal ( 
    ID_Sucursal INT PRIMARY KEY, 
    Nombre VARCHAR(100), 
    Direccion VARCHAR(255), 
    Telefono VARCHAR(20) 
); 

-- Tabla: Sucursal_Automovil 
CREATE TABLE Sucursal_Automovil ( 
    ID_Sucursal INT, 
    ID_Automovil INT, 
    Cantidad_Disponible INT, 
    PRIMARY KEY (ID_Sucursal, ID_Automovil), 
    FOREIGN KEY (ID_Sucursal) REFERENCES Sucursal (ID_Sucursal), 
    FOREIGN KEY (ID_Automovil) REFERENCES Automovil (ID_Automovil) 
); 

-- Tabla: Empleado 
CREATE TABLE Empleado ( 
    ID_Empleado INT PRIMARY KEY, 
    Nombre VARCHAR(100), 
    Apellido VARCHAR(100), 
    DNI VARCHAR(20), 
    Direccion VARCHAR(255), 
    Telefono VARCHAR(20), 
    Cargo VARCHAR(50) 
); 

-- Tabla: Registro_Entrega 
CREATE TABLE Registro_Entrega ( 
    ID_Registro INT PRIMARY KEY, 
    ID_Alquiler INT, 
    ID_Empleado INT, 
    Fecha_Entrega DATE, 
    Combustible_Entregado DECIMAL(5, 2), 
    Kilometraje_Entregado INT, 
    FOREIGN KEY (ID_Alquiler) REFERENCES Alquiler (ID_Alquiler), 
    FOREIGN KEY (ID_Empleado) REFERENCES Empleado (ID_Empleado) 
); 

-- Tabla: Registro_Devolucion 
CREATE TABLE Registro_Devolucion ( 
    ID_Registro INT PRIMARY KEY, 
    ID_Alquiler INT, 
    ID_Empleado INT, 
    Fecha_Devolucion DATE, 
    Combustible_Devuelto DECIMAL(5, 2), 
    Kilometraje_Devuelto INT, 
    Monto_Adicional DECIMAL(10, 2), 
    FOREIGN KEY (ID_Alquiler) REFERENCES Alquiler (ID_Alquiler), 
    FOREIGN KEY (ID_Empleado) REFERENCES Empleado (ID_Empleado) 
); 

INSERT INTO Cliente (ID_Cliente, Nombre, Apellido, DNI, Direccion, Telefono, Email) 
VALUES  
    (1, 'Juan', 'Perez', '12345678', 'Calle 123', '11111111', 'juan@example.com'), 
    (2, 'Maria', 'Lopez', '87654321', 'Avenida 456', '22222222', 'maria@example.com'), 
    (3, 'Pedro', 'Gonzalez', '56789012', 'Plaza 789', '33333333', 'pedro@example.com'), 
    (4, 'Laura', 'Martinez', '09876543', 'Ruta 101', '44444444', 'laura@example.com'), 
    (5, 'Carlos', 'Gomez', '43210987', 'Calle 987', '55555555', 'carlos@example.com'); 

INSERT INTO Automovil (ID_Automovil, Marca, Modelo, Anio, Tipo, Capacidad, Precio_Diario) 
VALUES  
    (1, 'Toyota', 'Corolla', 2021, 'Sedan', 5, 50.00), 
    (2, 'Honda', 'Civic', 2020, 'Sedan', 5, 45.00), 
    (3, 'Ford', 'Explorer', 2019, 'SUV', 7, 60.00), 
    (4, 'Chevrolet', 'Equinox', 2022, 'SUV', 5, 55.00), 
    (5, 'Nissan', 'Sentra', 2022, 'Sedan', 4, 48.00); 

INSERT INTO Alquiler (ID_Alquiler, ID_Cliente, ID_Automovil, Fecha_Inicio, Fecha_Fin, Costo_Total, Estado) 
VALUES  
    (1, 1, 3, '2023-07-01', '2023-07-05', 240.00, 'Activo'), 
    (2, 2, 4, '2023-07-02', '2023-07-07', 275.00, 'Disponible'), 
    (3, 3, 1, '2023-07-03', '2023-07-06', 150.00, 'Activo'), 
    (4, 4, 5, '2023-07-04', '2023-07-08', 192.00, 'Activo'), 
    (5, 5, 2, '2023-07-05', '2023-07-09', 225.00, 'Disponible'); 

INSERT INTO Reserva (ID_Reserva, ID_Cliente, ID_Automovil, Fecha_Reserva, Fecha_Inicio, Fecha_Fin, Estado) 
VALUES  
    (1, 2, 1, '2023-07-06', '2023-07-10', '2023-07-15', 'Pendiente'), 
    (2, 3, 3, '2023-07-07', '2023-07-12', '2023-07-17', 'Pendiente'), 
    (3, 4, 2, '2023-07-08', '2023-07-14', '2023-07-19', 'Pendiente'), 
    (4, 5, 4, '2023-07-09', '2023-07-15', '2023-07-20', 'Pendiente'), 
    (5, 1, 5, '2023-07-10', '2023-07-16', '2023-07-21', 'Pendiente'); 

INSERT INTO Sucursal (ID_Sucursal, Nombre, Direccion, Telefono) 
VALUES  
    (1, 'Sucursal A', 'Calle Principal 123', '1111111111'), 
    (2, 'Sucursal B', 'Avenida Central 456', '2222222222'), 
    (3, 'Sucursal C', 'Plaza Principal 789', '3333333333'), 
    (4, 'Sucursal D', 'Ruta Secundaria 101', '4444444444'), 
    (5, 'Sucursal E', 'Carretera Principal 987', '5555555555'); 

INSERT INTO Sucursal_Automovil (ID_Sucursal, ID_Automovil, Cantidad_Disponible) 
VALUES  
    (1, 1, 3), 
    (2, 2, 5), 
    (3, 3, 2), 
    (4, 4, 4), 
    (5, 5, 1); 

INSERT INTO Empleado (ID_Empleado, Nombre, Apellido, DNI, Direccion, Telefono, Cargo) 
VALUES  
    (1, 'Ana', 'Gomez', '123456789', 'Calle 111', '1111111111', 'Gerente'), 
    (2, 'Luis', 'Rodriguez', '987654321', 'Avenida 222', '2222222222', 'Asistente'), 
    (3, 'Elena', 'Fernandez', '456789012', 'Plaza 333', '3333333333', 'Vendedor'), 
    (4, 'Mario', 'Torres', '210987654', 'Ruta 444', '4444444444', 'Recepcionista'), 
    (5, 'Carlos', 'Hernandez', '543210987', 'Carretera 555', '5555555555', 'Chofer'); 

INSERT INTO Registro_Entrega (ID_Registro, ID_Alquiler, ID_Empleado, Fecha_Entrega, Combustible_Entregado, Kilometraje_Entregado) 
VALUES  
    (1, 1, 3, '2023-07-05', 40.00, 2000), 
    (2, 2, 4, '2023-07-07', 30.00, 1800), 
    (3, 3, 1, '2023-07-06', 45.00, 2200), 
    (4, 4, 5, '2023-07-08', 50.00, 2400), 
    (5, 5, 2, '2023-07-09', 35.00, 1900); 

INSERT INTO Registro_Devolucion (ID_Registro, ID_Alquiler, ID_Empleado, Fecha_Devolucion, Combustible_Devuelto, Kilometraje_Devuelto, Monto_Adicional) 
VALUES  
    (1, 1, 3, '2023-07-10', 10.00, 2500, 20.00), 
    (2, 2, 4, '2023-07-12', 15.00, 2100, 15.00), 
    (3, 3, 1, '2023-07-11', 20.00, 2300, 25.00), 
    (4, 4, 5, '2023-07-13', 25.00, 2600, 30.00), 
    (5, 5, 2, '2023-07-14', 18.00, 2000, 12.00); 