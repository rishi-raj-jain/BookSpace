import Link from 'next/link'
import { Search } from '@geist-ui/icons'
import { useEffect, useState } from 'react'
import { Button, Input, Text, useToasts, Select, Textarea } from '@geist-ui/core'

export default function () {
  const { setToast } = useToasts()
  const [space, setSpace] = useState([])
  const [spaces, setSpaces] = useState([])
  const [search, setSearch] = useState('')
  const [contexts, setContexts] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    fetch('/api/spaces/handle')
      .then((res) => res.json())
      .then((res) => {
        setSpace(res['Spaces'])
        setSpaces(res['Spaces'])
      })
      .catch(console.log)
    fetch('/api/context/get')
      .then((res) => res.json())
      .then((res) => {
        setContexts(
          res['Contexts']
            .filter((i) => i.name)
            .map((i) => ({
              name: i.name,
            }))
        )
      })
      .catch(console.log)
    fetch('/api/department/get')
      .then((res) => res.json())
      .then((res) => {
        setDepartments(
          res['Departments']
            .filter((i) => i.name)
            .map((i) => ({
              name: i.name,
            }))
        )
      })
      .catch(console.log)
  }, [])

  const changeSpaces = (e) => {
    setSearch(e.target.value)
    if (e.target.value.length > 0) {
      let temp = spaces.filter((i) => i.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setSpace(temp)
      if (temp.length < 1) {
        setToast({
          type: 'warning',
          text: 'No spaces found matching that input. Try searching again.',
        })
      }
    } else setSpace(spaces)
  }

  const submitFeedback = (e) => {
    if (!submitting) {
      setSubmitting(true)
      if (window['context'] && window['department'] && window['feedback']) {
        fetch('/api/feedback/set', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            context: window['context'],
            department: window['department'],
            feedback: window['feedback'],
          }),
        })
          .then((res) => res.json())
          .then(() => {
            setSubmitting(false)
            setToast({
              type: 'success',
              text: 'Your feedback has been received.',
            })
          })
          .catch((e) => {
            console.log(e)
            setToast({
              type: 'error',
              text: 'Oops! Facing an error while recording feedback.',
            })
            setSubmitting(false)
          })
      } else {
        setToast({
          type: 'warning',
          text: 'Please enter your feedback while addressing each field.',
        })
        setSubmitting(false)
      }
    } else {
      setToast({
        type: 'warning',
        text: 'Your feedback can not be processed as a the browser is busy submitting the previous one.',
      })
    }
  }

  return (
    <>
      <h1 className="mt-12 w-full bg-gradient-to-br from-black via-gray-600 to-black bg-clip-text text-center leading-[3.2rem] text-transparent dark:from-white dark:via-gray-600 dark:text-white">
        Welcome To BookSpace
      </h1>
      <h3 className="mt-4 w-full text-center text-xl font-light md:text-2xl">Booking spaces was never this easy. Let's start by choosing a space.</h3>
      <Input className="lg-0 px-6" mt={1} scale={1.5} icon={<Search />} value={search} onChange={changeSpaces} placeholder="Search By Space Name" w="100%" />
      {space && space.length > 0 && (
        <div className="lg-0 mt-8 flex space-x-4 overflow-x-scroll px-6">
          {space.map((i) => (
            <div key={i.createdAt} className="flex min-w-min flex-col space-y-4 rounded border px-8 py-4 hover:border-black dark:border-white/25 dark:hover:border-white/50">
              {i && i.name && <span className="text-3xl font-semibold">{i.name}</span>}
              {i && i.spaceType && <span className="text-md text-gray-600 dark:text-gray-200">{`Space Type: ${i.spaceType}`}</span>}
              {i && i.capacity && <span className="text-md text-gray-600 dark:text-gray-200">{`Capacity: ${i.capacity}`}</span>}
              <Link className="mt-auto" href={`/spaces/${i.name}`}>
                <Button auto>Book &rarr;</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
      {contexts.length > 0 && departments.length > 0 && (
        <Text className="px-6 md:p-0" mt={4} h3>
          Your Feedback Is Valuable
        </Text>
      )}
      {contexts.length > 0 && departments.length > 0 && (
        <form
          id="feedbackForm"
          className="flex flex-col px-6 md:p-0"
          onSubmit={(e) => {
            e.preventDefault()
            submitFeedback()
          }}
        >
          <div className="flex flex-row flex-wrap gap-3">
            <Select
              placeholder="Choose Context"
              onChange={(val) => {
                window['context'] = val
              }}
            >
              {contexts.map((i) => (
                <Select.Option key={i.name} value={i.name}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="Choose Department"
              onChange={(val) => {
                window['department'] = val
              }}
            >
              {departments.map((i) => (
                <Select.Option key={i.name} value={i.name}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <Textarea
            mt={1}
            width="100%"
            name="feedback"
            placeholder="Your feeback"
            onChange={(e) => {
              window['feedback'] = e.target.value
            }}
          />
          <Button className="max-w-max" type="secondary" mt={1} htmlType="submit">
            Submit
          </Button>
        </form>
      )}
    </>
  )
}
