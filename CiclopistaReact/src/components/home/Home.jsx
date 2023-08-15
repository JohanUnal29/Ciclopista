import React from 'react';
import Navbar from '../subcomponents/navbar/Navbar';
import ReactFullpage from "@fullpage/react-fullpage";
import Google from "../subcomponents/googleMaps/Google.jsx"
import Footer from "../subcomponents/footer/Footer.jsx"

import './Home.css';



const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const originalColors = [
    "#ff5f45",
    "#f19b9b",
    "#fc6c7c",
    "#435b71",
    "orange",
    "blue",
    "purple",
    "yellow"
];

const pluginWrapper = () => {
    /*
     * require('./fullpage.fadingEffect.min'); // Optional. Required when using the "fadingEffect" extension.
     */
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionsColor: [],
            fullpages: [
                {
                    text:
                        <>
                            <h1 className="titulo">
                                ¡Bienvenido a importaciones ciclopista!
                            </h1>

                            <h2 className="subtitulo">Venta de repuestos para bicicletas<br />al detal y al por mayor</h2>
                        </>

                },
                {
                    text: <>

                        <div className="slide">
                            <img className="slide-image" src="https://drive.google.com/uc?export=download&id=1H1a0CKoef38QE9jr2OACt4g8u-daFrbB" alt="Sillín"></img>
                        </div>

                        <div className="slide">
                            <img className="slide-image" src="https://drive.google.com/uc?export=download&id=1NwjDltxGUp8SMBWG7DvKLmIVDy1_9jFU" alt="Relación 58 cp"></img>
                        </div>

                        <div className="slide">
                            <img className="slide-image" src="https://drive.google.com/uc?export=download&id=1yQAQRtz0ynfbSSiHjyfa1fp9sJij0vUA" alt="Relación integrada cp"></img>
                        </div>

                    </>
                },
                {

                    text:
                        <>
                            <Google/>
                            <Footer /></>


                }
            ]
        };
    }

    onLeave(origin, destination, direction) {
        console.log("onLeave", { origin, destination, direction });
        // arguments are mapped in order of fullpage.js callback arguments do something
        // with the event
    }

    render() {
        const { fullpages } = this.state;

        if (!fullpages.length) {
            return null;
        }

        const Menu = () => (
            <><div>
                <Navbar/>
            </div></>
        );

        return (
            <div className="App">
                <Menu />
                <ReactFullpage
                    debug /* Debug logging */
                    // Required when using extensions
                    pluginWrapper={pluginWrapper}
                    // fullpage options
                    licenseKey={"YOUR_KEY_HERE"} // Get one from https://alvarotrigo.com/fullPage/pricing/
                    navigation
                    anchors={["firstPage", "secondPage", "thirdPage"]}
                    sectionSelector={SECTION_SEL}
                    onLeave={this.onLeave.bind(this)}
                    sectionsColor={this.state.sectionsColor}
                    render={(comp) => (
                        <ReactFullpage.Wrapper>
                            {fullpages.map(({ text }) => (
                                <>
                                    <div key={text} className={SEL}>

                                        {text}
                                    </div></>
                            ))}
                        </ReactFullpage.Wrapper>
                    )}
                />
            </div>
        );
    }
}

export default Home;
