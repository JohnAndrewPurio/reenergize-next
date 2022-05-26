import { User } from "@capacitor-firebase/authentication";
import { Capacitor } from "@capacitor/core";
import { useRouter } from "next/router";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { routes } from "../../utils/Navigation/routes";
import { getValue, storeValue } from "../../utils/Storage";

interface ContextInterface {
    data: User | null
    setData: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<ContextInterface>({
    data: null,
    setData: () => { }
})

export const useUserInfo = () => useContext(UserContext)

export const UserInfoProvider: FC = ({ children }) => {
    const [data, setData] = useState<User | null>(null)
    const { push, pathname } = useRouter()

    const retrieveStoredUserInfo = async () => {
        try {
            const data = await getValue("userInfo")

            setData(data)
        } catch (error) {
            throw error
        }
    }

    const goToLoginPage = () => {
        push(routes["LOGIN"])
    }

    const goToHome = () => {
        push(routes["DEFAULT"])
    }

    useEffect(() => {
        retrieveStoredUserInfo()
    }, [])


    useEffect(() => {
        if(!Capacitor.isNativePlatform())
            return

        if (!data && !pathname.includes("/auth")) {
            storeValue("userInfo", data)
            goToLoginPage()

            return
        }

        goToHome()
        storeValue("userInfo", data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <UserContext.Provider value={{
            data, setData
        }}>
            {children}
        </UserContext.Provider>
    )
}