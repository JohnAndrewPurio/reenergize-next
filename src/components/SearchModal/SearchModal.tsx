import { modalController } from "@ionic/core"
import { closeCircleOutline } from "ionicons/icons"
import { FC, useCallback, useEffect, useMemo } from "react"

const modalComponent = "search-modal"

interface SearchModalInterface {
    searchTitle?: string
}

const SearchModal: FC<SearchModalInterface> = ({ searchTitle }) => {
    const modal = useMemo(async () => {
        const modal = await modalController.create({
            component: modalComponent,
            swipeToClose: true
        })

        return modal
    }, [])

    const openModal = async () => {
        (await modal).present()
    }

    const closeModal = async () => {
        (await modal).dismiss()
    }

    useEffect(() => {
        openModal()
    }, [])

    return (
        <ion-modal is-open={true}>
            <ion-header translucent>
                <ion-toolbar>
                    <ion-searchbar placeholder={searchTitle || "Search"} />

                    <ion-buttons slot="end">
                        <ion-button onClick={closeModal}>
                            <ion-icon icon={closeCircleOutline} slot="icon-only" />
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content fullscreen>
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
            </ion-content>
        </ion-modal>
    )
}

export default SearchModal