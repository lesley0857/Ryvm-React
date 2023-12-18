import React, { useEffect } from "react";
import axios from "axios";
import baseUrl from "./Utility_folders/AxiosInstance";

function Prayerpage() {

    useEffect(() => {
        axios.get(`${baseUrl}/api/prayer/all_prayer/`)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            })
    })
    return (
        <>
            Prayer
        </>
    )

}
export default Prayerpage