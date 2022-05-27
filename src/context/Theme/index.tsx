import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";

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

    return (
        <ThemContext.Provider value={{
            isDark, setIsDark
        }}>
            {children}
        </ThemContext.Provider>
    )
}