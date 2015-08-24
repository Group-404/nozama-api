INSERT INTO "Orders"("createdAt", "updatedAt", "UserId")
  SELECT clock_timestamp(), clock_timestamp(), id
  FROM "Users"
  WHERE email = 'klk@klk.com';

-- select * from "Users" u inner join "Profiles" p on u.id=p."UserId";
