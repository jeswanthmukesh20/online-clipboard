import React, { Component, useState } from 'react';
import {
  Button,
  Tooltip,
  Container,
  Textarea,
  Input,
  InputRightElement,
  InputGroup,
  useToast,
    Box
} from '@chakra-ui/react';
import Navbar from './components/Navbar.js';
import { Search2Icon } from "@chakra-ui/icons";
const axios = require("axios");


// const ToastContext = React.createContext(() => {});
// function ToastProvider({ children }) {
//   const toast = useToast();
//   return (
//       <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
//   );
// }
const breakpoints = {
  base: "90%",
  sm: '90%',
  md: '80%',
  lg: '70%',
  xl: '70%',
  '2xl': '70%',
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
      value: null, 
      resp: null
    }
  }

  handleSearch = (e) => {
    if(e.key === 'Enter'){
      axios.post("http://localhost:2222/retrive", {
        retrive_id: e.target.value
      }).then(res => {
        if(res.data.msg === "success"){
          this.setState({
            resp: res.data.data
            
          })
        }else{
          this.setState({
            resp: "Invalid retrive id"
            
          })
        }
        
      }).catch(error => {
        console.log(error)
      })
    }
  }
  handleSubmit = (e) => {
    axios.post("http://localhost:2222/paste", {data: this.state.value}, {
      "accept": "application/json",
      "Content-type": "application/json"
    }).then((response) => {
        this.setState({
          id: response.data.id
        })
    }).catch((error) => {
      console.log(error);
    })
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <Container
        maxW={breakpoints}
        maxH={breakpoints}
         bg="white" style={{
          marginTop: "60px",
          borderRadius: "10px",
          padding: "20px",
        }}>
          <Textarea
             placeholder="Paste your text here"
             colorScheme="white"
             color="black"
             font
             size="lg"
             focusBorderColor="black"
             onChange={(e) => {this.setState({value: e.target.value})}}
             />
          <Tooltip label="click to submit" placement="bottom">
          {/*<ToastContext.consumer>*/}
          {/*  {toast => (*/}
                <Button
              variant="solid"
              colorScheme="white"
              bg="#56A6DC"
              width='100%'
              marginTop="15px"
              onClick={this.handleSubmit}
          >
            Save to Clipboard
          </Button>
          {/*  )}*/}
          {/*</ToastContext.consumer>*/}
          </Tooltip>
          <Box
            marginTop="10px"
          >
            {(this.state.id !== null) ? <div>Your Retrive ID: {this.state.id} </div>: <div></div>}
            {/* {(this.state.value !== null) ? <div>Your text: {this.state.value} </div>: <div></div>} */}

          </Box>
        </Container>
        <Container
            maxW={breakpoints}
            maxH={breakpoints}
            bg="white" style={{
          marginTop: "60px",
          borderRadius: "10px",
          padding: "20px",
        }}>
          <InputGroup size="lg">
            <InputRightElement
                pointerEvents='none'
                children={<Search2Icon color='gray.300' />}/>
            <Input
                placeholder="Enter your retrive code..."
                onKeyPress={this.handleSearch}
            />
          </InputGroup>
          <Box 
          marginTop="10px"
          >
            {(this.state.resp !== null) ? <div>Your text: {this.state.resp} </div>: <div></div>}
          </Box>
        </Container>
      </div>
    );
  }
}

export default App;
