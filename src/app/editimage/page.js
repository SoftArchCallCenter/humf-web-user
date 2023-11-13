"use client"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signup } from "@/logic/user"
import { getUserId, uploadImage } from "@/logic/user";
import Image from 'next/image'



export default function Home() {
  const router = useRouter();
  const [profile_url, setProfile] = useState(null)
  const [userId, setUserId] = useState(null)
  const [selectedFile, setSelectedFile] = useState();
  const [checkFile, setCheckFile] = useState(false);

  useEffect(() => {
    const profile = sessionStorage.getItem("profile_url")
    console.log("profile: "+profile)
    const userId = getUserId(router)
    setUserId(userId)
    setProfile(profile)
  }, [])
  const [imgData, setImgData] = useState(null)

    const imageHandler = (e) => {
      setSelectedFile(e.target.files[0]);
      // setCheckFile(true);
      if(e.target.files[0]){
        setCheckFile(true);
      } else{
        setCheckFile(false);
      }
    } 

    const imagesubmission = () => {
      if (checkFile) {
          alert("File Uploaded");
          console.log(selectedFile);
      } else {
          // setCheckFile(true);
          alert("select a file");
      }
    }

  const homePage = (imgData) => {
	return (
		<main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      </div>
      <>
            {/* <div className="h-screen bg-gray-700 flex justify-center items-center px-2"> */}
                <div className="w-[320px] grid gap-2 mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="h-24 cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-blue-700">
                        <input type="file" name="file" onChange={imageHandler} className="z-20 opacity-0 cursor-pointer h-full w-full" />
                        <div className="absolute flex justify-center items-center gap-2">
                            <img className={`h-10 w-10 rounded-full ${checkFile?'opacity-1':'opacity-0'}`} src={selectedFile ? URL.createObjectURL(selectedFile) : null} />
                            <span className="text-[18px] w-56 truncate">{checkFile?selectedFile.name:'Choose a file'}</span>
                        </div>        
                    </div>
                    <button onClick={imagesubmission} className="w-full h-14 bg-green-600 text-white rounded-md">Upload</button>
                </div>
            {/* </div> */}
      </>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
			{homePage(imgData)}
		</main>
		
	)
};