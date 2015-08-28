
      --DESTROY ALL DATA IN DATA BASE
-- truncate table"Users" cascade;
-- truncate table "Products" cascade;


        -- FILL DATA BASE
      --user seed

INSERT INTO "Users"(email, password, "createdAt", "updatedAt")
  VALUES('klk@klk.com', 'klk', clock_timestamp(), clock_timestamp());
INSERT INTO "Users"(email, password, "createdAt", "updatedAt")
  VALUES('gmh@gmh.com', 'gmh', clock_timestamp(), clock_timestamp());
INSERT INTO "Users"(email, password, "createdAt", "updatedAt")
  VALUES('joe@joe.com', 'joe', clock_timestamp(), clock_timestamp());
INSERT INTO "Users"(email, password, "createdAt", "updatedAt")
  VALUES('lara@lara.com', 'lara', clock_timestamp(), clock_timestamp());


      -- profiles seed

INSERT INTO "Profiles"("lastName", "firstName", "addressOne", "addressTwo", city, state, "zipCode", "phoneNumber", "createdAt", "updatedAt", "UserId")
  SELECT 'Kehlenbeck', 'Kristen', '123 Fake St.', '', 'Boston', 'MA', '02116', '1234567890', clock_timestamp(), clock_timestamp(), id
  FROM "Users"
  WHERE email = 'klk@klk.com';

INSERT INTO "Profiles"("lastName", "firstName", "addressOne", "addressTwo", city, state, "zipCode", "phoneNumber", "createdAt", "updatedAt", "UserId")
  SELECT'Holmes', 'Greg', '51 Melcher St.', 'on some couch', 'Boston', 'MA', '02116', '5554567890', clock_timestamp(), clock_timestamp(),
    id FROM "Users"
    WHERE email = 'gmh@gmh.com';

INSERT INTO "Profiles"("lastName", "firstName", "addressOne", "addressTwo", city, state, "zipCode", "phoneNumber", "createdAt", "updatedAt", "UserId")
  SELECT'Levinger', 'Joe', '18 NunYa.', 'Apt BzWax', 'Cambridge', 'MA', '02117', '5555557890', clock_timestamp(), clock_timestamp(),
    id FROM "Users"
    WHERE email = 'joe@joe.com';

INSERT INTO "Profiles"("lastName", "firstName", "addressOne", "addressTwo", city, state, "zipCode", "phoneNumber", "createdAt", "updatedAt", "UserId")
  SELECT 'Parvinsmith', 'Lara', '123 Fake St.', 'Apt B', 'Boston', 'MA', '02116', '1234567890', clock_timestamp(), clock_timestamp(),
    id FROM "Users"
    WHERE email = 'lara@lara.com';



-- select * from "Users" u inner join "Profiles" p on u.id=p."UserId";

    -- Products

-- I just decided to include the msrp and price and then on the front end we can just write a simple ternary something like
-- var sale? = price < msrp

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")
  VALUES ('bicycles', 'Breezer Downtown 5 Bike',500, 569, 'The Breezer Downtown 5 Bike is the ideal ride for your urban adventures around town, whether it be a long expedition or a simple ride to work.', 'bike_breezer_sm.jpg', 'bike_breezer_lg.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")
  VALUES ('bicycles', 'Schwinn City 3 Bike 2013 - Womens',269, 550, 'In a classic design with modern lightweight performance, the Schwinn City 3 Bike for women lets you get around town easily and look good doing it.', 'bike_schwinn_sm.jpg', 'bike_schwinn_lg.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")
  VALUES ('helmets','Giro Reverb Helmet', 40, 55,'matte gray', 'helmet_shadow_sm.jpg', 'helmet_shadow_lg.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")VALUES ('helmets', 'Giro Reverb Helmet',55, 55, 'Highlight Yellow', 'helmet_yellow_sm.jpg', 'helmet_yellow_lg.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")VALUES ('helmets', 'Giro Reverb Helmet',55, 55, 'Matte White CA Bear', 'helmet_white_sm.jpg', 'helmet_white_lg.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")VALUES ('helmets', 'Giro Reverb Helmet', 55, 55, 'Vintage Red', 'helmet_red_sm.jpg', 'helmet_red_lg.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")VALUES ('locks', 'Kryptonite Keeper 12', 45, 55, 'Standard', 'lock_keeper_sm.jpg', 'lock_keeper_sm.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")VALUES ('locks', 'Kryptonite Series 2 Mini',35 , 35 ,'Ulock - Red', 'lock_red_sm.jpg', 'lock_red_lg.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")VALUES ('locks', 'Kryptonite Series 2 Mini',35, 35, 'Ulock - White', 'lock_white_sm.jpg', 'lock_white_lg.jpg', clock_timestamp(), clock_timestamp());

INSERT INTO "Products" (category, name, price, msrp, description, "thumbnailURL", "imageURL", "createdAt", "updatedAt")VALUES ('locks', 'Kryptonite Series 2 Mini', 25, 35 ,'Ulock - Black', 'lock_black_sm.jpg', 'lock_black_sm.jpg', clock_timestamp(), clock_timestamp());


    --ORDERS

INSERT INTO "Orders"("createdAt", "updatedAt", "UserId")
  SELECT clock_timestamp(), clock_timestamp(), id
  FROM "Users"
  WHERE email = 'klk@klk.com';


   --LINE ITEM

INSERT INTO "LineItems"(quantity, "createdAt", "updatedAt", "OrderId", "ProductId")
  SELECT 1, clock_timestamp(), clock_timestamp(), o.id, (SELECT p.id
                                                         FROM "Products" p
                                                         WHERE p.name = 'MyBike')
    FROM "Orders" o
    INNER JOIN "Users" u
    ON u.id = o."UserId"
    WHERE u.email = 'klk@klk.com'
    LIMIT 1;


  -- Only have one order and line item, that way we can test updating users data to add an order with postman
