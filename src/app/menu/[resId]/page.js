"use client"
import Navbar from "@/components/navbar"
import { getAllMenuByRestaurant } from "@/logic/menu";
import { getUserId } from "@/logic/user";
import { createOrder } from "@/logic/queue";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({params}) {
  const router = useRouter();
  const [menuList, setMenuList] = useState(null)
  const [orderList, setOrderList] = useState([])
  const [userId, setUserId] = useState(null)

  useEffect(() => {
	  const userId = getUserId(router)
    setUserId(userId)
    const resId = params.resId

    getAllMenuByRestaurant(resId).then(({err, result}) => {
			if(err){
				console.log("error")
				setMenuList(null)
			} else {
				// console.log(result)
				setMenuList(result.Menu)
			}
		})

  },[])

  const handleAddMenu = (menu) => {
    // console.log(menu)
    let isAdd = false;
    const newOrderList = orderList.map((order) => {
      if (order.id === menu.id){
        isAdd = true
        const {quatity, ...partialOrder} = order
        return {...partialOrder, quatity:quatity+1}
      }
      return order
    })
    if (!isAdd){
      newOrderList.push({...menu, quatity: 1})
    }
    setOrderList(newOrderList)
  }

  const handleRemoveOrder = (removeOrder) => {
    const newOrderList = orderList.map((order) => {
      if (order.id === removeOrder.id){
        const {quatity, ...partialOrder} = order
        if (quatity-1 === 0){
          return null
        }
        return {...partialOrder, quatity:quatity-1}
      }
      return order
    }).filter(Boolean);
    setOrderList(newOrderList)
  }

  const handleOrderMenu = (orderList) => {
    console.log(orderList)
    // order logic
    orderList = orderList.map((order) => {
      const {resId, ...orderField} = order;
      return orderField;
    })
    const resId = params.resId
    createOrder({userId,resId,menus:orderList}).then(({err, result}) => {
			if(err){
				console.log("error")
				// setMenuList(null)
			} else {
				alert("Menu was Ordered")
        // console.log(result)
        router.push("/home")
			}
		})
  }

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
                    <a className="pl-1 font-medium text-cyan-600 hover:text-red-800" onClick={() => handleAddMenu(menu)}>Add</a>
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


  const showorderList = (orderList) => {
    return (
      <>
      {
        orderList.map((order, index) => {
          return (
            <li key= {index}>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{order.name}</h3>
                  <p className="text-sm font-medium text-gray-500">Price: <span className="text-green-600">{order.price}</span></p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500 break-all">Quatity: <span className="text-green-600">{order.quatity}</span></p>
                  <a className="pl-1 font-medium text-red-600 hover:text-red-800" onClick={() => handleRemoveOrder(order)}>Remove</a>
                </div>
              </div>
            </li>
          )
        })
      }
      </>
    )
  }

  return (
    <main className="min-h-screen flex-col justify-between">
      <Navbar />
      <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-6">
        {showmenuList(menuList)}
      </ul>
      { orderList.length !== 0 && (
        <>
          <div className="flex items-center justify-center w-full mt-8">
            <hr className="w-5/12 h-1 bg-gray-200 border-0 rounded dark:bg-gray-700"/>
            <div className="absolute flex items-center justify-center px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
              <h1 className="font-mono-medium text-lg text-gray-700 dark:text-gray-300">
                Order
              </h1>
            </div>
          </div>
          <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-6">
            {showorderList(orderList)}
          </ul>
          <div className="flex justify-center">
            <button class="mt-3 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleOrderMenu(orderList)}>
              Order
            </button>
          </div>
        </>
      )}
    </main>
  );
}