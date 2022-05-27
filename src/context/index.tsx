import { FC } from 'react'
import { UserLocationProvider } from './Location'
import { ThemeProvider } from './Theme'
import { UserInfoProvider } from './User'

const ContextProviders: FC = ({ children }) => {
    return (
        <ThemeProvider>
            <UserInfoProvider>
                <UserLocationProvider>
                    {children}
                </UserLocationProvider>
            </UserInfoProvider>
        </ThemeProvider>
    )
}

export default ContextProviders