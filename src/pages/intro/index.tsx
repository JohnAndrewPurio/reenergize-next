import { GetStaticProps, NextPage } from "next"

import Swiper, { Navigation, Pagination } from "swiper"
import UserLocationSlide from "../../components/slides/UserLocationSlide"
import ContinueSlide from "../../components/slides/ContinueSlide"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    pagination: {
        el: ".swiper-pagination"
    }
})

interface IntroProps {
    apiUrl: string
}

const Intro: NextPage<IntroProps> = ({ apiUrl }) => {
    const slides = [
        <UserLocationSlide baseUrl={apiUrl} key="" />,
        <ContinueSlide key="" />
    ]

    return (
        <>
            <ion-content fullscreen>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {
                            slides.map((slide, index) => (
                                <div className="swiper-slide" key={index}>
                                    {slide}
                                </div>
                            ))
                        }
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

export const getStaticProps: GetStaticProps<IntroProps> = async () => {
    return {
        props: {
            apiUrl: process.env.API_BASE_URL || "https://reenergize-server.herokuapp.com/"
        }
    }
}

export default Intro