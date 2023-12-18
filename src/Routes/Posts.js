import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import "../Routes/CSS_folder/advert_slider.css";
import axios from "axios";
// Import Swiper styles
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "../Routes/CSS_folder/posts_slider.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';



function Posts_page() {
    const [posts_state, Set_posts_state] = useState(null)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/clergy/')
            .then((res) => {
                console.log(res);
                Set_posts_state(res.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
            </Swiper>
        </>
    )
}
export default Posts_page