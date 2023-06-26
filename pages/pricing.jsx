import { CheckCircle } from '@geist-ui/icons'

export default function () {
  return (
    <div className="mb-8 mt-16 flex w-full flex-col items-center text-center">
      <div className="mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-black sm:text-5xl">
          Simple, <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">affordable</span> pricing
        </h1>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Empower Your Space Booking. Simplify. Manage. BookSpace Self-Hosted. <br />
          Start for free, forever free.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 md:w-1/2">
        <div className="relative rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="p-5">
            <h3 className="my-3 text-center text-3xl font-bold">Self-Hosting (Free)</h3>
            <p className="text-gray-500">For institutions</p>
            <p className="my-5 text-6xl font-semibold">$0</p>
            <p className="text-gray-500">per month</p>
          </div>
          <div className="flex flex-col space-y-8 p-8">
            <div className="flex flex-row gap-x-3 text-gray-400">
              <CheckCircle className="h-6 w-6" />
              <span>Self-hosted deployment of BookSpace</span>
            </div>
            <div className="flex flex-row gap-x-3 text-gray-400">
              <CheckCircle className="h-6 w-6" />
              <span>Basic space booking functionalities</span>
            </div>
            <div className="flex flex-row gap-x-3 text-gray-400">
              <CheckCircle className="h-6 w-6" />
              <span>User management and authentication</span>
            </div>
            <div className="flex flex-row gap-x-3 text-gray-400">
              <CheckCircle className="h-6 w-6" />
              <span>Booking management and notifications</span>
            </div>
            <div className="flex flex-row gap-x-3 text-gray-400">
              <CheckCircle className="h-6 w-6" />
              <span>Basic reporting and analytics</span>
            </div>
          </div>
          <div className="border-t border-gray-200" />
          <div className="p-5">
            <a
              href="https://app.dub.sh/register"
              className="block w-full rounded-full border border-gray-200 bg-black py-2 font-medium text-white transition-all hover:border-black hover:bg-white hover:text-black"
            >
              Start Now &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
