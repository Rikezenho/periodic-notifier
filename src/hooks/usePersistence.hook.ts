const LOCALSTORAGE_KEY = 'periodicNotifier'

const usePersistence = () => {
    const getLocalStorageJson = () => JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {}

    const getPersisted = (data) => getLocalStorageJson()[data]

    const persist = (data, value) => localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ ...getLocalStorageJson(), [data]: value }))

    return {
        getPersisted,
        persist,
    }
}

export { usePersistence }