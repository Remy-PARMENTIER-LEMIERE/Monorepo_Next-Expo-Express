import { Html, Link, Text } from "@react-email/components";
import "react";

export function VerificationEmail(props: { url: string }) {
	const { url } = props;

	return (
		<Html lang="en">
			<Text>Please verify your email address to complete registration.</Text>
			<Link href={url}>Click me</Link>
		</Html>
	);
}
