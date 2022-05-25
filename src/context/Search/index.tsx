import { closeCircleOutline, closeOutline } from "ionicons/icons";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";

interface SearchResult {
    name: string
    handler: () => void
}

interface ContextInterface {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>

    data: SearchResult[]
    setData: Dispatch<SetStateAction<SearchResult[]>>
}

const SearchContext = createContext<ContextInterface>({
    isOpen: false,
    setIsOpen: () => { },

    data: [],
    setData: () => { }
})

export const useSearchModal = () => useContext(SearchContext)

interface SearchModalInterface {
    searchTitle: string
}

export const SearchModalProvider: FC<SearchModalInterface> = ({ children, searchTitle }) => {
    const [data, setData] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        console.log("Modal Open:", isOpen)

    }, [isOpen])

    return (
        <SearchContext.Provider value={{
            data, setData, isOpen, setIsOpen
        }}>
            {children}
            <ion-modal
                is-open={isOpen}
                swipte-to-close
            >
                <ion-header>
                    <ion-toolbar>
                        <ion-searchbar placeholder={searchTitle || "Search"} />
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <ion-list>
                        <ion-item>
                            Search 1
                        </ion-item>
                        <ion-item>
                            Search 2
                        </ion-item>
                        <ion-item>
                            Search 3
                        </ion-item>
                    </ion-list>

                    <ion-fab vertical="bottom" horizontal="end">
                        <ion-fab-button onClick={closeModal} color="danger">
                            <ion-icon icon={closeOutline} />
                        </ion-fab-button>
                    </ion-fab>
                </ion-content>
            </ion-modal>
        </SearchContext.Provider>
    )
}