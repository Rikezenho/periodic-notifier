import { useState, useEffect, useCallback } from 'react'

type useNotificationType = {
    title?: string
    description?: string
}

const useNotification = ({
    title = '',
    description = '',
}: useNotificationType) => {
    const [hasNotificationApi, setHasNotificationApi] = useState(false)
    const [hasPermissionForNotification, setHasPermissionForNotification] = useState(false)

    const notificate = useCallback(() => {
        if (!navigator?.serviceWorker?.ready) return

        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
                body: description,
            });
        });
    }, [title, description])
    
    const requestNotificationPermission = useCallback(() => {
        Notification.requestPermission((permission) => {
            if (permission === "granted") {
                setHasPermissionForNotification(true)
            }
        });
    }, [])

    useEffect(() => {
        if ("Notification" in window) {
            setHasNotificationApi(true)
        }

        if (window?.Notification && Notification.permission === "granted") {
            setHasPermissionForNotification(true)
        }

        if (window?.Notification && Notification.permission !== 'denied') {
            requestNotificationPermission()
        }
    }, [])

    return {
        hasNotificationApi,
        hasPermissionForNotification,
        requestNotificationPermission,
        notificate
    }
}

export { useNotification }