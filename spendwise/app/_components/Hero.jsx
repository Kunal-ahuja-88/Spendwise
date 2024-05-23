import React from 'react'
import Image from 'next/image'
function Hero() {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Enhance your budgeting
        <strong className="font-extrabold text-primary sm:block">Empower your wallet. </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      "Transform the way you spend, track, and thrive."
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/sign-in"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
  <Image src='/dashboardImage.png' alt='dashboard'
  width={1000}
  height={700}
  className='mt-5 rounded-xl border-2'
   />

</section>
  )
}

export default Hero