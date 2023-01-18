----- USER TABLE

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(255) NOT NULL UNIQUE,
    password character varying(255) NOT NULL,
    phone_number numeric(10,0),
    email_address character varying(255) NOT NULL,
    subscription_default boolean NOT NULL DEFAULT false,
    profile_img_url character varying(255)
);

CREATE UNIQUE INDEX user_pk ON "user"(id int4_ops);
CREATE UNIQUE INDEX user_username_key ON "user"(username text_ops);

------ EVENT TABLE

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    date date NOT NULL,
    time time with time zone NOT NULL,
    location character varying(255),
    description character varying(400) NOT NULL,
    ticket_link character varying(255),
    visible boolean NOT NULL,
    host_id integer NOT NULL REFERENCES "user"(id)
);

CREATE UNIQUE INDEX event_pk ON event(id int4_ops);

------ USER/EVENT JUNCTION TABLE

CREATE TYPE guest_state AS ENUM ('subscribed', 'added', 'pending');

CREATE TABLE user_event (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    event_id integer NOT NULL REFERENCES event(id) ON DELETE CASCADE,
    guest_state guest_state NOT NULL DEFAULT 'pending'::guest_state,
    is_read boolean NOT NULL DEFAULT false
);

CREATE UNIQUE INDEX user_event_pk ON user_event(id int4_ops);