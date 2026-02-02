"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignupForm() {
	const [isPending, setIsPending] = useState(false);

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

		await authClient.signUp.email({
			name: name as string,
			email: email as string,
			password: password as string,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (err) => {
					process.env.NODE_ENV === "development" &&
						console.error("Sign-up error:", err);
					toast.error("Sign-up failed. Please try again.");
				},
				onSuccess: () => {
					toast.success(
						"Sign-up successful! Please check your email to verify your account.",
					);
				},
			},
		});
	};

	return (
		<form onSubmit={signUp}>
			<div>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" />
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" />
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" />
			</div>
			<button type="submit" disabled={isPending}>
				Sign Up
			</button>
		</form>
	);
}
