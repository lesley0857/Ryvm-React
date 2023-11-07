import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import "../Routes/CSS_folder/clergy_slider.css";
import axios from "axios";


function Clergy_page() {
    const [clergy_state, Set_clergy_state] = useState(null)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/clergy/')
            .then((res) => {
                console.log(res);
                Set_clergy_state(res.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    return (<div className="cont">
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
        >
            {clergy_state ? clergy_state.map(clergy => <SwiperSlide key={clergy.id}>
                <div className="clergy_name">{clergy.clergy_name}</div>
                <img className="img" src={`http://127.0.0.1:8000${clergy.profile_pic}`} />
            </SwiperSlide>) : <div>Loading.......</div>}
        </Swiper>
    </div>
    )
}
export default Clergy_page