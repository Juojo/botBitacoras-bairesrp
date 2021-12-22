-- drop database if exists botBitacoras;
create database botBitacoras;
use botBitacoras;

create table bitacoras (
    bitacoraId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    discordId bigint(25),
    username varchar(30),
    openDate dateTime,
    closeDate dateTime
);

ALTER TABLE bitacoras ADD is_active TINYINT(1) DEFAULT 1;

UPDATE bitacoras SET is_active = 0 WHERE bitacoraId = 119;