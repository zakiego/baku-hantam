ALTER TABLE "user" RENAME COLUMN "id" TO "id_str";--> statement-breakpoint
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tweet" ADD CONSTRAINT "tweet_user_id_user_id_str_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id_str") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
