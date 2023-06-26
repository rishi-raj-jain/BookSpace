import Logo from './Logo'
import Link from 'next/link'
import { Github, Linkedin, Twitter } from '@geist-ui/icons'

const navigation = {
  product: [{ name: 'Pricing', href: '/pricing' }],
  company: [{ name: 'Changelog', href: '/changelog' }],
  resources: [{ name: 'FAQ', href: '/#faq' }],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
}

export default function () {
  return (
    <footer className="z-10 mt-8 border-t px-5 pt-8 dark:border-white/25 md:px-0">
      <div className="xl:grid xl:grid-cols-5 xl:gap-8">
        <div className="space-y-8 xl:col-span-2">
          <Link href={'/'}>
            <Logo />
          </Link>
          <p className="max-w-xs text-sm text-gray-500">Unlock the Power of Automated Bookings and Liberate Your Institution from Manual Booking Woes with BookSpace.</p>
          <div className="flex items-center space-x-2">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/rishi_raj_jain_"
              className="rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/10 dark:active:bg-white/25"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5 fill-blue-400 stroke-none" />
            </a>
            <div className="h-8 border-l border-gray-200 dark:border-gray-800" />
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/rishi-raj-jain/BookSpace"
              className="rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/10 dark:active:bg-white/25"
            >
              <span className="sr-only">Github</span>
              <Github className="h-5 w-5 fill-black stroke-none dark:stroke-gray-400" />
            </a>
            <div className="h-8 border-l border-gray-200 dark:border-gray-800" />
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/rishi-raj-jain/"
              className="rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/10 dark:active:bg-white/25"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5 fill-blue-600 stroke-none" />
            </a>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold">Product</h3>
              <div className="mt-4 flex flex-col space-y-4">
                {navigation.product.map((item) => (
                  <Link key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold">Tools</h3>
              <div className="mt-4 flex flex-col space-y-4">
                {navigation.company.map((item) => (
                  <Link key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <div className="mt-4 flex flex-col space-y-4">
                {navigation.resources.map((item) => (
                  <Link key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold">Legal</h3>
              <div className="mt-4 flex flex-col space-y-4">
                {navigation.legal.map((item) => (
                  <Link key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t dark:border-white/25">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} BookSpace</p>
      </div>
    </footer>
  )
}
