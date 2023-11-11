import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen flex-col justify-between">
      <Navbar />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ul className="rounded-lg bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
          <li>
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Restaurant 1</h3>
                {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Description for Item 1</p> */}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Status: <span className="text-green-600">Active</span></p>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
              </div>
            </div>
          </li>
					<li>
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Restaurant 2</h3>
                {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Description for Item 1</p> */}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Status: <span className="text-green-600">Active</span></p>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
