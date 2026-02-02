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
		<form onSubmit={login}>
			<div>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" />
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" />
			</div>
			<Link
				href="/auth/forgot-password"
				className="text-sm italic text-foreground hover:underline underline-offset-2"
			>
				Mot de passe oublié ?
			</Link>
			<button type="submit" disabled={isPending}>
				Login
			</button>
		</form>
	);
}
