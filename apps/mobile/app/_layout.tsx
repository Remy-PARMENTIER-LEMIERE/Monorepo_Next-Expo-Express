import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<StatusBar style="auto" />
			<Stack>
				<Stack.Screen
					name="(auth)"
					options={{
						headerShown: false,
						animation: "none",
					}}
				/>
				<Stack.Screen
					name="(protected)"
					options={{
						headerShown: false,
						animation: "none",
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
