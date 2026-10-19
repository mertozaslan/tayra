import { useEffect, useRef, useState } from 'react'

// Yüklenene kadar koyu bir iskelet gösteren, yüklenince yumuşakça beliren görsel
export default function Img({ className = '', ...props }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Önceden çizilmiş (prerender) sayfada görsel React bağlanmadan yüklenmiş olabilir
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      decoding="async"
      {...props}
      className={`img-fade ${className}`.trim()}
      data-loaded={loaded ? '' : undefined}
      onLoad={() => setLoaded(true)}
    />
  )
}
