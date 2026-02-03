import ResetPasswordForm from "@/components/forms/reset-password-form";

export default async function ResetPasswordPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const params = await searchParams;
	if (!params.token) {
		return (
			<main className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
				<h1 className="text-3xl font-bold">Reset password</h1>
				<section className="space-y-8">
					<p className="text-foreground">
						Unauthorized access. Please use the link provided in your email to
						reset your password.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
			<h1 className="text-3xl font-bold">Reset password</h1>
			<section className="space-y-8">
				<p className="text-foreground">
					Please enter your new password below to reset your account password.
				</p>
				<ResetPasswordForm token={params.token} />
			</section>
		</main>
	);
}
