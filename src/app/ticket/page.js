"use client"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"

export default function Home() {
	const [profile_url, setProfile] = useState(null)
	useEffect(() => {
		const profile = sessionStorage.getItem("profile_url")
		setProfile(profile)
	})

	return (
		<main className="min-h-screen flex-col justify-between">
			<Navbar showFull = {true} profile_url = {profile_url}/>

		</main>
		
	)
}