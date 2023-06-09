DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE productos (
	id SERIAL,
	titulo varchar(50),
	precio int,
	stock int,
  email varchar(50)
);

INSERT INTO productos (titulo, precio, stock, email) VALUES
  ('iPhone 12 Pro', 999, 10, 'test@test.com'),
  ('MacBook Pro', 1999, 5, 'test@test.com'),
  ('Apple Watch Series 6', 399, 8, 'test1@test.com'),
  ('Samsung QLED 4K TV', 1499, 3, 'test1@test.com'),
  ('iPad Pro', 799, 12, 'test1@test.com'),
  ('PlayStation 5', 499, 7, 'test2@test.com'),
  ('Amazon Echo Dot', 49, 15, 'test2@test.com'),
  ('Canon EOS R5', 3499, 2, 'test2@test.com'),
  ('Apple AirPods Pro', 249, 20, 'test3@test.com'),
  ('HP OfficeJet Pro 6978', 199, 6, 'test@test.com');

SELECT * FROM productos;

CREATE TABLE usuarios (
  id SERIAL,
  email varchar(50) UNIQUE,
  password varchar(72)
);
SELECT * FROM usuarios;