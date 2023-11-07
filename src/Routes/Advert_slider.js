import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import "../Routes/CSS_folder/advert_slider.css";
import axios from "axios";


function Advert_page() {
    const [advert_state, Set_advert_state] = useState(null)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/clergy/')
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
                <SwiperSlide className="swiper-slider">
                    <img className=".swiper-slider img " src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slider">
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>

            </Swiper>
        </>
    )
}
export default Advert_page