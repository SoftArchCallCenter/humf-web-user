"use client"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { getUserId } from "@/logic/user";
import { getTicketsByUserId, completeTicket } from "@/logic/kitchen";
import { getNotiByUserId } from "@/logic/noti";

export default function Home() {
  const router = useRouter();
	const [profile_url, setProfile] = useState(null)
  const [notiList, setNotiList] = useState(null)

	useEffect(() => {
    const userId = getUserId(router)
		const profile = sessionStorage.getItem("profile_url")
		setProfile(profile)
    const lastTime = sessionStorage.getItem("time") | new Date();
    getNotiByUserId(lastTime, userId).then(({err, result}) => {
      if (!err){
          console.log(result)
          setNotiList(result.notification)
      } else {
          console.log("error")
          setNotiList(null)
      }
    })
	}, [])


  const handleReceived = (ticketId) => {
    completeTicket(ticketId).then(({err, result}) => {
      if(err){
        console.log("error")
      } else {
        alert(`you marked ticket ${ticketId} received`)
        location.reload();
      }
    })
  }

  const updateTime = () => {
    sessionStorage.setItem("time", new Date());
    location.reload();
  }

  const notiPage = (notiList) => {
    if(notiList){
      return (
        <>
          <div className="flex items-center justify-center w-full mt-8">
            <hr className="w-5/12 h-1 bg-gray-200 border-0 rounded dark:bg-gray-700"/>
            <div className="absolute flex items-center justify-center px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
              <h1 className="font-mono-medium text-lg text-gray-700 dark:text-gray-300">
                Recent Notification
              </h1>
            </div>
          </div>
          <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-6">
            {notiList &&
              notiList.map((noti, index) => {
              return (
                <li key= {noti._id}>
                  <div className="px-4 py-5 sm:px-6 border-2 border-b-slate-300">
                    <div className="flex items-center justify-between">
                      <h3 className="ms-2 text-lg leading-6 font-medium text-gray-900">Ticket : {noti.ticket_id}</h3>
                      {noti.status === "accepted" && <a className="font-medium text-red-600">Accepted</a>}
                      {noti.status === "finished" && <a className="font-medium text-blue-600">Finished</a>}
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
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">There is no recent event</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Please go take more order.</p>
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
			<Navbar showFull = {true} profile_url = {profile_url} inNotiPage = {true}/>
			{notiPage(notiList)}
      <div class="flex flex-center justify-center space-x-4 mt-2">
        <button onClick={()=>location.reload()} class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Refresh Page</button>
        <button onClick={()=>updateTime()} class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Mark as read</button>
      </div>
		</main>
		
	)
}