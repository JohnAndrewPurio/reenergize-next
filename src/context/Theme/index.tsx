import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { getValue, storeValue } from "../../utils/Storage";
import { toggleDarkMode } from "../../utils/Theme";

interface ContextInterface {
    isDark: boolean,
    setIsDark: Dispatch<SetStateAction<boolean>>
}

const ThemContext = createContext<ContextInterface>({
    isDark: true,
    setIsDark: () => {}
})

export const useTheme = () => useContext(ThemContext)

export const ThemeProvider: FC = ({ children }) => {
    const [isDark, setIsDark] = useState<boolean>(false)

    const retrieveCachedData = async () => {
        try {
            const isDark = await getValue("isDark")
            
            setIsDark(!!isDark)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        retrieveCachedData()
    }, [])

    useEffect(() => {
        toggleDarkMode(isDark)
        storeValue("isDark", isDark)
    }, [isDark])

    return (
        <ThemContext.Provider value={{
            isDark, setIsDark
        }}>
            {children}
        </ThemContext.Provider>
    )
}