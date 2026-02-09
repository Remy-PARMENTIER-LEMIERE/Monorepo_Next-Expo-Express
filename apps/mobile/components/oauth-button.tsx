import { useRouter } from "expo-router";
import { useState } from "react";
import { Button } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function OAuthButton({ provider }: { provider: string }) {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const handlePress = async () => {
		await authClient.signIn.social({
			provider,
			callbackURL: `${process.env.EXPO_PUBLIC_APP_NAME}://`,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onSuccess: () => {
					router.replace("/home");
				},
			},
		});
	};

	return (
		<Button
			title={
				!isPending
					? provider.charAt(0).toUpperCase() + provider.slice(1)
					: "Loading..."
			}
			onPress={handlePress}
			color={"blue"}
		/>
	);
}
