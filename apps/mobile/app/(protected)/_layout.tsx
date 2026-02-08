import { router, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/lib/authContext";

export default function ProtectedLayout() {
	const { isPending, user } = useContext(AuthContext);

	useEffect(() => {
		if (!isPending && !user) {
			router.replace("/(auth)/login");
		}
	}, [isPending, user]);

	if (isPending || !user) {
		return null;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
