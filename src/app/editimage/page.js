"use client"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signup } from "@/logic/user"
import { getUserId, getUserById, editUser } from "@/logic/user";
import Image from 'next/image'



export default function Home() {
  const router = useRouter();
  const [profile_url, setProfile] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const profile = sessionStorage.getItem("profile_url")
    console.log("profile: "+profile)
    const userId = getUserId(router)
    setUserId(userId)
    setProfile(profile)
  }, [])

	const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  

	const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

	const handleSubmit = (e) => {
		e.preventDefault()
    editUser(userId, formData).then(({err,result}) => {
      if (!err){
        router.push("/home")
      }
    })
  };
  const homePage = (formData) => {
	return (
		<main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      </div>
      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Profile now</p>
        <Image 
            src={profile_url} 
            unoptimized 
            width={500} 
            height={500}
            alt = "Previous Image"
        />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm changes
            </button>
          </div>
        </form>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> </p>

        <div>
            <a href="/home" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Cancel
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
		    </a>
        </div>

      </div>
		</main>
	)
    }
    return (
		<main className="min-h-screen flex-col justify-between">
			<Navbar showFull = {true} profile_url = {profile_url}/>
			{homePage(formData)}
		</main>
		
	)
};