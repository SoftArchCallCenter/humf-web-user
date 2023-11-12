"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/logic/user"

export default function Home() {
  const router = useRouter();

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
    signup(formData).then(({err,result}) => {
      if (!err){
        router.push("/")
      }
    })
  };

	return (
		<main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      </div>
      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>							
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-sky-200">
							Username
            </label>
            <div className="my-2">
              <input
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="username"
                name="username"
                type="text"
								value={formData.username}
								onChange={handleInputChange}
                required
              />
            </div>
            {formData.username === '' && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>)}
          </div>

          <div>							
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-sky-200">
							Email
            </label>
            <div className="my-2">
              <input
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="email"
                name="email"
                type="email"
								value={formData.email}
								onChange={handleInputChange}
                required
              />
            </div>
            {formData.email === '' && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>)}
          </div>

          <div>							
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-sky-200">
							Password
            </label>
            <div className="my-2">
              <input
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="password"
                name="password"
                type="password"
								value={formData.password}
								onChange={handleInputChange}
                required
              />
            </div>
            {formData.password === '' && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>)}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account ?{' '}
          <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>
		</main>
	)
};