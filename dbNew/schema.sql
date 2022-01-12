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
ALTER TABLE bitacoras ADD week_day int;

UPDATE bitacoras SET is_active = 0 WHERE bitacoraId = 119;

-- Horas totales
select sum(openDate) from bitacoras where discordId = 477581625841156106;

-- seleccionar duracion de todos los ciclos de esta semana => select opendDate que este dentro de esta semana

select timediff(closeDate, openDate) As "duracion" from bitacoras where bitacoraId = ${id}

select sum(timediff(closeDate, openDate)) As "suma de duraciones"
from bitacoras
where (
    SELECT WEEK(NOW()) AS Current_Week
) = (
    SELECT WEEK(openDate) from bitacoras
)

select *
from bitacoras
where (
    SELECT WEEK(NOW()) AS Current_Week
) = (
    SELECT WEEK(openDate) from bitacoras
)

INSERT INTO bitacoras values(week_day) SELECT WEEK(NOW()) AS Current_Week;


seleccionar los ciclos que comienzen en esta semana (opendDate) y luego averiguar la duracion de cada uno de ellos para poder sumarla y mostrarla como output

esta semana => select CAST(sum(timediff(closeDate, openDate)) AS TIME) from bitacoras where opendate between "2022-01-09 23:59:59" and "2022-01-17 00:00:00";

-- Mensaje que se mandaria semanalmente con la info de cada user

select username, discordId, count(openDate) As countCiclos_semana, CAST(sum(timediff(closeDate, openDate)) AS TIME) As "Total en la semana"
from bitacoras
where is_active = 1 and opendate between "2021-01-09 23:59:59" and "2022-01-17 00:00:00"
group by discordId;