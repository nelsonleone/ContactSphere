import { FC, useCallback, useEffect, useRef } from "react";
import { UsedHOC } from "../../vite-env";

export default function OutsideClicksHandler(Component: FC<UsedHOC>) {
  return function Handler(props: UsedHOC) {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleOutsideClick = useCallback((e: MouseEvent | TouchEvent | Event) => {
      if (
        wrapperRef.current && 
        !wrapperRef.current.contains(e.target as Node) &&
        !props.togglerRef.current!.contains(e.target as Node)
      ) {
         props.setState((prevState) => ({
            ...prevState,
            [props.componentStateName]: !prevState[props.componentStateName]
          }))          
      }
    }, [props.setState, props.componentStateName, props.togglerRef])

    useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick)
      document.addEventListener('mousemove', handleOutsideClick)

      return () => {
        document.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
        document.removeEventListener('mousemove', handleOutsideClick)
      }
    }, [handleOutsideClick])

    return (
      <div ref={wrapperRef}>
        <Component {...props} />
      </div>
    )
  }
}