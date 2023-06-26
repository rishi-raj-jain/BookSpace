import classNames from 'classnames'
import { useToasts } from '@geist-ui/core'
import { useEffect, useState } from 'react'

export default function ({ setStartTime, setEndTime, globalTime, selectedDate, spaceName }) {
  const { setToast } = useToasts()
  const [slots, setSlots] = useState([])

  useEffect(async () => {
    setSlots([])
    for (let i = 0; i < globalTime.length - 1; i++) {
      let startTime = globalTime[i].name.replace(':', '_')
      let endTime = globalTime[i + 1].name.replace(':', '_')
      let resp = await fetch('/api/spaces/handle/slot', {
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
      if (!resp.ok) {
        setToast({
          text: `Timeslot details for ${selectedDate} from ${startTime} to ${endTime} couldn't be fetched.`,
          type: 'error',
        })
      } else {
        let data = await resp.json()
        let newSlot = {}
        if (data.timeSlotObj && Object.keys(data.timeSlotObj).length > 0) {
          newSlot = { startTime, endTime, ...data.timeSlotObj, className: '' }
        } else {
          newSlot = { startTime, endTime, booked: false, ifTimeTable: false, className: '' }
        }
        let newDate = new Date()
        let sTime = new Date(`${selectedDate} ${startTime.replace('_', ':')}`)
        if (newDate < sTime) {
        } else {
          newSlot['old'] = true
        }
        setSlots((slots) => [...slots, newSlot])
      }
    }
  }, [selectedDate])

  return (
    <>
      <h1 className="text-3xl font-bold dark:text-gray-200">
        Time Slots on{' '}
        <span className="bg-gradient-to-r from-gray-600 via-sky-400 to-sky-600 bg-clip-text text-3xl font-extrabold text-transparent dark:text-white">{selectedDate}</span>
      </h1>
      <span className="h-[10px] w-[10px] bg-green-600"></span>
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
}