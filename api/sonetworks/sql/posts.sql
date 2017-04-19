CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO sonetworks_campaign values(uuid_generate_v4(), 'Coca Cola', 'Ejemplo', true, null);
INSERT INTO sonetworks_phase values(uuid_generate_v4(), 'Inicial', 'Ejemplo', true, null, (select id from sonetworks_campaign));
