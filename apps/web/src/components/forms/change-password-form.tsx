"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ChangePasswordForm() {
	const [isPending, setIsPending] = useState(false);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Handle password change logic here
		const formData = new FormData(event.currentTarget);
		const currentPassword = formData.get("current-password") as string;
		const newPassword = formData.get("new-password") as string;
		const confirmPassword = formData.get("confirm-password") as string;
		const revokeOtherSessions = formData.get("revoke-other-sessions") === "on";

		if (newPassword !== confirmPassword) {
			toast.error("New password and confirmation do not match.");
			return;
		}

		await authClient.changePassword({
			currentPassword,
			newPassword,
			revokeOtherSessions,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onSuccess: () => {
					toast.success("Password changed successfully.");
				},
				onError: (error) => {
					process.env.NODE_ENV === "development" && console.error(error);
					toast.error("Failed to change password. Please try again.");
				},
			},
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="current-password">Current Password</label>
				<input
					type="password"
					id="current-password"
					name="current-password"
					required
				/>
			</div>
			<div>
				<label htmlFor="new-password">New Password</label>
				<input type="password" id="new-password" name="new-password" required />
			</div>
			<div>
				<label htmlFor="confirm-password">Confirm Password</label>
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					required
				/>
			</div>
			<div>
				<input
					type="checkbox"
					id="revoke-other-sessions"
					name="revoke-other-sessions"
				/>
				<label htmlFor="revoke-other-sessions">Disconnect Other Sessions</label>
			</div>
			<button type="submit" disabled={isPending}>
				Change Password
			</button>
		</form>
	);
}
