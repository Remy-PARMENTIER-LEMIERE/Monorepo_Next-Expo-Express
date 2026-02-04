import ChangePasswordForm from "@/components/forms/change-password-form";

export default function ChangePasswordPage() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-4xl font-bold">Change Password</h1>
			<section className="flex-1 flex flex-col gap-4 items-center justify-center">
				<ChangePasswordForm />
			</section>
		</main>
	);
}
