const { useEffect, useRef } = React

export default function useNdsView() {
  const ref = useRef(null)
  useEffect(() => {
    const poll = setInterval(() => {
      if (!window.NDS) return
      clearInterval(poll)
      NDS.Init.refresh(ref.current)
    }, 50)
  }, [])
  return ref
}
