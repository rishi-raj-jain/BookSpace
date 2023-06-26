import Head from 'next/head'

export default function () {
  const META_TITLE = `BookSpace: Open-Source Space Booking Platform`
  const META_DESCRIPTION = 'Streamline your space booking process with BookSpace - the open-source platform for hassle-free reservations and efficient management.'
  const META_CANONICAL = 'https://bookspace.rishi.app'
  const META_FAVICON_IMAGE = `${META_CANONICAL}/logo.png`
  const META_OG_IMAGE = `${META_CANONICAL}/og.jpeg`
  return (
    <Head>
      {META_TITLE && <title>{META_TITLE}</title>}
      <meta property="og:locale" content="en_IN" />
      {META_CANONICAL && <link rel="canonical" href={META_CANONICAL} />}
      {META_FAVICON_IMAGE && <link rel="icon" href={META_FAVICON_IMAGE} />}
      {META_TITLE && <meta name="title" property="title" content={META_TITLE} />}
      {META_TITLE && <meta name="og:title" property="og:title" content={META_TITLE} />}
      {META_OG_IMAGE && <meta name="image" property="og:image" content={META_OG_IMAGE} />}
      {META_CANONICAL && <meta name="og:url" property="og:url" content={META_CANONICAL} />}
      {META_OG_IMAGE && <meta name="og:image" property="og:image" content={META_OG_IMAGE} />}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {META_TITLE && <meta name="twitter:title" property="twitter:title" content={META_TITLE} />}
      {META_CANONICAL && <meta name="twitter:url" property="twitter:url" content={META_CANONICAL} />}
      {META_OG_IMAGE && <meta name="twitter:image" property="twitter:image" content={META_OG_IMAGE} />}
      {META_DESCRIPTION && <meta name="description" property="description" content={META_DESCRIPTION} />}
      {META_DESCRIPTION && <meta name="og:description" property="og:description" content={META_DESCRIPTION} />}
      {META_DESCRIPTION && <meta name="twitter:description" property="twitter:description" content={META_DESCRIPTION} />}
    </Head>
  )
}
