CREATE TABLE `ambience` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`url` text
);
--> statement-breakpoint
CREATE TABLE `soundscape` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `soundscape_ambience` (
	`id` integer PRIMARY KEY NOT NULL,
	`soundscape_id` integer NOT NULL,
	`ambience_id` integer NOT NULL,
	FOREIGN KEY (`soundscape_id`) REFERENCES `soundscape`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ambience_id`) REFERENCES `ambience`(`id`) ON UPDATE no action ON DELETE no action
);
