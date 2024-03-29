import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Text, useToasts } from '@geist-ui/core'

export default function ({ setStartTime, setEndTime, globalTime, selectedDate, spaceName }) {
  const { setToast } = useToasts()
  const [slots, setSlots] = useState([])
  const { data: session } = useSession()

  const loadSlots = async () => {
    for (let i = 0; i < globalTime.length - 1; i++) {
      let startTime = globalTime[i].name.replace(':', '_')
      let endTime = globalTime[i + 1].name.replace(':', '_')
      fetch('/api/spaces/slot', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          endTime,
          startTime,
          spaceName,
          dateBookedFor: selectedDate,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          let newSlot = {}
          if (res.timeSlotObj && Object.keys(res.timeSlotObj).length > 0) {
            newSlot = { startTime, endTime, ...res.timeSlotObj, className: '' }
          } else {
            newSlot = { startTime, endTime, booked: false, ifTimeTable: false, className: '' }
          }
          let newDate = new Date()
          let sTime = new Date(`${selectedDate} ${startTime.replace('_', ':')}`)
          if (newDate < sTime) {
          } else {
            newSlot['old'] = true
          }
          setSlots((slots) => {
            const newArr = [...slots, newSlot]
            newArr.sort((a, b) => {
              var [hours1, minutes1] = a.startTime.split(':')
              var [hours2, minutes2] = b.startTime.split(':')
              // Compare hours
              if (parseInt(hours1, 10) > parseInt(hours2, 10)) {
                return 1
              } else if (parseInt(hours1, 10) < parseInt(hours2, 10)) {
                return -1
              }
              // Compare minutes if hours are equal
              if (parseInt(minutes1, 10) > parseInt(minutes2, 10)) {
                return 1
              } else if (parseInt(minutes1, 10) < parseInt(minutes2, 10)) {
                return -1
              }
              // The times are equal
              return 0
            })
            return newArr
          })
        })
        .catch((e) => {
          console.log(e)
          setToast({
            text: `Timeslot details for ${selectedDate} from ${startTime} to ${endTime} couldn't be fetched.`,
            type: 'error',
          })
        })
    }
  }

  useEffect(() => {
    if (!session) return
    setSlots([])
    loadSlots()
  }, [selectedDate])

  return (
    session && (
      <>
        <Text h4>Time Slots on {selectedDate}</Text>
        <div className="mt-5 flex flex-row flex-wrap gap-3">
          {slots.map((i, _ind) => (
            <div
              key={i.startTime}
              onClick={(e) => {
                // Don't do anything if this is an old slot
                if (i.old) {
                  setToast({
                    text: `That slot is not available for booking anymore.`,
                    type: 'error',
                  })
                  return
                }
                let newClass = i.className
                let temp = [...slots]
                if (newClass.includes('border')) {
                  newClass = ''
                } else {
                  newClass = 'border border-4 border-black'
                }
                temp.forEach((i) => {
                  i.className = ''
                })
                temp[_ind].className = newClass
                setSlots(temp)
                setStartTime(i.startTime.replace('_', ':'))
                setEndTime(i.endTime.replace('_', ':'))
              }}
              className={classNames(
                i.className,
                'w-[130px] rounded border px-3 py-2 text-center dark:border-0',
                { 'bg-black text-white': i.old },
                { 'bg-red-600 text-white': i.booked && !i.ifTimeTable && !i.old },
                { 'bg-yellow-600 text-white': i.booked && i.ifTimeTable && !i.old },
                { 'cursor-pointer bg-green-600 text-white': !i.booked && !i.old }
              )}
            >
              <span>{i.startTime.replace('_', ':')}</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{i.endTime.replace('_', ':')}</span>
            </div>
          ))}
        </div>
      </>
    )
  )
}
