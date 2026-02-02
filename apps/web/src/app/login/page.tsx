import ButtonOAuth from "@/components/button-oauth";
import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-4xl font-bold">Login Page</h1>
			<ButtonOAuth provider="google" sign="in" />
			<LoginForm />
		</main>
	);
}
