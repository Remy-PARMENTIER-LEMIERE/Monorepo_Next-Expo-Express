import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// L'URL de ton api-server Express
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	// Important pour que les cookies soient envoyés au serveur Express
	fetchOptions: {
		credentials: "include",
	},
});
