import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState("");
	const handleForgotPassword = async () => {
		await authClient.requestPasswordReset({
			email,
			redirectTo: `${process.env.EXPO_PUBLIC_APP_NAME}://`,
		});
	};

	return (
		<View>
			<Text>Forgot Password Screen</Text>
			<TextInput
				placeholder="Enter your email"
				value={email}
				onChangeText={setEmail}
			/>
			<Button
				title="Reset Password"
				onPress={handleForgotPassword}
				color={"blue"}
			/>
		</View>
	);
}
