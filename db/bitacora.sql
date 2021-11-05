create database botBitacoras;
use botBitacoras;

DROP TABLE bitacora;

create table bitacora(
    bitacoraId int not null AUTO_INCREMENT,
    discordId int not null,
    username varchar(30),
    openDate dateTime,
    closeDate dateTime,
    total time,
    constraint pk_bitacora primary key(bitacoraId)
);

insert into bitacora values
("", 1235, "Juojo", "2021-11-5 18:20:00", "2021-11-5 19:00:00", "00:40:00"),
("", 1235, "Juojo", "2021-11-5 18:20:00", "2021-11-5 19:00:00", "00:40:00"),
("", 1235, "Juojo", "2021-11-5 18:20:00", "2021-11-5 19:00:00", "00:40:00"),
("", 1235, "Juojo", "2021-11-5 18:20:00", "2021-11-5 19:00:00", "00:40:00")
;

SELECT DATEADD(ms, SUM(DATEDIFF(ms, '00:00:00.000', total)), '00:00:00.000') as time
from bitacora;