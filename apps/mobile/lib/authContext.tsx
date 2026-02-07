import { SplashScreen } from "expo-router";
import { createContext, type PropsWithChildren, useEffect } from "react";
import { authClient } from "./auth-client";

SplashScreen.preventAutoHideAsync();

// Utilisez le type retourné par useSession ou getSession
type Session = typeof authClient.$Infer.Session;
type User = Session["user"];

export const AuthContext = createContext<{
	user: User | null;
	isPending: boolean;
}>({ user: null, isPending: true });

export function AuthProvider({ children }: PropsWithChildren) {
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!isPending) {
			SplashScreen.hideAsync();
		}
	}, [isPending]);

	return (
		<AuthContext.Provider
			value={{
				user: session?.user ?? null,
				isPending,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
