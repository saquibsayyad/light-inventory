INSERT INTO Products( ID, NAME, DESCRIPTION, QUANTITY, PRICE) VALUES (1, 'P1', '', 1, 200.00), (2, 'P2', '', 3, 400.00);
INSERT INTO Taxes( ID, NAME, DESCRIPTION, RATE) VALUES (1, 'VAT', '', 10.00);
INSERT INTO Sales( ID, TOTAL_AMOUNT, TOTAL_TAX, SALES_AMOUNT, TIME_CREATED) VALUES (1, 200.00, 20.00, 180.00, '2019-09-10');
INSERT INTO Product_Sales( ID, SALE_ID, PRODUCT_ID, SALE_QUANTITY, SALE_PRICE) VALUES (1, 1, 1, 1,  200.00);
INSERT INTO Product_Sales( ID, SALE_ID, PRODUCT_ID, SALE_QUANTITY, SALE_PRICE) VALUES (2, 1, 2, 2,  400.00);
