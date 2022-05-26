import { SearchbarChangeEventDetail } from "@ionic/core";
import { closeCircleOutline, closeOutline } from "ionicons/icons";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { sampleForwardGeocodingData } from "../../api/Mapbox/constants";

type SearchResult = typeof sampleForwardGeocodingData.features[0]

interface ContextInterface {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>

    data: SearchResult[]
    setData: Dispatch<SetStateAction<SearchResult[]>>

    searchHandler: (event: CustomEvent<SearchbarChangeEventDetail>) => void
    setSearchHandler: Dispatch<SetStateAction<(event: CustomEvent<SearchbarChangeEventDetail>) => void>>
}

const SearchContext = createContext<ContextInterface>({
    isOpen: false,
    setIsOpen: () => { },

    data: [],
    setData: () => { },

    searchHandler: (event: CustomEvent<SearchbarChangeEventDetail>) => { },
    setSearchHandler: () => { }
})

export const useSearchModal = () => useContext(SearchContext)

interface SearchModalInterface {
    searchTitle: string
}

export const SearchModalProvider: FC<SearchModalInterface> = ({ children, searchTitle }) => {
    const searchRef = useRef<HTMLIonSearchbarElement>()

    const [data, setData] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [searchHandler, setSearchHandler] = useState(() => (event: CustomEvent<SearchbarChangeEventDetail>) => { })

    const closeModal = () => {
        setIsOpen(false)
    }

    const searchListener = (e: Event) => {
        const event = e as CustomEvent<SearchbarChangeEventDetail>

        searchHandler(event)
    }

    useEffect(() => {
        if (!isOpen) {
            searchRef.current?.removeEventListener("ionChange", searchListener)

            return
        }

        searchRef.current?.addEventListener("ionChange", searchListener)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    return (
        <SearchContext.Provider value={{
            data, setData, isOpen, setIsOpen, searchHandler, setSearchHandler
        }}>
            {children}
            <ion-modal
                is-open={isOpen}
                swipte-to-close
            >
                <ion-header>
                    <ion-toolbar>
                        <ion-searchbar
                            ref={searchRef}
                            placeholder={searchTitle || "Search"}
                        />
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    {
                        data.length === 0 ?
                            <ion-grid>
                                <ion-row class="ion-padding ion-justify-content-center">
                                    <ion-text color="secondary">No Search Results Matches your Query</ion-text>
                                </ion-row>
                            </ion-grid>
                            : <ion-list>
                                {
                                    data.map(({ place_name, text }, index) => (
                                        <ion-item key={index}>
                                            <ion-label>
                                                <h5>{text}</h5>
                                                <p>{place_name}</p>
                                            </ion-label>
                                        </ion-item>
                                    ))
                                }
                            </ion-list>
                    }


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