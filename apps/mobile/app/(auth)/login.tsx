import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPending, setIsPending] = useState(false);

	const handleLogin = async () => {
		await authClient.signIn.email({
			email,
			password,
			callbackURL: `${process.env.EXPO_PUBLIC_APP_NAME}://`,
			fetchOptions: {
				onRequest: () => setIsPending(true),
				onResponse: () => setIsPending(false),
			},
		});
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				style={styles.input}
			/>
			<Button
				title={isPending ? "Logging in..." : "Login"}
				onPress={handleLogin}
				disabled={isPending}
				color="blue"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	input: {
		width: "100%",
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
	},
});
