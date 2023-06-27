import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Tabs, useTheme } from '@geist-ui/core'

export default function () {
  const theme = useTheme()
  const router = useRouter()
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const scrollHandler = () => setSticky(document.documentElement.scrollTop > 54)
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [setSticky])

  return (
    <>
      <nav className="relative w-full overflow-x-hidden">
        <div className={`submenu ${sticky ? 'submenu_sticky' : ''}`}>
          <div className="h-[46px] overflow-y-hidden">
            <Tabs value={router.asPath} onChange={(route) => router.push(route)}>
              <Tabs.Item label="Requests" value="/admin/requests" />
              <Tabs.Item label="Slots" value="/admin/slots" />
              <Tabs.Item label="Feedbacks" value="/admin/feedbacks" />
              <Tabs.Item label="FAQs" value="/admin/faqs" />
              <Tabs.Item label="Contexts" value="/admin/contexts" />
              <Tabs.Item label="Departments" value="/admin/departments" />
              <Tabs.Item label="Spaces" value="/admin/spaces" />
              <Tabs.Item label="Settings" value="/admin/more" />
            </Tabs>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .submenu_sticky {
          transition: box-shadow 0.2s ease;
        }
        .submenu_sticky {
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          position: fixed;
          background: ${theme.palette.background};
          box-shadow: ${theme.type === 'dark' ? `inset 0 -1px ${theme.palette.border}` : 'rgba(0, 0, 0, 0.1) 0 0 15px 0'};
        }
        .submenu__inner::-webkit-scrollbar {
          display: none;
        }
        .submenu__inner :global(.content) {
          display: none;
        }
        .submenu__inner :global(.tabs),
        .submenu__inner :global(header) {
          height: 100%;
          border: none;
        }
        .submenu__inner :global(.tab) {
          padding-top: 0;
          padding-bottom: 0;
          font-size: 0.875rem;
          height: calc(100% - 2px);
          color: ${theme.palette.accents_5};
        }
        .submenu__inner :global(.tab):hover {
          color: ${theme.palette.foreground};
        }
        .submenu__inner :global(.active) {
          color: ${theme.palette.foreground};
        }
      `}</style>
    </>
  )
}
