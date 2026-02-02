import ForgotPasswordForm from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
	return (
		<main className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
			<h1 className="text-3xl font-bold">Forgot Password</h1>
			<section className="space-y-8">
				<p className="text-foreground">
					Tap your email address below, and we will send you instructions to
					reset your password.
				</p>
				<ForgotPasswordForm />
			</section>
		</main>
	);
}
