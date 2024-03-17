ALTER TABLE "tweet" ALTER COLUMN "data" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tweet" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tweet" DROP COLUMN IF EXISTS "created_at";