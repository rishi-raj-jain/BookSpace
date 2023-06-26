import Link from 'next/link'
import Logo from '../Shared/Logo'
import { Button } from '@geist-ui/core'
import { useRouter } from 'next/router'
import { Popover } from '@geist-ui/core'
import UserSettings from './UserSettings'
import { useSession, signIn } from 'next-auth/react'

export default function () {
  const router = useRouter()
  const { pathname } = router
  const { data: session } = useSession()
  return (
    <div className="h-[56px] flex flex-row items-center justify-between border-b px-5 dark:border-white/25 md:px-0">
      <Link href="/">
        <Logo />
      </Link>
      {pathname !== '/' && (
        <div className="hidden flex-row items-center space-x-1 md:flex">
          <Link href="/">
            <Button className={'!m-0 !border-0'} auto={true} ghost={pathname === '/'} type={pathname === '/' ? 'secondary' : 'default'}>
              About
            </Button>
          </Link>
          <Link href="/faq">
            <Button className={'!m-0 !border-0'} auto={true} ghost={pathname === '/faq'} type={pathname === '/faq' ? 'secondary' : 'default'}>
              FAQs
            </Button>
          </Link>
          <Link href="/events">
            <Button className={'!m-0 !border-0'} auto={true} ghost={pathname === '/events'} type={pathname === '/events' ? 'secondary' : 'default'}>
              Events
            </Button>
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
