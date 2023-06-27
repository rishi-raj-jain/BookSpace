export default function () {
  return (
    <div className="mt-16 flex w-full flex-col items-center">
      <h1 className="text-4xl font-extrabold text-black dark:text-white sm:text-5xl">Changelog</h1>
      <p className="mt-6 max-w-[250px] text-center text-black/50 dark:text-white/50 sm:max-w-full sm:text-lg">Follow the latest updates and improvements of BookSpace.</p>
      <div className="relative grid gap-8 py-8 sm:py-12 lg:grid-cols-4 lg:py-24">
        <div className="flex items-center justify-between lg:sticky lg:top-0 lg:-mt-24 lg:flex-col lg:items-start lg:self-start lg:pt-24">
          <div className="u-text-gray-900 inline-flex text-3xl font-light lg:mb-3">
            <span className="bg-primary-50 dark:bg-primary-400 text-primary-500 dark:text-primary-400 ring-primary-500 dark:ring-primary-400 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-opacity-10 dark:bg-opacity-10 dark:ring-opacity-20">
              Jun. 27, 2023
            </span>
          </div>
        </div>
        <div className="space-y-12 lg:col-span-3">
          <div className="prose-primary prose max-w-none dark:prose-invert">
            <h3 id="fixes-improvements" className="scroll-mt-[82px] lg:scroll-mt-[32px]">
              Announcing BookSpace
            </h3>
            <div className="flex flex-col">
              <span>
                BookSpace is designed to cater to a wide range of users, including students, faculty, staff, organizations, and any individuals or groups in need of space
                reservations. It is suitable for educational institutions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
