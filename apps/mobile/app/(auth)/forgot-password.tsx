import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState("");
	const handleForgotPassword = () => {
		// Handle forgot password logic here
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
