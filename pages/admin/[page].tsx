import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Divider, Text } from '@geist-ui/core'

export default function () {
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/verify')
      .then((res) => res.json())
      .then((res) => {
        if (res && res.code && res.code === 1) {
        } else {
          router.replace('/admin/login')
        }
      })
      .catch((e) => {
        console.log(e)
        router.replace('/admin/login')
      })
  }, [])

  const view = () => {
    switch (router.query.page) {
      case 'requests': {
        const Component = dynamic(() => import('@/components/Requests/Dashboard'))
        return <Component />
      }
      case 'feedbacks': {
        const Component = dynamic(() => import('@/components/Feedback/Dashboard'))
        return <Component />
      }
      case 'faqs': {
        const Component = dynamic(() => import('@/components/FAQ/Dashboard'))
        return <Component />
      }
      case 'contexts': {
        const Component = dynamic(() => import('@/components/Context/Dashboard'))
        return <Component />
      }
      case 'spaces': {
        const Component = dynamic(() => import('@/components/Space/Dashboard'))
        return <Component />
      }
      case 'departments': {
        const Component = dynamic(() => import('@/components/Department/Dashboard'))
        return <Component />
      }
      case 'slots': {
        const Component = dynamic(() => import('@/components/Slots/Dashboard'))
        return <Component />
      }
      case 'more': {
        const Component = dynamic(() => import('@/components/More/Dashboard'))
        return <Component />
      }
    }
  }

  const title = () => {
    return {
      faqs: 'All FAQs',
      slots: 'Time Slots',
      more: 'Admin Users',
      spaces: 'All Spaces',
      contexts: 'All Contexts',
      feedbacks: 'All Feedbacks',
      requests: 'Student Requests',
      departments: 'All Departments',
    }[router.query?.page?.toString()]
  }

  return (
    <>
      <Text mt={1.3} h3>
        {title()}
      </Text>
      <Divider />
      {view()}
    </>
  )
}
