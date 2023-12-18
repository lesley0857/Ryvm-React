import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "./Utility_folders/AxiosInstance";
import './CSS_folder/bg_image.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Parallax, Pagination, Navigation } from 'swiper/modules';


function ImageElement(props) {
    const [clergy_state, Set_clergy_state] = useState(null)
    // useEffect(() => {
    //     // axios.get('https://ryvm-django.vercel.app/api/clergy/')
    //     axios.get(`${baseUrl}/api/clergy/`)
    //         .then((res) => {
    //             console.log(res);
    //             Set_clergy_state(res.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }, [])

    return (<>
        <Swiper
            style={{
                'width': '100%',
                'height': '80vh',
                'padding-left': '0.5em',
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            }}
            speed={600}
            parallax={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Parallax, Pagination, Navigation]}
            className="mySwiper"
        >
            <div
                slot="container-start"
                className="parallax-bg"
                style={{
                    // 'background': 'linear-gradient(to bottom, Black,Gray, Black )',
                }}
                data-swiper-parallax="-23%"
            ></div>
            <SwiperSlide style={{ 'borderRadius': '0%', background: 'Black' }}>
                <img src="http://127.0.0.1:8000/media/images/arch.jpeg" className="bg_image" data-swiper-parallax="-100" />
            </SwiperSlide>
            <SwiperSlide style={{ 'borderRadius': '0%', background: 'Black' }}>
                <img src="http://127.0.0.1:8000/media/images/arch.jpeg" className="bg_image" data-swiper-parallax="-100" />
                {/* <div className="title" data-swiper-parallax="-300">
                    Slide 2
                </div>
                <div className="subtitle" data-swiper-parallax="-200">
                    Subtitle
                </div>
                <div style={{ 'margin': '0.5em' }} className="text" data-swiper-parallax="-100">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                        dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                        laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                        Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                        Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                        ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                        tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                    </p>
                </div> */}
            </SwiperSlide>
            <SwiperSlide style={{ 'borderRadius': '0%', background: 'Black' }} className="firstSet">
                <img src="http://127.0.0.1:8000/media/images/arch.jpeg" className="bg_image" data-swiper-parallax="-100" />
                {/* <div className="title" data-swiper-parallax="-300">
                    Slide 3
                </div>
                <div className="subtitle" data-swiper-parallax="-200">
                    Subtitle
                </div>
                <div className="text" data-swiper-parallax="-100">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                        dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                        laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                        Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                        Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                        ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                        tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                    </p>
                </div> */}
            </SwiperSlide>
        </Swiper >
    </>
    )
}
export default ImageElement