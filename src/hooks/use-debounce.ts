import { useCallback, useRef } from "react";


export function useDebounce<
    T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number = 500) {
    const timeOutRef = useRef<NodeJS.Timeout>()

    return useCallback((...args: Parameters<T>) => {
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }

        timeOutRef.current = setTimeout(() => {
            callback(...args);
        }, delay)

    },
        [callback, delay]
    )
}