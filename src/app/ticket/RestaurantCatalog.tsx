import Link from "next/link";
import React from "react";

// don't care error in this file because IDE can't detect Json key

export default async function RestaurantCatalog({restaurantJson}:{restaurantJson:Object}) {
    const restaurantJsonReady = await restaurantJson
    return (
        <>
        Explore {restaurantJsonReady.count} restaurant in our catalog
        <div className="m-10 flex flex-row flex-wrap justify-around items-around">
                                
            {restaurantJsonReady.data.map((restaurantItem:Object)=>(
                    <Link href={`/restaurant/${restaurantItem.id}`} 
                    className='w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                    p-2 sm:p-4 md:p-4 lg:p-8'>
                        test
                    </Link>
                ))}
            </div>
        </>
    )
    
}