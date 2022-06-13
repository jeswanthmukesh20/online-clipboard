import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { extendTheme, ChakraProvider} from '@chakra-ui/react';
import {mode} from "@chakra-ui/theme-tools";
import Abt from './About';
import Sidebar from './components/Sidebar';
import Seo from './Seo';


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

const theme = extendTheme({styles: {
  global: (props) => ({
    "html, body": {
      background: "#C1CCD7" //"",  //mode(light mode color, dark mode color)
    },
  }),
}, config, colors})

const Home = () => {
  return (
    <>
      <Sidebar children={<App/>}/>
    </>
  )
}

const About = () => {
  return (
    <>
      <Sidebar children={<Abt/>}/>
    </>
  )
}

function Final() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/about" element={<About/>}/>
        </Routes>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Routes>
          <Route path="/contact" element={<Contact />}/>
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
const Cnt = () => {
  return (
    <div>

      <h1>Contact page</h1>
    </div>
  )
}
const Contact = () => {
  return (
    <>
    <Seo/>
      <Sidebar children={<Cnt/>}/>
    </>
  )
}


// const route = (
//   <Router>
//       <Route path="/" component={Final}/>
//   <Router>
// )

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider initialColorMode={config.initialColorMode} theme={theme}>
  <Final/>
  </ChakraProvider>
);
