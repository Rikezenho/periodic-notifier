import { useState, useEffect, useCallback } from 'react'

type useTimerType = {
    minutes: number
    onFinishCountdown: Function
}

const minutesToSeconds = (minutes: number): number => minutes * 60

const useTimer = ({ minutes, onFinishCountdown }: useTimerType) => {
    const [seconds, setSeconds] = useState(minutesToSeconds(minutes) || 0)
    const [hasBeenStarted, setHasBeenStarted] = useState(false)
    const [timerId, setTimerId] = useState(null)

    const startCountdown = useCallback(() => {
        setHasBeenStarted(true)
        setSeconds(minutesToSeconds(minutes))
        setTimerId(
            setInterval(() => {
                setSeconds((seconds) => seconds - 1)
            }, 1000)
        )
    }, [])

    const stopCountdown = useCallback(() => {
        setHasBeenStarted(false)
        clearInterval(timerId)
        setTimerId(null)
    }, [])

    useEffect(() => {
        if (hasBeenStarted && seconds === 0) {
            onFinishCountdown()
            setSeconds(minutesToSeconds(minutes))
        }
    }, [seconds])

    useEffect(() => {
        setSeconds(minutesToSeconds(minutes))
    }, [minutes])

    return {
        startCountdown,
        stopCountdown,
        seconds,
    }
}

export { useTimer }