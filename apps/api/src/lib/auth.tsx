// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "@repo/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { ForgotPasswordEmail } from "./emails/email-forgot-password";
import { VerificationEmail } from "./emails/email-verification";
import { resend } from "./resend";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	baseURL: process.env.APP_URL,
	trustedOrigins: [
		String(process.env.CLIENT_URL),
		String(process.env.APP_URL),
		String(process.env.MOBILE_ORIGIN),
	],
	advanced: {
		useSecureCookies: process.env.NODE_ENV === "production",
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
		revokeSessionsOnPasswordReset: true,
		password: {
			hash: hashPassword,
			verify: verifyPassword,
		},
		async sendResetPassword({ user, url }) {
			await resend.emails.send({
				from: `${process.env.APP_NAME} <${process.env.NODE_ENV === "development" ? "notifications@resend.dev" : process.env.NOTIFICATIONS_EMAIL}>`,
				to:
					process.env.NODE_ENV === "development"
						? "delivered@resend.dev"
						: user.email,
				subject: "Reset your password",
				react: <ForgotPasswordEmail url={url} />,
			});
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		expiresIn: 60 * 60,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			const link = new URL(url);
			link.searchParams.set("callbackURL", "/auth/verify");

			await resend.emails.send({
				from: `${process.env.APP_NAME} <${process.env.NODE_ENV === "development" ? "notifications@resend.dev" : process.env.NOTIFICATIONS_EMAIL}>`,
				to:
					process.env.NODE_ENV === "development"
						? "delivered@resend.dev"
						: user.email,
				subject: "Verify your email address",
				react: <VerificationEmail url={link.toString()} />,
			});
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
	session: {
		expiresIn: 30 * 24 * 60 * 60, // 30 jours
		updateAge: 24 * 60 * 60, // Rafraîchissement chaque jour
	},
});
