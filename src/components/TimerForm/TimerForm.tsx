import { useState } from 'react'
import { useNotification } from '../../hooks/useNotification.hook'
import { usePersistence } from '../../hooks/usePersistence.hook'
import { useTimer } from '../../hooks/useTimer.hook'
import { useVibrate } from '../../hooks/useVibrate.hook'
import { InputBoxed } from '../InputBoxed'
import './styles.css'

const DEFAULT_INTERVAL = 1
const DEFAULT_NOTIFICATION_TITLE = 'Notificação periódica!'
const DEFAULT_NOTIFICATION_DESCRIPTION = 'Olha o timer aí :)'

const INTERVAL_KEY = 'INTERVAL'
const NOTIFICATION_TITLE_KEY = 'NOTIFICATION_TITLE'
const NOTIFICATION_DESCRIPTION_KEY = 'NOTIFICATION_DESCRIPTION'
const SHOULD_VIBRATE_KEY = 'SHOULD_VIBRATE'

const TimerForm = () => { 
    const { getPersisted, persist } = usePersistence()

    const [intervalInMinutes, setIntervalInMinutes] = useState(getPersisted(INTERVAL_KEY) || DEFAULT_INTERVAL)
    const [isActive, setIsActive] = useState(false)

    const [notificationTitle, setNotificationTitle] = useState(getPersisted(NOTIFICATION_TITLE_KEY) || DEFAULT_NOTIFICATION_TITLE)
    const [notificationDescription, setNotificationDescription] = useState(getPersisted(NOTIFICATION_DESCRIPTION_KEY) || DEFAULT_NOTIFICATION_DESCRIPTION)

    const [shouldVibrate, setShouldVibrate] = useState(getPersisted(SHOULD_VIBRATE_KEY) === null ? true : getPersisted(SHOULD_VIBRATE_KEY))

    const {
        hasNotificationApi,
        hasPermissionForNotification,
        requestNotificationPermission,
        notificate
    } = useNotification({ title: notificationTitle, description: notificationDescription })

    const {
        hasVibrateApi,
        vibrate,
    } = useVibrate()

    const onFinishCountdown = () => {
        if (hasVibrateApi && shouldVibrate) {
            vibrate()
        }
        if (hasNotificationApi && hasPermissionForNotification) {
            notificate()
        }
    }

    const {
        seconds,
        startCountdown,
        stopCountdown,
    } = useTimer({ minutes: intervalInMinutes, onFinishCountdown })

    const toggleTimer = () => {
        requestNotificationPermission()
        setIsActive(status => !status)

        if (isActive) {
            stopCountdown()
        } else {
            startCountdown()
        }
    }

    return <>
        <div className='row'>
            <InputBoxed
                label='Tempo de intervalo (em minutos)'
                type='number'
                id='interval'
                defaultValue={intervalInMinutes}
                handleChange={(e) => {
                    persist(INTERVAL_KEY, e.target.value)
                    setIntervalInMinutes(e.target.value)
                }}
            />
        </div>
        {
            !hasPermissionForNotification
            ? <div className="warning">Autorize as notificações para esta página no seu navegador.</div>
            : null
        }
        {hasPermissionForNotification && hasNotificationApi ?
            <>
                <div className="row">
                    <InputBoxed
                        label='Título da notificação'
                        type='text'
                        id='notificationTitle'
                        defaultValue={notificationTitle}
                        handleChange={(e) => {
                            persist(NOTIFICATION_TITLE_KEY, e.target.value)
                            setNotificationTitle(e.target.value)
                        }}
                    />
                </div>
                <div className="row">
                    <InputBoxed
                        label='Descrição da notificação'
                        type='text'
                        id='notificationDescription'
                        defaultValue={notificationDescription}
                        handleChange={(e) => {
                            persist(NOTIFICATION_DESCRIPTION_KEY, e.target.value)
                            setNotificationDescription(e.target.value)
                        }}
                    />
                </div>
            </> : null
        }
        {!hasVibrateApi
            ? <div className="warning">Seu browser não suporta o controle de vibrações.</div>
            : <div className="row">
                <label htmlFor="shouldVibrate">
                    Vibrar?
                    <input
                        type="checkbox"
                        id="shouldVibrate"
                        checked={shouldVibrate}
                        onChange={(e) => {
                            persist(SHOULD_VIBRATE_KEY, e.target.checked)
                            setShouldVibrate(e.target.checked)
                        }}
                    />
                </label>
            </div>
        }
        <div className="countdown">
            Segundos do timer: {seconds}
        </div>
        <button className={`button full ${isActive ? 'active' : ''}`} onClick={toggleTimer}>
            {isActive ? 'Parar' : 'Iniciar'}
        </button>
    </>
}

export { TimerForm }