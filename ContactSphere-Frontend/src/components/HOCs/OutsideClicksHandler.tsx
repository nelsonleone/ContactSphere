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
          [props.componentStateName]: false
        }))
      }
    }, [props.componentStateName, props.togglerRef])
    
    useEffect(() => {
      const clickHandler = (e: MouseEvent) => handleOutsideClick(e)
      const touchHandler = (e: TouchEvent) => handleOutsideClick(e)
      const mousemoveHandler = (e: MouseEvent) => handleOutsideClick(e)
    
      document.addEventListener('click', clickHandler)
      document.addEventListener('touchstart', touchHandler)
    
      return () => {
        document.removeEventListener('click', clickHandler)
        document.removeEventListener('touchstart', touchHandler)
      }
    }, [handleOutsideClick])
    

    return (
      <div ref={wrapperRef}>
        <Component {...props} />
      </div>
    )
  }
}