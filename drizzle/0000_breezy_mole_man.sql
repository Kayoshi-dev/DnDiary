CREATE TABLE `characters` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`scenario_id` integer,
	FOREIGN KEY (`scenario_id`) REFERENCES `scenarios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scenarios` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
