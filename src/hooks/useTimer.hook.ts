import { useState, useEffect, useCallback } from 'react'

type useTimerType = {
    minutes: number
    onFinishCountdown: Function
}

const minutesToSeconds = (minutes: number): number => minutes * 60

const useTimer = ({ minutes, onFinishCountdown }: useTimerType) => {
    const [seconds, setSeconds] = useState(minutesToSeconds(minutes))
    const [timerId, setTimerId] = useState(null)

    const startCountdown = useCallback(() => {
        setSeconds(minutesToSeconds(minutes))
        setTimerId(
            setInterval(() => {
                setSeconds((seconds) => seconds - 1)
            }, 1000)
        )
    }, [])

    const stopCountdown = useCallback(() => {
        clearInterval(timerId)
        setTimerId(null)
    }, [])

    useEffect(() => {
        if (seconds === 0) {
            onFinishCountdown()
            setSeconds(minutesToSeconds(minutes))
        }
    }, [seconds])

    return {
        startCountdown,
        stopCountdown,
        seconds,
    }
}

export { useTimer }