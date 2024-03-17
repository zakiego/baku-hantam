CREATE TABLE IF NOT EXISTS "topic" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tweet" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL,
	"data" json NOT NULL,
	"topic" text NOT NULL,
	"user_id" text NOT NULL,
	"show" boolean,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id_str" text PRIMARY KEY NOT NULL,
	"name" text,
	"screen_name" text,
	"profile_image_url_https" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
