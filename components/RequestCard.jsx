import classNames from 'classnames'
import { capitalizeFirstLetter } from '@/lib/helper'
import { BadgeCheckIcon, BanIcon, ClockIcon } from '@heroicons/react/outline'

const colorStatus = {
  approved: 'text-teal-600 dark:text-gray-200',
  rejected: 'text-amber-600 dark:text-gray-200',
  pending: 'text-red-500 dark:text-gray-200',
}

export default function ({ dateBookedOn, eventDesc, dateBookedFor, startTime, endTime, spaceName, status, remarks, eventTitle, eventHashtags = {} }) {
  return (
    <div className="mt-5 flex w-full rounded border">
      <div className="flex-auto p-6 dark:text-gray-200">
        {dateBookedOn && (
          <div className="flex flex-row flex-wrap">
            <h1 className="flex-auto text-lg font-semibold text-slate-900 dark:text-white">#{dateBookedOn}</h1>
          </div>
        )}
        {status && (
          <div className="mt-3 flex w-[200px] flex-row items-center justify-start space-x-2 font-semibold">
            {status === 'approved' && <BadgeCheckIcon className={classNames('h-6 w-6', colorStatus[status])} />}
            {status === 'pending' && <ClockIcon className={classNames('h-6 w-6', colorStatus[status])} />}
            {status === 'rejected' && <BanIcon className={classNames('h-6 w-6', colorStatus[status])} />}
            <span className={classNames('font-bold', colorStatus[status])}>{capitalizeFirstLetter(status)}</span>
          </div>
        )}
        {dateBookedFor && (
          <div className="mt-3 flex flex-row flex-wrap items-center">
            <span className="text-md font-medium">Date requested For:</span>
            <span className="px-[2px]"></span>
            <span className="text-md">{dateBookedFor}</span>
          </div>
        )}
        {startTime && endTime && (
          <div className="mt-3 flex flex-row flex-wrap items-center">
            <span className="text-md font-medium">Time requested for:</span>
            <span className="px-[2px]"></span>
            <span className="text-md">
              {startTime.replace('_', ':')} - {endTime.replace('_', ':')}
            </span>
          </div>
        )}
        {spaceName && (
          <div className="mt-3 flex flex-row flex-wrap items-center">
            <span className="text-md font-medium">Space requested For:</span>
            <span className="px-[2px]"></span>
            <span className="text-md">{spaceName}</span>
          </div>
        )}
        {eventTitle && (
          <div className="mt-3 flex flex-row flex-wrap items-center">
            <span className="text-md font-medium">Event Title:</span>
            <span className="px-[2px]"></span>
            <span className="text-md">{eventTitle}</span>
          </div>
        )}
        {eventDesc && (
          <div className="mt-3 flex flex-row flex-wrap items-center">
            <span className="text-md font-medium">{eventTitle ? 'Event Description' : 'Reason:'}</span>
            <span className="px-[2px]"></span>
            <span className="text-md">{eventDesc}</span>
          </div>
        )}
        {eventHashtags && Object.keys(eventHashtags).length > 0 && Object.keys(eventHashtags).filter((i) => eventHashtags[i]).length > 0 && (
          <div className="mt-3 flex flex-row flex-wrap items-center">
            <span className="text-md font-medium">Event Hashtags:</span>
            <span className="px-[2px]"></span>
            {Object.keys(eventHashtags)
              .filter((i) => eventHashtags[i])
              .join(', ')}
          </div>
        )}
        {status && status !== 'pending' && remarks && remarks.length > 1 && (
          <div className="mt-6 flex flex-row flex-wrap items-center">
            <span className="text-md font-medium">Admin Remarks:</span>
            <span className="px-[2px]"></span>
            <span className="text-md">{remarks}</span>
          </div>
        )}
      </div>
    </div>
  )
}
