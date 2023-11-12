"use client"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { deleteRestaurant, getRestaurantByUserId } from "@/logic/restaurant";
import { getUserId, getUserById } from "@/logic/user";
import Image from 'next/image'


export default function Home() {
	const router = useRouter();
	const [user, setUser] = useState(null)

	useEffect(() => {
		const userId = getUserId(router)
		getUserById(userId).then(({err, result}) => {
			console.log(result)
			if(err){
				console.log("error")
				setUser(null)
			} else {
				console.log(result)
				setUser(result)
			}
		})

	},[])

	// useEffect(() => {
	// 	if (restaurant){
	// 		sessionStorage.setItem("resId", restaurant.id)
	// 	} else {
	// 		sessionStorage.removeItem("resId")
	// 	}
	// },[restaurant])

	const removeRestaurant = (resId) => {
		deleteRestaurant(resId).then(({err, result}) => {
			if (err){
				console.log("error")
			} else {
				location.reload();
			}
		})
	}

	const homePage = (user) => {
        console.log(user)
		// const src = user.profilePictureUrl;
		if (user) {
			return (
				<div className="mt-10 flex items-center justify-center">
					<div className="w-80 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.name}</h5>
						<Image src={user.profilePictureUrl} unoptimized width={500} height={500}/>
						{/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Pic : {user.profilePictureUrl}</p> */}
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Username : {user.username}</p>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Email : {user.email}</p>
						<a href="/edit" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Edit User profile
							<svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
							</svg>
						</a>
						{/* Do profile pic too */}
					</div>
				</div>
			)
		} else {
			return (
				// For no user?
				<div className="mt-10 flex items-center justify-center">
					<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">There is no User</h5>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Please Login / Signup.</p>
					</div>
				</div>
			)
		} 
	}
	return (
		<main className="min-h-screen flex-col justify-between">
			<Navbar showFull = {user}/>
			{homePage(user)}
		</main>
		
	)
}