import ButtonOAuth from "@/components/button-oauth";
import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-4xl font-bold">Login Page</h1>
			<div className="flex flex-1 flex-col gap-6 items-center justify-center">
				<LoginForm />
				<ButtonOAuth
					provider="google"
					sign="in"
					className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 mt-4"
				/>
			</div>
		</main>
	);
}
