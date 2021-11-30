drop database if exists botBitacoras;
create database botBitacoras;
use botBitacoras;

create table bitacoras (
    bitacoraId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    discordId int(25) NOT NULL,
    username varchar(30),
    openDate dateTime,
    closeDate dateTime
);

insert into bitacoras (bitacoraId, discordId, username) values
("", 1235, "Juojo"),
("", 1235, "Juojo");