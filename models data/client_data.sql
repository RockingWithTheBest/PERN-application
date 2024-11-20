SELECT * FROM public."Clients"
ORDER BY id ASC 

ALTER TABLE "Clients" ADD CONSTRAINT chck_alphabet CHECK(full_name ~ '^[A-Za-z ]+$')
insert into "Clients"(full_name, passport_number) values('eee ee', 'PN123456')
INSERT INTO public."Clients" (full_name, passport_number) VALUES
('Alice Smith', 'PN123456'),
('Bob Johnson', 'PN234567'),
('Charlie Brown', 'PN345678'),
('David Wilson', 'PN456789'),
('Eva Adams', 'PN567890'),
('Frank Clark', 'PN678901'),
('Grace Lee', 'PN789012'),
('Henry Hall', 'PN890123'),
('Ivy Young', 'PN901234'),
('Jack White', 'PN012345'),
('Kathy Green', 'PN123456'),
('Leo Scott', 'PN234567'),
('Mia King', 'PN345678'),
('Nate Wright', 'PN456789'),
('Olivia Turner', 'PN567890'),
('Paul King', 'PN678901'),
('Quinn Davis', 'PN789012'),
('Rita Martinez', 'PN890123'),
('Sam Thompson', 'PN901234'),
('Tina Garcia', 'PN012345'),
('Ursula Robinson', 'PN123456'),
('Victor Lee', 'PN234567'),
('Wendy Lewis', 'PN345678'),
('Xander Walker', 'PN456789'),
('Yara Hall', 'PN567890'),
('Zara Allen', 'PN678901');