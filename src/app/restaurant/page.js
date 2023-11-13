"use client"
import Navbar from "@/components/navbar"
import { getRestaurantDetails, getFilterRestaurant } from "@/logic/restaurant";
import { getUserId } from "@/logic/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [result, setResult] = useState(null)
  const [allRestaurantList, setAllRestaurantList] = useState(null)

  useEffect(() => {
    const userId = getUserId(router)
    getRestaurantDetails().then(({err, result}) => {
			if(err){
				console.log("error")
			} else {
				setResult(result)
        // console.log(result.restaurantList)
        setAllRestaurantList(result.restaurantList)
			}
		})
  },[])
  
  const [formData, setFormData] = useState({
    name: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
		e.preventDefault()
    const filterResult = getFilterRestaurant(allRestaurantList, formData);
    const {totalTicketList} = result
    setResult({restaurantList: filterResult, totalTicketList})
  };

  const showRestaurantList = (result) => {
    if (result){
      const {restaurantList, totalTicketList} = result
      return (
        <>
        {
          restaurantList.map((restaurant, index) => {
            return (
              <li key= {restaurant.id}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm font-medium text-gray-500">Queue: <span className="text-green-600">{totalTicketList.get(restaurant.id)}</span></p>
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
      <div className="mt-10">
        <div className="flex justify-center">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <div className="flex items-center">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-sky-200">Name:</label>
              <div className="ms-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <label htmlFor="time" className="block text-sm font-medium leading-6 text-sky-200 ms-2">Time:</label>
              <div className="ms-2">
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex ms-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Search
                  </button>
                </div>
            </div>
          </form>
        </div>
        <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-5">
          {showRestaurantList(result)}  
        </ul>
      </div>
    </main>
  );
}