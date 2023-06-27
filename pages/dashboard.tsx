import { sortItems } from '@/lib/helper'
import { useState, useEffect } from 'react'
import RequestCard from '@/components/RequestCard'
import SortComponent from '@/components/Shared/SortComponent'
import { Checkbox, Note, Spacer, Tabs, Text, Divider } from '@geist-ui/core'

export default function () {
  const [sortType, setSortType] = useState(1)
  const [requests, setRequests] = useState([])
  const [showRequests, setShowRequests] = useState([])
  const [requestsList, setRequestsList] = useState([])
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedHashtags, setSelectedHashtags] = useState({})

  useEffect(() => {
    fetch(`/api/requests/user`)
      .then((res) => res.json())
      .then((res) => {
        if (res['requests']) setRequestsList(res.requests)
      })
  }, [])

  // In case events or sortingType changes
  useEffect(() => {
    sortItems(requests, selectedHashtags, sortType, selectedStatus, setShowRequests)
  }, [requests, sortType, selectedHashtags, selectedStatus])

  useEffect(() => {
    if (requestsList.length > 0) {
      setRequests([])
      requestsList.forEach((i) => {
        fetch(`/api/requests/handle?requestID=${i}`)
          .then((res) => res.json())
          .then((res) => {
            if (res && res['requestObj']) {
              setRequests((requests) => [res['requestObj'], ...requests])
            }
          })
      })
    }
  }, [requestsList])

  const getAllHashtags = () => {
    return Object.keys(
      requests
        .filter((i) => i.ifEvent)
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
        Dashboard
      </Text>
      <Divider />
      <Tabs initialValue="1">
        <Tabs.Item label="My Bookings" value="1">
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {showRequests.filter((i) => !i.ifEvent).length > 0 ? (
              showRequests.filter((i) => !i.ifEvent).map((i) => <RequestCard key={`${i.dateBookedOn}_${i.status}`} {...i} />)
            ) : (
              <Note mt={2} label={false}>
                No requests to show.
              </Note>
            )}
          </div>
        </Tabs.Item>
        <Tabs.Item label="My Event Bookings" value="2">
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
          {requests.filter((i) => i.ifEvent).length > 0 && (
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
          )}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {showRequests && showRequests.filter((i) => i.ifEvent).length > 0 ? (
              showRequests.filter((i) => i.ifEvent).map((i) => <RequestCard key={`${i.dateBookedOn}_${i.status}`} {...i} />)
            ) : (
              <Note mt={2} label={false}>
                No event requests to show.
              </Note>
            )}
          </div>
          <Spacer />
          <Spacer h={1} />
        </Tabs.Item>
      </Tabs>
    </>
  )
}
