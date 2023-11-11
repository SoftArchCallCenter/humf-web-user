"use client"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { deleteRestaurant, getRestaurantByUserId } from "@/logic/restaurant";
import { getUserId } from "@/logic/user";

export default function Home() {
	const router = useRouter();
	const [restaurant, setRestaurant] = useState(null)

	useEffect(() => {
		const userId = getUserId(router)

		getRestaurantByUserId(userId).then((result) => {
			if(result.err){
				console.log("error")
				setRestaurant(null)
			} else {
				console.log(result.result)
				setRestaurant(result.result)
			}
		})

	},[])

	const removeRestaurant = (resId) => {
		deleteRestaurant(resId).then((result) => {
			if (result.err){
				console.log("error")
			} else {
				location.reload();
			}
		})
	}
	const homePage = (restaurant) => {
		if (restaurant) {
			return (
				<div className="mt-10 flex items-center justify-center">
					<div className="w-80 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h5>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Address : {restaurant.address}</p>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Open Time : {restaurant.openTime}</p>
						<p className="mb-4 font-normal text-gray-700 dark:text-gray-400">Close Time : {restaurant.closeTime}</p>
						<a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => removeRestaurant(restaurant.id)}>
							<svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12M1 5"/>
							</svg>
							Remove restaurant
						</a>
					</div>
				</div>
			)
		} else {
			return (
				<div className="mt-10 flex items-center justify-center">
					<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">There is no user</h5>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Please login before using the website.</p>
						<a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							login
							<svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
							</svg>
						</a>
					</div>
				</div>
			)
		} 
	}
	return (
		<main className="min-h-screen flex-col justify-between">
			<Navbar showFull = {true}/>
			{homePage(restaurant)}
		</main>
		
	)
}