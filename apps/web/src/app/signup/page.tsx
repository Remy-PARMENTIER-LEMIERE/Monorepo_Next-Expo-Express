import ButtonOAuth from "@/components/button-oauth";
import SignupForm from "@/components/forms/signup-form";

export default function SignupPage() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-4xl font-bold">Sign Up</h1>

			<ButtonOAuth provider="google" sign="up" />
			<SignupForm />
		</main>
	);
}
