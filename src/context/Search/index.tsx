import { SearchbarChangeEventDetail } from "@ionic/core";
import { closeOutline } from "ionicons/icons";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { sampleForwardGeocodingData } from "../../api/Mapbox/constants";
import { useUserLocation } from "../Location"

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
    const { setData: setLocationData } = useUserLocation()

    const [data, setData] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [searchHandler, setSearchHandler] = useState(() => (event: CustomEvent<SearchbarChangeEventDetail>) => { })

    const closeModal = () => {
        setIsOpen(false)
    }

    const selectHandler = (data: SearchResult) => {
        const { center, text } = data
        const [latitude, longitude] = center

        setIsOpen(false)
        setLocationData({
            latitude, longitude,
            address: text
        })
    }
  
    useEffect(() => {
        const searchListener = (e: Event) => {
            const event = e as CustomEvent<SearchbarChangeEventDetail>
    
            searchHandler(event)
        }

        searchRef.current?.removeEventListener("ionChange", searchListener)
        searchRef.current?.addEventListener("ionChange", searchListener)
    }, [searchHandler])

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
                                    data.map((ele, index) => (
                                        <ion-item key={index} button onClick={() => selectHandler(ele)}>
                                            <ion-label>
                                                <h5>{ele.text}</h5>
                                                <p>{ele.place_name}</p>
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