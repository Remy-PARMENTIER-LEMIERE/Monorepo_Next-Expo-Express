"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
	const [isPending, setIsPending] = useState(false);

	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const { email, password } = Object.fromEntries(data.entries());

		if (!email || !password) {
			toast.error("Please fill in all fields.");
			return;
		}

		await authClient.signIn.email({
			email: email as string,
			password: password as string,
			callbackURL: "/",
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (err) => {
					process.env.NODE_ENV === "development" &&
						console.error("Login error:", err);
					toast.error("Login failed. Please try again.");
				},
			},
		});
	};

	return (
		<form onSubmit={login} className="flex flex-col gap-4">
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
			<Link
				href="/auth/forgot-password"
				className="text-sm italic text-foreground hover:underline underline-offset-2"
			>
				Forgot your password?
			</Link>
			<button
				type="submit"
				disabled={isPending}
				className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 block"
			>
				Login
			</button>
		</form>
	);
}
