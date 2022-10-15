import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Routs from './Routing'
import ReactGA from 'react-ga';

const TRACKING_ID = "G-F5WG7KKNJM";
ReactGA.initialize(TRACKING_ID);
const dark = "#171923"
const colors = {
    primary: {
        ligth: "#ffffff",
    },
    submit: {
        light: "#56A6DC" //#33a5f2
    },
    container: {
        light: "#ffffff"
    },
    navbar: {
        light: "#14202A"
    }
}


// const theme = extendTheme({
//   styles: {
//     global: {
//       "html, body": {
//         background: mode("white", "gray.700")
//       }
//     }
//   }
// })

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}



const theme = extendTheme({styles: {
        global: (props) => ({
            "html, body": {
                background: "#C1CCD7" //"",  //mode(light mode color, dark mode color)
            },
        }),
    }, config, colors})

// const GA = () => {
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());

//     gtag('config', 'G-VGQ9489MDH');
// }
const App = (props) => {
    window.dataLayer = window.dataLayer || [];
    const gtag = () => {
        dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', "G-VGQ9489MDH")
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, [])
    return (
        <ChakraProvider initialColorMode={config.initialColorMode} theme={theme}>
            {/* <GA/> */}
            
            <Routs/>
        </ChakraProvider>
    )
}

export default App;
