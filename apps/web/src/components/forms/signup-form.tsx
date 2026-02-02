"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignupForm() {
	const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const { name, email, password } = Object.fromEntries(data.entries());

		if (!name || !email || !password) {
			toast.error("Please fill in all fields.");
			return;
		}

		process.env.NODE_ENV === "development" &&
			console.warn("Signing up user:", { name, email, password });

		const result = await authClient.signUp.email({
			name: name as string,
			email: email as string,
			password: password as string,
		});

		if (result.error) {
			process.env.NODE_ENV === "development" &&
				console.error("Sign-up error:", result.error);
			toast.error("Sign-up failed. Please try again.");
		} else {
			toast.success(
				"Sign-up successful! Please check your email to verify your account.",
			);
		}
	};

	return (
		<form onSubmit={signUp}>
			<label htmlFor="name">Name</label>
			<input type="text" id="name" name="name" />
			<label htmlFor="email">Email:</label>
			<input type="email" id="email" name="email" />
			<label htmlFor="password">Password:</label>
			<input type="password" id="password" name="password" />
			<button type="submit">Sign Up</button>
		</form>
	);
}
