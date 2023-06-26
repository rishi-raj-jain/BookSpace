import { sortItems } from '@/lib/helper'
import RequestCard from '@/components/RequestCard'
import { Fragment, useEffect, useState } from 'react'
import SortComponent from '@/components/Shared/SortComponent'
import { Note, Text, Loading, Checkbox, Divider } from '@geist-ui/core'

export default function () {
  const [events, setEvents] = useState([])
  const [sortType, setSortType] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showEvents, setShowEvents] = useState([])
  const [requestsList, setRequestsList] = useState([])
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedHashtags, setSelectedHashtags] = useState({})

  // As soon as it mounts
  useEffect(() => {
    fetch(`/api/events?scope=all`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if (res['requests']) {
          setRequestsList(res.requests)
        }
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
    return () => {
      setLoading(true)
    }
  }, [])

  // In case events or sortingType changes
  useEffect(() => {
    sortItems(events, selectedHashtags, sortType, selectedStatus, setShowEvents)
  }, [events, sortType, selectedHashtags, selectedStatus])

  useEffect(() => {
    if (requestsList.length > 0) {
      setEvents([])
      setLoading(true)
      // Fetch each request object from the list of requests
      requestsList.forEach((i) => {
        fetch(`/api/requests/handle?requestID=${i}`)
          .then((res) => res.json())
          .then((res) => {
            setLoading(false)
            if (res && res['requestObj']) {
              // Only add in case it's an event and it's approved
              if (res['requestObj']['ifEvent'] && res['requestObj']['status'] === 'approved') {
                setEvents((events) => [res['requestObj'], ...events])
              }
            }
          })
      })
    }
  }, [requestsList])

  const getAllHashtags = () => {
    return Object.keys(
      events
        .map((i) => i.eventHashtags)
        .reduce((dict, a) => {
          let tempHashes = Object.keys(a)
          for (let i in tempHashes) {
            if (a[tempHashes[i]]) {
              dict[tempHashes[i]] = true
            }
          }
          return dict
        }, {})
    )
  }

  const getSelectedValues = () => {
    return getAllHashtags().filter((i) => selectedHashtags[i])
  }

  return (
    <>
      <Text mt={1} mb={0.8} font={2} h1>
        Events
      </Text>
      <Divider />
      <Text mt={1} h3>
        Sort By
      </Text>
      <SortComponent
        setSortType={setSortType}
        selectedValue={selectedValue}
        selectedStatus={selectedStatus}
        setSelectedValue={setSelectedValue}
        setSelectedStatus={setSelectedStatus}
      />
      <Text mt={2} h3>
        Filter By Hashtags
      </Text>
      {loading ? (
        <div className="mt-8 rounded border py-3">
          <Loading>Loading</Loading>
        </div>
      ) : (
        events.length > 0 && (
          <Checkbox.Group
            value={getSelectedValues()}
            onChange={(val) => {
              setSelectedHashtags({})
              if (val?.length > 0) {
                let tmpSelected = {}
                val.forEach((i) => {
                  tmpSelected = { ...tmpSelected, [i]: true }
                })
                setSelectedHashtags(tmpSelected)
              }
            }}
          >
            {getAllHashtags().map((i) => (
              <Checkbox key={i} value={i}>
                {i}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )
      )}
      {loading ? (
        <div className="mt-8 rounded border py-3">
          <Loading>Loading</Loading>
        </div>
      ) : showEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {showEvents.map((i) => (
            <Fragment key={`${i.dateBookedOn}_${i.status}`}>
              <RequestCard {...i} />
            </Fragment>
          ))}
        </div>
      ) : (
        <Note label={false}>No events to show.</Note>
      )}
    </>
  )
}
