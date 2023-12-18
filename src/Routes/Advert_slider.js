import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import "../Routes/CSS_folder/advert_slider.css";
import axios from "axios";
import baseUrl from "./Utility_folders/AxiosInstance";


function Advert_page() {
    const [advert_state, Set_advert_state] = useState(null)
    useEffect(() => {
        axios.get(`${baseUrl}/api/adverts/`)
            .then((res) => {
                console.log(res);
                Set_advert_state(res.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper swiperr"
            >
                {advert_state ? advert_state.map(advert =>
                    <SwiperSlide key={advert.id} className="swiper-slider">
                        <img className=".swiper-slider img " src={`${baseUrl}/${advert.adverticement_image}`} />
                    </SwiperSlide>
                ) : <div>......Loading</div>}


            </Swiper>
        </>
    )
}
export default Advert_page