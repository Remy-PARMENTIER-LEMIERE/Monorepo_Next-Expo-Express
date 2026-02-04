export default function ForgotPasswordSuccessPage() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-4xl font-bold">Email sent</h1>
			<section className="flex-1 flex flex-col gap-4 items-center justify-center">
				<p className="text-foreground">
					Please check your email for a link to reset your password.
				</p>
			</section>
		</main>
	);
}
