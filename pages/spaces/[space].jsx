import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button,  Table, Text } from '@geist-ui/core'
import TimeSlots from '@/components/Shared/TimeSlots'
import { AlertTriangle, CheckSquare } from '@geist-ui/icons'
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline'

// Hard-code the reminders list for now
const remindersList = [
  {
    id: 0,
    name: 'None',
    unavailable: false,
  },
  {
    id: 1,
    name: '5 minutes',
    unavailable: false,
  },
  {
    id: 2,
    name: '10 minutes',
    unavailable: false,
  },
  {
    id: 3,
    name: '15 minutes',
    unavailable: false,
  },
]

export default function ({ space }) {
  const { data: session } = useSession()
  // Define initial empty spaceData
  const [spaceData, setSpaceData] = useState({})
  // Hashtags in the form of value: false or true to determine if the hashtag is active
  const [hashtags, setHashtags] = useState({})
  // Global list of array defining all time slots
  const globalTime = Array.from(Array(24).keys())
    .map((i) => [
      { id: i * 2 + 1, name: `${i}:00`, unavailable: false },
      { id: i * 2 + 2, name: `${i}:30`, unavailable: false },
    ])
    .flat()
  // Take in the start time
  const [startTime, setStartTime] = useState(globalTime[0].name)
  // Take in the end time
  const [endTime, setEndTime] = useState(globalTime[1].name)
  // Take in the reminderDuration
  const [selectedReminder, setSelectedReminder] = useState(remindersList[0].name)
  // Take in the request booked for date
  const [requestDate, setRequestDate] = useState(new Date().toISOString().split('T')[0])
  // Initial event description set to empty
  const [textarea, setTextarea] = useState('')
  // Initial event title set to empty
  const [eventTitle, setEventTitle] = useState('')
  const [checked, setChecked] = useState(false)
  const [checked2, setChecked2] = useState(false)

  const handleChange = (event, change) => {
    if (change) setTextarea(event.target.value)
    else setEventTitle(event.target.value)
  }

  useEffect(() => {
    fetch(`/api/spaces/handle?spaceName=${space}`)
      .then((res) => res.json())
      .then((res) => {
        setSpaceData(res.Space)
      })
  }, [])
  const data = [
    { capacity: 'type', spaceType: 'Content type', type: 'secondary | warning', default: '-' },
    { property: 'Component', description: 'DOM element to use', type: 'string', default: '-' },
    { property: 'bold', description: 'Bold style', type: 'boolean', default: 'true' },
  ]
  return (
    session &&
    Object.keys(spaceData).length >= 1 && (
      <div className="flex flex-col space-y-4 p-6 md:px-0">
        <Button type={spaceData.ifDirect ? 'success' : 'error'} ghost={true} icon={spaceData.ifDirect ? <CheckSquare /> : <AlertTriangle />} className="!max-w-max" auto>
          {spaceData.ifDirect ? 'Can be directly booked' : 'Can not be directly booked'}
        </Button>
        {spaceData && spaceData.name && (
          <Text font={2} h1>
            {spaceData.name}
          </Text>
        )}
        <Table
          data={[
            {
              capacity: spaceData.capacity,
              spaceType: spaceData.spaceType,
            },
          ]}
        >
          <Table.Column prop="capacity" label="Capacity" />
          <Table.Column prop="spaceType" label="Space Type" />
        </Table>
        <Text h3>Book Your Space</Text>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            let requestObj = {
              dateBookedFor: requestDate, // year, month, date
              startTime: startTime.replace(':', '_'), // {id: 3, name: '02:00', unavailable: false}
              endTime: endTime.replace(':', '_'), // {id: 4, name: '03:00', unavailable: false}
              spaceName: spaceData.name, // from the server side space data
              ifEvent: checked2,
              ifBookmark: checked,
              reminderDuration: selectedReminder.name, // {id: 2, name: '10 minutes', unavailable: false}
              remarks: '',
              eventDesc: textarea,
              eventTitle: eventTitle,
              eventHashtags: Object.keys(hashtags)
                .filter((i) => hashtags[i])
                .reduce((dict, a) => {
                  dict[a] = true
                  return dict
                }, {}),
            }
            fetch('/api/requests/handle', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(requestObj),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res['code'] && res['code'] === 1) {
                  setTextarea('')
                  setChecked(false)
                  setHashtags({})
                  setChecked2(false)
                  setEndTime(globalTime[0])
                  setStartTime(globalTime[0])
                  setSelectedReminder(remindersList[0].name)
                  document.querySelector('#bookmark').checked = false
                  document.querySelector('#eventbooking').checked = false
                }
              })
          }}
          className="mt-3 rounded border p-5 md:p-10"
        >
          <div className="flex flex-col">
            <div className="flex flex-col space-y-5 md:flex-row md:flex-wrap md:gap-5 md:space-y-0">
              <div className="z-30 flex flex-row items-center space-x-3">
                <CalendarIcon className="h-6 w-6 dark:text-white" />
                <input
                  type="date"
                  name="requestDate"
                  value={requestDate}
                  className="rounded border p-2"
                  onChange={(e) => {
                    setRequestDate(e.target.value)
                  }}
                />
              </div>
              <div className="flex flex-row items-center space-x-3">
                <ClockIcon className="h-6 w-6 dark:text-white" />
                <div className="z-20 w-32">
                  <select
                    value={startTime}
                    onChange={(e) => {
                      let t = e.target.value
                      setStartTime(t)
                      setEndTime(globalTime[globalTime.find((i) => i.name === t).id % 48].name)
                    }}
                    className="rounded"
                  >
                    {globalTime.map((i, _ind) => (
                      <option key={_ind} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="dark:text-white">To</span>
                <div className="z-20 w-32">
                  <select
                    value={endTime}
                    onChange={(e) => {
                      let t = e.target.value
                      setEndTime(t)
                      let g = globalTime.find((i) => i.name === t).id - 2
                      setStartTime(globalTime[g >= 0 ? g % 48 : 48 + g].name)
                    }}
                    className="rounded"
                  >
                    {globalTime.map((i, _ind) => (
                      <option key={_ind} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-3">
                {!checked && <label className="text-sm font-bold text-gray-700 dark:text-white">Reminder</label>}
                {!checked && (
                  <div className="z-10 w-32">
                    <select className="rounded" value={selectedReminder.name} onChange={setSelectedReminder}>
                      {remindersList.map((i, _ind) => (
                        <option key={_ind} value={i.name}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 flex flex-col space-y-5 md:flex-row md:flex-wrap md:gap-5 md:space-y-0">
              <div className="flex flex-row items-center">
                <input name="ifBookmark" id="bookmark" type="checkbox" className="mr-2" value={checked} onClick={() => setChecked(!checked)} />
                <label className="dark:text-white" htmlFor="bookmark">
                  Create Bookmark
                </label>
              </div>
              {!checked && (
                <div className="flex flex-row items-center">
                  <input name="ifEvent" type="checkbox" className="mr-2" id="eventbooking" onClick={() => setChecked2(!checked2)} />
                  <label className="dark:text-white" htmlFor="eventbooking">
                    Make it an event booking
                  </label>
                </div>
              )}
            </div>
          </div>
          {!checked && checked2 && (
            <>
              <input
                name="eventTitle"
                value={eventTitle}
                onChange={(e) => {
                  handleChange(e, false)
                }}
                placeholder="Event Title"
                className="form-control relative mt-5 block w-full min-w-0 flex-auto rounded border border-gray-100 px-3 py-1.5 text-base font-normal text-gray-700 focus:outline-none"
              />
              <div className="mt-5 flex flex-row items-center">
                <input
                  name="hashtags"
                  id="hashtagNew"
                  placeholder="Create new hashtag"
                  className="form-control relative block w-full min-w-0 flex-auto rounded border border-gray-100 px-3 py-1.5 text-base font-normal text-gray-700 focus:outline-none"
                />
                <button
                  onClick={(e) => {
                    // Prevent submission
                    e.preventDefault()
                    // Add to the hashtag list
                    setHashtags({ ...hashtags, [document.getElementById('hashtagNew').value]: true })
                    document.getElementById('hashtagNew').value = ''
                  }}
                  className="ml-2 inline-flex w-12 items-center justify-center whitespace-nowrap rounded border border-transparent bg-sky-600 px-4 py-[5px] text-base text-white shadow-sm hover:bg-sky-700 dark:border-white"
                >
                  Add
                </button>
              </div>
              <div className="mt-5 flex flex-row flex-wrap">
                {Object.keys(hashtags).length > 0 &&
                  Object.keys(hashtags).map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setHashtags({ ...hashtags, [item]: !hashtags[item] })
                      }}
                      className={`cursor-pointer rounded border px-3 py-2 dark:border-0 ${hashtags[item] ? 'bg-black text-white' : 'text-gray'}`}
                    >{`#${item}`}</div>
                  ))}
              </div>
            </>
          )}
          {!checked && (
            <textarea
              name="description"
              value={textarea}
              onChange={(e) => {
                handleChange(e, true)
              }}
              placeholder={checked2 ? 'Event Description' : 'Description'}
              className="form-control relative mt-5 block w-full min-w-0 flex-auto rounded border border-gray-100 px-3 py-1.5 text-base font-normal text-gray-700 focus:outline-none"
            />
          )}
          <Button mt={2} type="secondary" htmlType="submit">
            Book &rarr;
          </Button>
        </form>
        <div className="mt-10"></div>
        <TimeSlots setStartTime={setStartTime} setEndTime={setEndTime} spaceName={space} selectedDate={requestDate} globalTime={globalTime} />
      </div>
    )
  )
}

export async function getServerSideProps({ params }) {
  const { space } = params
  return {
    props: {
      space,
    },
  }
}
