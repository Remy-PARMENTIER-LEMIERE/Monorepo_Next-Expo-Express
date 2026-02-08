import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/lib/authContext";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<AuthProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<StatusBar style="auto" />
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="(auth)" />
					<Stack.Screen name="(protected)" />
				</Stack>
			</ThemeProvider>
		</AuthProvider>
	);
}
