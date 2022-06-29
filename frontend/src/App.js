import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import React from "react";
import Routs from './Routing'

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
const App = (props) => {
    return (
        <ChakraProvider initialColorMode={config.initialColorMode} theme={theme}>
            <Routs/>
        </ChakraProvider>
    )
}

export default App;
