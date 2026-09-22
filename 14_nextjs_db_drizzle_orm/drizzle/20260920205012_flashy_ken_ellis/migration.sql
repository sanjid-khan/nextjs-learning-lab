CREATE TABLE "notes" (
	"id" serial PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
