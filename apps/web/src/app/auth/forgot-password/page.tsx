import ForgotPasswordForm from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-3xl font-bold">Forgot Password</h1>
			<section className="flex-1 flex flex-col gap-4 items-center justify-center">
				<p className="text-foreground">
					Tap your email address below, and we will send you instructions to
					reset your password.
				</p>
				<ForgotPasswordForm />
			</section>
		</main>
	);
}
