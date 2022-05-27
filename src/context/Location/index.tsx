import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import { getValue, storeValue } from "../../utils/Storage"

export interface UserLocationInterface {
    latitude: number
    longitude: number
    address: string
}

interface ContextInterface {
    data: UserLocationInterface | void
    setData: Dispatch<SetStateAction<UserLocationInterface | void>>
}

const UserLocationContext = createContext<ContextInterface>({
    data: undefined,
    setData: () => { }
})

export const useUserLocation = () => useContext(UserLocationContext)

export const UserLocationProvider: FC = ({ children }) => {
    const [data, setData] = useState<UserLocationInterface | void>()

    const getCachedValue = async () => {
        try {
            const location = await getValue("location")

            setData(location)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCachedValue()
    }, [])

    useEffect(() => {
        storeValue("location", data)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <UserLocationContext.Provider value={{
            data, setData
        }}>
            {children}
        </UserLocationContext.Provider>
    )
}