INSERT INTO "LineItems"(quantity, "createdAt", "updatedAt", "OrderId")
  SELECT 1, clock_timestamp(), clock_timestamp(), o.id
  FROM "Orders" o
  INNER JOIN "Users" u
  ON u.id = o."UserId"
  WHERE u.email = 'klk@klk.com'
  LIMIT 1;
