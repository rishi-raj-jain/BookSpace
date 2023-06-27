import Link from 'next/link'
import { Button } from '@geist-ui/core'
import { useRouter } from 'next/router'
import { Popover } from '@geist-ui/core'
import UserSettings from './UserSettings'
import Logo from '@/components/Shared/Logo'
import { useSession, signIn } from 'next-auth/react'

export default function () {
  const router = useRouter()
  const { pathname } = router
  const { data: session } = useSession()
  return (
    <div className="flex h-[56px] flex-row items-center justify-between border-b px-5 dark:border-white/25 md:px-0">
      <Link href="/">
        <Logo />
      </Link>
      {pathname !== '/' && pathname !== '/pricing' && pathname !== '/changelog' ? (
        <div className="hidden flex-row items-center space-x-5 md:flex">
          <Link className="text-black/50 hover:text-black dark:text-white/25 dark:hover:text-white" href="/faq">
            FAQs
          </Link>
          <Link className="text-black/50 hover:text-black dark:text-white/25 dark:hover:text-white" href="/events">
            Events
          </Link>
        </div>
      ) : (
        <div className="hidden flex-row items-center space-x-5 md:flex">
          <Link className="text-black/50 hover:text-black dark:text-white/25 dark:hover:text-white" href="/changelog">
            Changelog
          </Link>
          <Link className="text-black/50 hover:text-black dark:text-white/25 dark:hover:text-white" href="/pricing">
            Pricing
          </Link>
        </div>
      )}
      {session ? (
        <Popover placement="bottomEnd" content={<UserSettings />}>
          <button className="flex flex-row items-center gap-x-2 text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
            <span className="sr-only">{session.user.name}</span>
            <img src={session.user.image} className="h-8 w-8 rounded-full object-cover" />
          </button>
        </Popover>
      ) : (
        <Button type="secondary" auto onClick={signIn}>
          Sign In
        </Button>
      )}
    </div>
  )
}
