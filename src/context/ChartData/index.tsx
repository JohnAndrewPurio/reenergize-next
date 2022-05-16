import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { WorldRadiationForecastData } from "../../api/Solcast/constants";

const initialData: WorldRadiationForecastData = {
    forecasts: []
}

interface ContextInterface {
    data: WorldRadiationForecastData,
    setData: Dispatch<SetStateAction<WorldRadiationForecastData>>
}

interface ProviderInterface {
    baseUrl: string
    params: string,
    query: {
        [key: string]: any
    }
}

export const SolcastContext = createContext<ContextInterface>({
    data: initialData,
    setData: () => { }
})

export const useSolcast = () => useContext(SolcastContext)

export const SolcastProvider: FC<ProviderInterface> = ({ children }) => {
    const [data, setData] = useState<typeof initialData>(initialData)

    useEffect(() => {
        // const url = new URL(params, baseUrl)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SolcastContext.Provider value={{
            data, setData
        }}>
            {children}
        </SolcastContext.Provider>
    )
}