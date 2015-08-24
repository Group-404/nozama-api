INSERT INTO "Users"(email, password, "createdAt", "updatedAt")
  VALUES('klk@klk.com', '', clock_timestamp(), clock_timestamp());

INSERT INTO "Profiles"("lastName", "firstName", "addressOne", "addressTwo", city, state, "zipCode", "phoneNumber", "createdAt", "updatedAt", "UserId")
  SELECT 'Kehlenbeck', 'Kristen', '123 Fake St.', '', 'Boston', 'MA', '02116', '1234567890', clock_timestamp(), clock_timestamp(), id
  FROM "Users"
  WHERE email = 'klk@klk.com';

// select * from "Users" u inner join "Profiles" p on u.id=p."UserId";
