import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/lib/authContext";

export default function Index() {
	const { isPending, user } = useContext(AuthContext);

	if (isPending) {
		return null;
	}

	if (user) {
		return <Redirect href="/(protected)/(tabs)/index" />;
	}

	return <Redirect href="/(auth)/login" />;
}
