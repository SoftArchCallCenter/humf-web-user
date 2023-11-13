"use client"
import Navbar from "@/components/navbar"
import { getAllRestaurant } from "@/logic/restaurant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [restaurantList, setRestaurantList] = useState(null)

  useEffect(() => {

    getAllRestaurant().then(({err, result}) => {
			if(err){
				console.log("error")
				setRestaurantList(null)
			} else {
				console.log(result)
				setRestaurantList(result.Restaurant)
			}
		})

  },[])

  const showRestaurantList = (restaurantList) => {
    if (restaurantList){
      return (
        <>
        {
          restaurantList.map((restaurant, index) => {
            return (
              <li key= {restaurant.id}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{restaurant.name}</h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">Open Time: <span className="text-green-600">{restaurant.openTime}</span></p>
                    <p className="text-sm font-medium text-gray-500 break-all">Close Time: <span className="text-green-600">{restaurant.closeTime}</span></p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 break-all">Address: <span className="text-green-600">{restaurant.address}</span></p>
                    <a href={`/menu/${restaurant.id}`} className="pl-1 font-medium text-cyan-600 hover:text-red-800">See Menu</a>
                  </div>
                </div>
              </li>
            )
          })
        }
        </>
      )
    } else {
      return (
        <li>
          <div>
            <h2 className="my-6 flex justify-center text-xl text-black font-bold">No Restaurant Item</h2>
          </div>
        </li>
      )
    }
  }

  return (
    <main className="min-h-screen flex-col justify-between">
      <Navbar />
      <div className="text-right relative">
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
          {showRestaurantList(restaurantList)}  
        </ul>
      </div>
    </main>
  );
}