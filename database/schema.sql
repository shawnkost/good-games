set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reviews" (
	"reviewId" serial NOT NULL,
	"gameId" integer NOT NULL,
	"details" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL default now(),
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "gameList" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"gameId" integer NOT NULL,
	"wantToPlay" BOOLEAN NOT NULL,
	"played" BOOLEAN NOT NULL,
	CONSTRAINT "gameList_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "gameList" ADD CONSTRAINT "gameList_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
