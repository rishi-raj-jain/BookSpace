import { CalendarIcon, OfficeBuildingIcon } from '@heroicons/react/solid'

export const status = (bookings, spaceLength) => [
  {
    icon: CalendarIcon,
    d: 'BOOKINGS DONE',
    n: `${bookings}+`,
  },
  {
    icon: OfficeBuildingIcon,
    d: 'SPACES COVERED',
    n: `${spaceLength}+`,
  },
]
