import 'inter-ui/inter.css'
import '@/styles/globals.css'
import SEO from '@/components/SEO'
import { useRouter } from 'next/router'
import Menu from '@/components/Navigation/Menu'
import Footer from '@/components/Shared/Footer'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navigation/Navbar'
import { useCallback, useEffect, useState } from 'react'
import { PrefersContext, themes } from '@/lib/use-prefers'
import { GeistProvider, CssBaseline } from '@geist-ui/core'

export default function ({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const { pathname } = router
  const [themeType, setThemeType] = useState('light')
  useEffect(() => {
    document.documentElement.removeAttribute('style')
    document.body.removeAttribute('style')
    const theme = window.localStorage.getItem('theme')
    if (themes.includes(theme)) {
      document.documentElement.classList = theme
      setThemeType(theme)
    }
  }, [])
  const switchTheme = useCallback((theme) => {
    document.documentElement.classList = theme
    setThemeType(theme)
    if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem('theme', theme)
  }, [])
  return (
    <>
      <SEO />
      <SessionProvider session={session}>
        <GeistProvider themeType={themeType}>
          <CssBaseline />
          <PrefersContext.Provider value={{ themeType, switchTheme }}>
            {pathname.includes('/admin') && !pathname.includes('login') ? <Menu /> : <Navbar {...pageProps} />}
            <div className="flex min-h-[90vh] flex-col">
              <Component {...pageProps} />
            </div>
            <Footer />
          </PrefersContext.Provider>
        </GeistProvider>
      </SessionProvider>
    </>
  )
}
