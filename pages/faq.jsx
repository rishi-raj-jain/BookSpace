import { useState, useEffect } from 'react'
import { Collapse, Loading, Note, Divider, Text } from '@geist-ui/core'

export default function () {
  const [faqs, setFaqs] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/faq/get')
      .then((res) => res.json())
      .then((res) => {
        setFaqs(res.FAQs)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
    return () => {
      setLoading(true)
    }
  }, [])
  return (
    <>
      <Text mt={1} mb={0.8} font={2} h1>
        Frequently Asked Questions
      </Text>
      <Divider />
      {loading ? (
        <div className="mt-8 rounded border py-3">
          <Loading>Loading</Loading>
        </div>
      ) : faqs?.length > 0 ? (
        <Collapse.Group margin={0} padding={0} accordion={false}>
          {faqs.map((i, _) => (
            <Collapse className="!border-0" key={_} initialVisible={true} title={i.q}>
              <Text>{i.a}</Text>
            </Collapse>
          ))}
        </Collapse.Group>
      ) : (
        <Note w="100%" mt={2} label={false}>
          You are all caught up!
        </Note>
      )}
    </>
  )
}
