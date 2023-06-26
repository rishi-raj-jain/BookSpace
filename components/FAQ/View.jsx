export default function () {
  return (
    <section id="faq" className="relative mt-8 overflow-hidden p-6 md:p-0 md:py-8">
      <div className="max-w-2xl lg:mx-0">
        <h2 id="faq-title" className="text-3xl text-black dark:text-white sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-lg text-black dark:text-white/50">
          If you can’t find what you’re looking for, email our <a href="mailto:rishi18304@iiitd.ac.in">support team</a> and if you’re lucky someone will get back to you.
        </p>
      </div>
      <div className="mt-16 grid max-w-2xl grid-cols-1 gap-8 text-black dark:text-white/75 lg:max-w-none lg:grid-cols-2">
        <div>
          <div className="flex flex-col gap-y-8">
            <div>
              <h3 className="text-lg dark:text-white">What is BookSpace?</h3>
              <p className="mt-4 text-sm">
                BookSpace is an open-source space booking platform designed to simplify the process of reserving and managing spaces in institutions. It provides a user-friendly
                interface for users to browse available spaces, book them according to their needs, and conveniently manage their reservations.
              </p>
            </div>
            <div>
              <h3 className="text-lg dark:text-white">Who can use BookSpace?</h3>
              <p className="mt-4 text-sm ">
                BookSpace is designed to cater to a wide range of users, including students, faculty, staff, organizations, and any individuals or groups in need of space
                reservations. It is suitable for educational institutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg dark:text-white">How does BookSpace simplify the booking process?</h3>
              <p className="mt-4 text-sm ">
                BookSpace simplifies the booking process by eliminating the need for manual paperwork or in-person interactions. Users can conveniently browse and choose from
                available spaces, book them with a few clicks, and manage their reservations from a single platform. This reduces administrative overhead and saves time for both
                users and institutions.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-y-8">
            <div>
              <h3 className="text-lg dark:text-white">Can BookSpace be customized for specific institutions?</h3>
              <p className="mt-4 text-sm ">
                Yes! BookSpace is an open-source platform, which means it can be customized and adapted to suit the unique requirements of different institutions. Institutions and
                developers can leverage the open-source nature of BookSpace to modify and enhance its functionality as per their specific needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg dark:text-white">Can BookSpace handle different types of spaces and venues?</h3>
              <p className="mt-4 text-sm ">
                Absolutely! BookSpace is flexible and can accommodate various types of spaces and venues, including classrooms, conference rooms, auditoriums, sports facilities,
                and more. It allows institutions to customize the available space options to align with their specific needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg dark:text-white">How does BookSpace handle conflicts or overlapping bookings?</h3>
              <p className="mt-4 text-sm ">
                BookSpace implements intelligent conflict resolution mechanisms to avoid overlapping bookings. If a space is already reserved for a specific time slot, it will not
                be available for subsequent bookings during that period. Users will be notified and prompted to select an alternative time slot or space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
