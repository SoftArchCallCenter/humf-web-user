"use client"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { getUserId } from "@/logic/user";
import { findOrderByUser } from "@/logic/order";

export default function Home() {
	const router = useRouter();
  const [orderList, setOrderList] = useState(null)
  const [profile_url, setProfile] = useState(null)

	useEffect(() => {
		const userId = getUserId(router)
    const profile = sessionStorage.getItem("profile_url")
    setProfile(profile)
		findOrderByUser(userId).then(({err, result}) => {
			if(err){
				console.log("error")
			} else {
				console.log(result)
        setOrderList(result.result)
			}
		})
	},[])

  const historyPage = (orderList) => {
    if (orderList) {
      return (
        <>
          <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-6">
            {orderList &&
              orderList.map((order, index) => {
              return (
                <li key= {index}>
                  <div className="px-4 py-5 sm:px-6 border-2 border-b-slate-300">
                    <div className="flex items-center justify-start">
                      <h3 className="ms-2 text-lg leading-6 font-medium text-gray-900">Order : {index+1}</h3>
                      <ul className="text-gray-600 list-disc ml-6">
                        {order.menus.map( (menu, index2) => {
                          return (<li key= {`${(index+1)*(index2+1)}`} className="text-sm ms-10"><h1 className="inline text-lg text-black font-normal">{menu.name}</h1> Quatity : {menu.quatity}</li>)
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              )
              })
            }
          </ul>
        </>
      )
    } else {
      return (
        <div className="mt-10 flex items-center justify-center">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">There is no history order</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Your old order will appear here.</p>
            <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Back to home
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
			<Navbar showFull = {true} profile_url = {profile_url}/>
			{historyPage(orderList)}
		</main>
		
	)
}