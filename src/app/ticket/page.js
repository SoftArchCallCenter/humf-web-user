"use client"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { getUserId } from "@/logic/user";
import { getTicketsByUserId, completeTicket } from "@/logic/kitchen";

export default function Home() {
  const router = useRouter();
	const [profile_url, setProfile] = useState(null)
  const [ticketList, setTicketList] = useState(null)
  const [acceptTicketList, setAcceptTicketList] = useState(null);
  const [finishTicketList, setFinishTicketList] = useState(null);

	useEffect(() => {
    const userId = getUserId(router)
		const profile = sessionStorage.getItem("profile_url")
		setProfile(profile)
    getTicketsByUserId(userId).then(({err, result}) => {
      if(err){
        console.log("error")
      } else {
        // console.log(result)
        if (result.tickets){
          setTicketList(result.tickets)
        } else {
          setTicketList(null)
        } 
      }
    })
	}, [])

  useEffect(() => {
    if (ticketList){
      setAcceptTicketList(ticketList.filter((ticket) => ticket.status === "accepted"))
      setFinishTicketList(ticketList.filter((ticket) => ticket.status !== "accepted"))
    }
  },[ticketList])

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

  const ticketPage = (ticketList) => {
    if(ticketList){
      return (
        <>
          <div className="flex items-center justify-center w-full mt-8">
            <hr className="w-5/12 h-1 bg-gray-200 border-0 rounded dark:bg-gray-700"/>
            <div className="absolute flex items-center justify-center px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
              <h1 className="font-mono-medium text-lg text-gray-700 dark:text-gray-300">
                Accepted
              </h1>
            </div>
          </div>
          <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-6">
            {acceptTicketList &&
              acceptTicketList.map((ticket, index) => {
              return (
                <li key= {ticket.id}>
                  <div className="px-4 py-5 sm:px-6 border-2 border-b-slate-300">
                    <div className="flex items-center justify-between">
                      <h3 className="ms-2 text-lg leading-6 font-medium text-gray-900">Ticket : {ticket.id}</h3>
                      <a className="font-medium text-red-600">Cooking</a>
                    </div>
                    <ul className="text-gray-600 list-disc ml-6">
                      {ticket.order.menus.map( (menu, index) => {
                        return (<li key= {index} className="text-sm"> Menu {index+1} : {menu.name} <br/> Quatity : {menu.quatity}</li>)
                      })}
                    </ul>
                  </div>
                </li>
              )
              })
            }
          </ul>
          <div className="flex items-center justify-center w-full mt-8">
            <hr className="w-5/12 h-1 bg-gray-200 border-0 rounded dark:bg-gray-700"/>
            <div className="absolute flex items-center justify-center px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
              <h1 className="font-mono-medium text-lg text-gray-700 dark:text-gray-300">
                Finished
              </h1>
            </div>
          </div>
          <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-6">
            {finishTicketList &&
              finishTicketList.map((ticket, index) => {
              return (
                <li key= {ticket.id}>
                  <div className="px-4 py-5 sm:px-6 border-2 border-b-slate-300">
                    <div className="flex items-center justify-between">
                      <h3 className="ms-2 text-lg leading-6 font-medium text-gray-900">Ticket : {ticket.id}</h3>
                      <a className="font-medium text-blue-600 hover:text-blue-800" onClick={() => handleReceived(ticket.id)}>Received</a>
                    </div>
                    <ul className="text-gray-600 list-disc ml-6">
                      {ticket.order.menus.map( (menu, index) => {
                        return (<li key= {index} className="text-sm"> Menu {index+1} : {menu.name} <br/> Quatity : {menu.quatity}</li>)
                      })}
                    </ul>
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
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">There is no accept ticket</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Please wait for restaurant to accept the order.</p>
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
			{ticketPage(ticketList)}
		</main>
		
	)
}