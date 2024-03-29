
CREATE TABLE Products(
    ID SERIAL,
    NAME VARCHAR(200) NOT NULL,
    DESCRIPTION TEXT,
    QUANTITY INT NOT NULL,
    PRICE NUMERIC(8,2) NOT NULL,
    TIME_CREATED TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Taxes(
    ID SERIAL,
    NAME VARCHAR(200) NOT NULL,
    DESCRIPTION TEXT,
    RATE NUMERIC(8,2) NOT NULL,
    TIME_CREATED TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Sales(
    ID SERIAL,
    TOTAL_AMOUNT NUMERIC(8,2) NOT NULL,
    TOTAL_TAX NUMERIC(8,2) NOT NULL,
    SALES_AMOUNT NUMERIC(8,2) NOT NULL,
    TIME_CREATED TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Product_Sales(
    ID SERIAL,
    SALE_ID INTEGER NOT NULL,
    PRODUCT_ID INTEGER NOT NULL,
    SALE_QUANTITY INTEGER,
    SALE_PRICE NUMERIC(8,2),
    FOREIGN KEY (SALE_ID) REFERENCES Sales(id) ON DELETE CASCADE,
    FOREIGN KEY (PRODUCT_ID) REFERENCES Products(id) ON DELETE CASCADE
);
