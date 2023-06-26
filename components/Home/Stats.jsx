import { useEffect, useState } from 'react'

const nFormatter = (num, digits) => {
  if (!num) return '0'
  if (num === '...') return num
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol : '0'
}

export default function () {
  const [counter, setCounter] = useState([
    {
      name: 'Bookings',
      value: '...',
    },
    {
      name: 'Active Spaces',
      value: '...',
    },
    {
      name: 'Events Hosted',
      value: '...',
    },
  ])
  const fetchStats = async () => {
    fetch('/api/requests/count')
      .then((res) => res.json())
      .then((res) => {
        setCounter((counter) => {
          counter[0].value = res.requests
          return [...counter]
        })
      })
    fetch('/api/spaces/handle')
      .then((res) => res.json())
      .then((res) => {
        setCounter((counter) => {
          counter[1].value = res.Spaces.length
          return [...counter]
        })
      })
    fetch('/api/events?scope=all')
      .then((res) => res.json())
      .then((res) => {
        setCounter((counter) => {
          counter[2].value = res.requests.length
          return [...counter]
        })
      })
  }
  useEffect(() => {
    fetchStats()
  }, [])
  return (
    <div className="mt-8 border-y  py-8 dark:border-white/25">
      <div className="grid gap-y-4 divide-x dark:divide-white/25 md:grid-cols-3 md:gap-y-0">
        {counter.map(({ name, value }) => (
          <div key={name} className="flex flex-col items-center justify-center space-y-2">
            <span className="text-4xl font-bold md:text-6xl">{nFormatter(value)}</span>
            <span className="font-semibold uppercase text-gray-500 md:text-lg">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
