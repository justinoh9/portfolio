CREATE TABLE Airline (
    name VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Airport (
    code CHAR(3) PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    airport_type VARCHAR(20) NOT NULL,
    CHECK (airport_type IN ('domestic', 'international', 'both'))
);

CREATE TABLE Customer (
    email VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    building_number VARCHAR(10),
    street VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    phone_number VARCHAR(20),
    passport_number VARCHAR(30) NOT NULL,
    passport_expiration DATE NOT NULL,
    passport_country VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL
);

CREATE TABLE Airline_Staff (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    airline_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (airline_name) REFERENCES Airline(name)
);

CREATE TABLE Staff_Phone (
    username VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    PRIMARY KEY (username, phone_number),
    FOREIGN KEY (username) REFERENCES Airline_Staff(username)
);

CREATE TABLE Airplane (
    airline_name VARCHAR(50) NOT NULL,
    airplane_id INT NOT NULL,
    num_seats INT NOT NULL,
    manufacturing_company VARCHAR(50) NOT NULL,
    manufacturing_date DATE NOT NULL,
    PRIMARY KEY (airline_name, airplane_id),
    FOREIGN KEY (airline_name) REFERENCES Airline(name)
);

CREATE TABLE Flight (
    airline_name VARCHAR(50) NOT NULL,
    flight_number VARCHAR(10) NOT NULL,
    departure_datetime DATETIME NOT NULL,
    arrival_datetime DATETIME NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    departure_airport CHAR(3) NOT NULL,
    arrival_airport CHAR(3) NOT NULL,
    airplane_id INT NOT NULL,
    PRIMARY KEY (airline_name, flight_number, departure_datetime),
    FOREIGN KEY (airline_name) REFERENCES Airline(name),
    FOREIGN KEY (departure_airport) REFERENCES Airport(code),
    FOREIGN KEY (arrival_airport) REFERENCES Airport(code),
    FOREIGN KEY (airline_name, airplane_id) REFERENCES Airplane(airline_name, airplane_id),
    CHECK (status IN ('on-time', 'delayed'))
);

CREATE TABLE Ticket (
    ticket_id INT PRIMARY KEY,
    card_type VARCHAR(10) NOT NULL,
    card_number VARCHAR(25) NOT NULL,
    name_on_card VARCHAR(100) NOT NULL,
    expiration_date DATE NOT NULL,
    purchase_date DATE NOT NULL,
    purchase_time TIME NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    airline_name VARCHAR(50) NOT NULL,
    flight_number VARCHAR(10) NOT NULL,
    departure_datetime DATETIME NOT NULL,
    FOREIGN KEY (customer_email) REFERENCES Customer(email),
    FOREIGN KEY (airline_name, flight_number, departure_datetime)
        REFERENCES Flight(airline_name, flight_number, departure_datetime),
    CHECK (card_type IN ('credit', 'debit'))
);

CREATE TABLE Rates (
    customer_email VARCHAR(100) NOT NULL,
    airline_name VARCHAR(50) NOT NULL,
    flight_number VARCHAR(10) NOT NULL,
    departure_datetime DATETIME NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(255),
    PRIMARY KEY (customer_email, airline_name, flight_number, departure_datetime),
    FOREIGN KEY (customer_email) REFERENCES Customer(email),
    FOREIGN KEY (airline_name, flight_number, departure_datetime)
        REFERENCES Flight(airline_name, flight_number, departure_datetime),
    CHECK (rating BETWEEN 1 AND 5)
);
