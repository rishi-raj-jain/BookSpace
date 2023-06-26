import { Button } from '@geist-ui/core'
import { Github } from '@geist-ui/icons'

export default function () {
  return (
    <div className="border-t p-6 dark:border-white/25 md:p-0">
      <div className="mx-auto max-w-md pt-8 text-center sm:max-w-xl">
        <h2 className="text-3xl text-black dark:text-white sm:text-4xl">Proudly Open Source</h2>
        <p className="mt-6 text-black dark:text-white/75 sm:text-lg">Our source code is available on GitHub - feel free to read, review, or contribute to it however you want!</p>
      </div>
      <div className="mt-6 flex items-center justify-center">
        <a href="https://github.com/rishi-raj-jain/BookSpace" target="_blank">
          <Button auto icon={<Github className="h-4 w-4 fill-none stroke-black dark:stroke-white" />}>
            View Source
          </Button>
        </a>
      </div>
    </div>
  )
}
