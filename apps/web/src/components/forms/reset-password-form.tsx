"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordForm({ token }: { token?: string }) {
	const [isPending, setIsPending] = useState(false);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const newPassword = formData.get("new-password");
		const confirmPassword = formData.get("confirm-password");

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}

		await authClient.resetPassword({
			token: token as string,
			newPassword: newPassword as string,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (err) => {
					process.env.NODE_ENV === "development" &&
						console.error("Reset password error:", err);
					toast.error("Failed to reset password. Please try again.");
				},
				onSuccess: () => {
					toast.success("Password has been reset successfully.");
				},
			},
		});
	};

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			<div>
				<label
					htmlFor="new-password"
					className="block mb-2 text-sm font-medium text-foreground"
				>
					New Password
				</label>
				<input
					type="password"
					id="new-password"
					name="new-password"
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label
					htmlFor="confirm-password"
					className="block mb-2 text-sm font-medium text-foreground"
				>
					Confirm Password
				</label>
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				disabled={isPending}
			>
				Reset Password
			</button>
		</form>
	);
}
