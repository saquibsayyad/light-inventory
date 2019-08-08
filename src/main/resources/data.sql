DROP TABLE IF EXISTS Product;

CREATE TABLE Product(
    id SERIAL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    price NUMERIC(8,2),
    time_created TIMESTAMP DEFAULT NOW()
);

INSERT INTO Product( id, name, description, quantity, price) VALUES (1, 'P1', '', 1, 200.00), (2, 'P2', '', 3, 400.00);

