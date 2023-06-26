import SpaceCard from './Card'
import { useEffect, useState } from 'react'
import { Note, Spacer } from '@geist-ui/core'

export default function () {
  const [data, setData] = useState([])

  const getData = (scratch = false) => {
    fetch(`/api/spaces/handle`)
      .then((res) => res.json())
      .then((res) => {
        if (res.Spaces) {
          if (scratch) {
            setData(res.Spaces)
          } else {
            setData((data) => [...data, ...res.Spaces])
          }
        }
      })
      .catch(console.log)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {data.length > 0 ? (
        data.map((item) => {
          return <SpaceCard key={item?.createdAt} {...item} />
        })
      ) : (
        <Note label={false}>No Spaces to show.</Note>
      )}
      <Spacer h={2} />
    </>
  )
}
