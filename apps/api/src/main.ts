// Load environment variables from .env file
import "dotenv/config";

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
// import "../database/checkConnection";

import { prisma } from "@repo/database";
// Import the Express application from ./app
import app from "./app";

// Get the port from the environment variables
const port = process.env.APP_PORT;

async function start() {
	// Optional: check DB connection before starting the server
	try {
		await prisma.$connect();
		console.info("Prisma connected successfully.");
	} catch (err) {
		console.error("Failed to connect Prisma:", (err as Error).message);
		// You can decide to exit here if DB is mandatory
		process.exit(1);
	}

	const server = app
		.listen(port, () => {
			console.info(`Server is listening on port ${port}`);
		})
		.on("error", (err: Error) => {
			console.error("Error:", err.message);
		});

	// Graceful shutdown
	const shutdown = async () => {
		try {
			await prisma.$disconnect();
		} catch {}
		server.close(() => process.exit(0));
	};
	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
}

void start();
