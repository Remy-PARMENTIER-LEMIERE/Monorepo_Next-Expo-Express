import ResetPasswordForm from "@/components/forms/reset-password-form";

export default async function ResetPasswordPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const params = await searchParams;
	if (!params.token) {
		return (
			<main className="flex flex-col items-center justify-between min-h-screen p-24">
				<h1 className="text-4xl font-bold">Reset password</h1>
				<section className="flex-1 flex flex-col gap-4 items-center justify-center">
					<p className="text-foreground">
						Unauthorized access. Please use the link provided in your email to
						reset your password.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-4xl font-bold">Reset password</h1>
			<section className="flex-1 flex flex-col gap-4 items-center justify-center">
				<p className="text-foreground">
					Please enter your new password below to reset your account password.
				</p>
				<ResetPasswordForm token={params.token} />
			</section>
		</main>
	);
}
