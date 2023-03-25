import { type MutableRefObject, useEffect } from 'react'

interface UseInfiniteScrollProps {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}

export function useInfiniteScroll ({
  callback,
  wrapperRef,
  triggerRef
}: UseInfiniteScrollProps) {
  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current
    if (!callback) return
    const options = {
      root: wrapperElement,
      rootMargin: '0px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
      }
    }, options)

    observer.observe(triggerElement)

    return () => {
      if (observer && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerRef.current)
      }
    }
  }, [callback, triggerRef, wrapperRef])
}
