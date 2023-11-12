"use client"
import Navbar from "@/components/navbar"
import { getAllMenuByRestaurant } from "@/logic/menu";
import { getUserId } from "@/logic/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({params}) {
  const router = useRouter();
  const [menuList, setMenuList] = useState(null)

  useEffect(() => {
	const userId = getUserId(router)
    const resId = {params}

    getAllMenuByRestaurant(resId).then(({err, result}) => {
			if(err){
				console.log("error")
				setMenuList(null)
			} else {
				console.log(result)
				setMenuList(result.Menu)
			}
		})

  },[])

  const showmenuList = (menuList) => {
    if (menuList){
      return (
        <>
        {
          menuList.map((menu, index) => {
            return (
              <li key= {menu.id}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{menu.name}</h3>
                    <p className="text-sm font-medium text-gray-500">Price: <span className="text-green-600">{menu.price}</span></p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 break-all">Description: <span className="text-green-600">{menu.description}</span></p>
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
            <h2 className="my-6 flex justify-center text-xl text-black font-bold">No Menu Item</h2>
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
          {showmenuList(menuList)}  
        </ul>
      </div>
    </main>
  );
}