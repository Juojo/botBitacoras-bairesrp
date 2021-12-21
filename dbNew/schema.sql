drop database if exists botBitacoras;
create database botBitacoras;
use botBitacoras;

create table bitacoras (
    bitacoraId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    discordId bigint(25),
    username varchar(30),
    openDate dateTime,
    closeDate dateTime
);

ALTER TABLE bitacoras ADD estado varchar(20) DEFAULT 'active';

UPDATE bitacoras SET estado = 'inactive' WHERE bitacoraId = 119;