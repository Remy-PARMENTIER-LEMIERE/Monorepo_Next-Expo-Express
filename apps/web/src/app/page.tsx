import Link from "next/link";

export default function Page() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<h1 className="text-4xl font-bold">Welcome to the Web App</h1>
			<div className="flex gap-4">
				<Link
					href="/login"
					className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
				>
					Go to Login Page
				</Link>
				<Link
					href="/signup"
					className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700"
				>
					Go to Signup Page
				</Link>
			</div>
		</main>
	);
}
