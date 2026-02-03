"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = String(formData.get("email"));

		if (!email) {
			return toast.error("Email field is required.");
		}

		await authClient.requestPasswordReset({
			email,
			redirectTo: `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/reset-password`,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (err) => {
					process.env.NODE_ENV === "development" &&
						console.error("Forgot password error:", err);
					toast.error("Failed to send password reset email. Please try again.");
				},
				onSuccess: () => {
					router.push("/auth/forgot-password/success");
				},
			},
		});
	};

	return (
		<form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-2">
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" required className="" />
			</div>
			<button type="submit" disabled={isPending} className="">
				Envoyer
			</button>
		</form>
	);
}
