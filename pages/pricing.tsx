import { Button } from '@geist-ui/core'
import { CheckCircle } from '@geist-ui/icons'

const pointers = [
  'One-time purchase',
  'All features mentioned above including authentication, bookings, and more',
  'Repository access for one user',
  'Free updates for 1 year',
  'Unlimited usage of code & unlimited projects (non-commercial)',
]

export default function () {
  return (
    <div className="mt-16 flex w-full flex-col items-center">
      <h1 className="text-4xl font-extrabold text-black dark:text-white sm:text-5xl">Pricing</h1>
      <p className="mt-6 max-w-[250px] text-center text-black/50 dark:text-white/50 sm:max-w-full sm:text-lg">
        Empower Your Space Booking. Simplify. Manage. BookSpace Self-Hosted.
      </p>
      <section className="mt-8 flex w-[250px] flex-col items-center rounded-lg border px-6 py-8 dark:border-white/25 sm:w-[350px] sm:px-8">
        <h3 className="text-lg">All Access</h3>
        <p className="mt-2 text-base">Perfect for institutions.</p>
        <span className="mt-4 text-6xl">$299</span>
        <a className="mt-6" href="https://www.buymeacoffee.com/rishi.raj.jain/e/146587">
          <Button type="secondary">Get access &rarr;</Button>
        </a>
        <div className="mt-12 flex flex-col gap-y-4 text-sm">
          {pointers.map((i) => (
            <div key={i} className="flex flex-row gap-x-3">
              <CheckCircle className="h-6 w-6" />
              <span className="w-full break-words text-left">{i}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
