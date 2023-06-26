import Link from 'next/link'
import Logo from '@/components/Shared/Logo'
import { useSession } from 'next-auth/react'
import { usePrefers } from '@/lib/use-prefers'
import Submenu from '@/components/Navigation/SubMenu'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import UserSettings from '@/components/Navigation/UserSettings'
import { Avatar, Button, useTheme, Popover } from '@geist-ui/core'

export default function () {
  const theme = useTheme()
  const prefers = usePrefers()
  const { data: session } = useSession()
  return (
    <>
      <nav className="menu-nav flex h-[56px] flex-row items-center justify-between border-b dark:border-white/25">
        <Link href="/admin/requests">
          <Logo />
        </Link>
        <div>
          <Button auto type="abort" className="theme-button" aria-label="Toggle Dark mode" onClick={() => prefers.switchTheme(theme.type === 'dark' ? 'light' : 'dark')}>
            {theme.type === 'dark' ? <SunIcon height={16} width={16} /> : <MoonIcon height={16} width={16} />}
          </Button>
          <Popover content={<UserSettings />} placement="bottomEnd">
            <button>{session && <Avatar src={session.user.image} />}</button>
          </Popover>
        </div>
      </nav>
      <Submenu />
      <style jsx>{`
        .menu-nav__title {
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
          letter-spacing: 0;
        }
        .menu-nav > div {
          display: flex;
          align-items: center;
        }
        .menu-nav :global(.theme-button) {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          padding: 0;
          margin: 0 ${theme.layout.gapHalf};
        }
      `}</style>
    </>
  )
}
