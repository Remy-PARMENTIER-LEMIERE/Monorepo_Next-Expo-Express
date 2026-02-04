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
		<form onSubmit={signUp} className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<label htmlFor="name" className="cursor-pointer">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					className="border-gray-400 border-2 rounded px-4 py-2"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="email" className="cursor-pointer">
					Email:
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="border-gray-400 border-2 rounded px-4 py-2"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="password" className="cursor-pointer">
					Password:
				</label>
				<input
					type="password"
					id="password"
					name="password"
					className="border-gray-400 border-2 rounded px-4 py-2"
				/>
			</div>
			<button
				type="submit"
				disabled={isPending}
				className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 block"
			>
				Sign Up
			</button>
		</form>
	);
}
