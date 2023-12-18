import axios from "axios";
import ImageElement from "./background_image";
import './CSS_folder/home.css';

const HomePage = () => {

    return (
        <>
            <ImageElement />
            <section id="Overlay" className="home_overlay">
                <h4 className="overlay_header">
                    ACTIVITIES
                </h4>
                <span className="overlay_holder">
                    <div>MASS:</div>
                    <div>9:00am</div>
                </span>
                <span className="overlay_holder">
                    <div>CONFESSION:</div>
                    <div>After 9:00am Mass</div>
                </span>

            </section>
        </>
    )
}
export default HomePage