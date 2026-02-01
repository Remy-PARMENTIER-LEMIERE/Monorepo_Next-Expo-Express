// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "@repo/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./argon2";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	baseURL: process.env.CLIENT_URL,
	trustedOrigins: [
		String(process.env.CLIENT_URL),
		String(process.env.APP_URL),
		String(process.env.MOBILE_ORIGIN),
	],
	advanced: {
		useSecureCookies: true,
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
		password: {
			hash: hashPassword,
			verify: verifyPassword,
		},
	},
	socialProviders: {
		google: {
			prompt: "select_account consent",
			accessType: "offline",
			clientId: process.env.OAUTH_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET as string,
		},
	},
});
