import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
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
		});
	};

	return (
		<form onSubmit={login}>
			<label htmlFor="email">Email:</label>
			<input type="email" id="email" name="email" />
			<label htmlFor="password">Password:</label>
			<input type="password" id="password" name="password" />
			<button type="submit">Login</button>
		</form>
	);
}
