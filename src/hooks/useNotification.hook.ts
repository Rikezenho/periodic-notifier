import { useState, useEffect, useCallback } from 'react'

type useNotificationType = {
    title?: string
    description?: string
}

const useNotification = ({
    title = 'Notificação',
    description = ''
}: useNotificationType) => {
    const [hasNotificationApi, setHasNotificationApi] = useState(false)
    const [hasPermissionForNotification, setHasPermissionForNotification] = useState(false)

    const notificate = useCallback(() => {
        new Notification(title, { body: description })
    }, [title, description])
    
    const requestNotificationPermission = useCallback(() => {
        if (Notification.permission === "granted") return

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

        if (Notification.permission === "granted") {
            setHasPermissionForNotification(true)
        }

        if (Notification.permission !== 'denied') {
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