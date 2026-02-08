import { Link } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function SignUpScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPending, setIsPending] = useState(false);

	const handleSignUp = async () => {
		await authClient.signUp.email({
			email,
			password,
			name,
			fetchOptions: {
				onRequest: () => setIsPending(true),
				onResponse: () => setIsPending(false),
			},
		});
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Name"
				value={name}
				onChangeText={setName}
				style={styles.input}
			/>
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
				title={isPending ? "Signing up..." : "Sign Up"}
				onPress={handleSignUp}
				disabled={isPending}
				color="blue"
			/>
			<Text style={styles.login}>
				Already have an account?{" "}
				<Link href="/(auth)/login" style={styles.link}>
					Login
				</Link>
			</Text>
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
	login: {
		marginTop: 16,
	},
	link: { color: "blue" },
});
