import { NextPage } from "next"
import { useEffect } from "react"

import Swiper, { Navigation, Pagination } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    pagination: {
        el: ".swiper-pagination"
    }
})

const Intro: NextPage = () => {
    useEffect(() => {

    }, [])

    return (
        <>
            <ion-content fullscreen>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">Slide 1</div>
                        <div className="swiper-slide">Slide 2</div>
                        <div className="swiper-slide">Slide 3</div>
                    </div>

                    <div className="swiper-pagination" />
                </div>
            </ion-content>
            <style jsx>{`
                .swiper {
                    width: 100%;
                    height: 100%;
                }    
            `}</style>
        </>
    )
}

export default Intro