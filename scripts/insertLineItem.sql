INSERT INTO "LineItems"(quantity, "createdAt", "updatedAt", "OrderId", "ProductId")
  SELECT 1, clock_timestamp(), clock_timestamp(), o.id, (SELECT p.id
                                                         FROM "Products" p
                                                         WHERE p.name = 'Kryptonite Keeper 12')
  FROM "Orders" o
  INNER JOIN "Users" u
  ON u.id = o."UserId"
  WHERE u.email = 'klk@klk10.com'
  LIMIT 1;

