CREATE TABLE `auth_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`hashed_password` text
);
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`active_expires` integer,
	`idle_expires` integer
);