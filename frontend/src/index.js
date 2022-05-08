import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { extendTheme, ChakraProvider} from '@chakra-ui/react';
import {mode} from "@chakra-ui/theme-tools";
import About from './About';

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

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({colors, styles: {
  global: (props) => ({
    "html, body": {
      background: "#C1CCD7" //"",  //mode(light mode color, dark mode color)
    },
  }),
}, config, colors})

function Final() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/about" element={<About/>}/>
        </Routes>
        <Routes>
          <Route path="/" element={<App/>}/>
        </Routes>
        <Routes>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Router>
    </div>
    
  )
}

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//     </div>
//   )
// }

const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  )
}


// const route = (
//   <Router>
//       <Route path="/" component={Final}/>
//   <Router>
// )

ReactDOM.render(
  <ChakraProvider initialColorMode={config.initialColorMode} theme={theme}>
  <Final/>
  </ChakraProvider>
  ,
  document.getElementById('root')
);
