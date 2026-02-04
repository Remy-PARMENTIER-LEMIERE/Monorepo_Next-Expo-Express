import ButtonOAuth from "@/components/button-oauth";
import SignupForm from "@/components/forms/signup-form";

export default function SignupPage() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-4xl font-bold">Sign Up</h1>
			<div className="flex flex-1 flex-col gap-6 items-center justify-center">
				<SignupForm />
				<ButtonOAuth
					provider="google"
					sign="up"
					className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 mt-4"
				/>
			</div>
		</main>
	);
}
