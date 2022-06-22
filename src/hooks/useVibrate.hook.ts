import { useState, useEffect, useCallback } from 'react'

const VIBRATE_PATTERN = [200, 100, 200, 100, 200]

const useVibrate = () => {
    const [hasVibrateApi, setHasVibrateApi] = useState(false)

    const vibrate = useCallback(() => {
        window.navigator.vibrate(VIBRATE_PATTERN)
    }, [])

    useEffect(() => {
        if (window?.navigator?.vibrate) setHasVibrateApi(true)
    }, [])

    return {
        hasVibrateApi,
        vibrate
    }
}

export { useVibrate }