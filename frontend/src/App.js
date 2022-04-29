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


const ToastContext = React.createContext(() => {});

// create provider


const breakpoints = {
  base: "90%",
  sm: '90%',
  md: '80%',
  lg: '70%',
  xl: '70%',
  '2xl': '70%',
}

function Toast(props) {
  const toast = useToast()
  return (
    <Button
      marginTop="25px"
      marginBottom="25px"
      marginLeft={props.ml}
      onClick={() =>
        {toast({
          title: props.title,
          description: props.description,
          status: props.status,
          duration: props.duration,
          isClosable: props.closable,
        })
        navigator.clipboard.writeText(props.data)}
      }
    >
      Copy
    </Button>
  )
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
             size="lg"
             height="200px"
             focusBorderColor="black"
             onChange={(e) => {this.setState({value: e.target.value})}}
             />
          <Tooltip label="click to submit" placement="bottom">
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
          
            {(this.state.id !== null) ? <Box
            marginTop="10px"
          >Your Retrive ID: {this.state.id}<Toast 
          data={this.state.id}
          title='Copied to Clipboard.' 
          description="Retrive ID copied to Clipboard." 
          status='success'
          duration={1500}
          closable={true}
          ml="50px"
         /> </Box>: <div></div>}
          
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
                placeholder="Enter your retrive ID..."
                onKeyPress={this.handleSearch}
            />
          </InputGroup>
          {/* {(this.state.resp !== null) ? <div>Your text: {this.state.resp} </div>: <div></div>} */}
          {(this.state.resp !== null) ? <>
          <Toast 
            data={this.state.resp} 
            title='Copied to Clipboard.' 
            description="Text copied to you clipboard." 
            status='success'
            duration={1500}
            closable={true}
            />
          <Box 
            marginTop="10px"
            borderWidth='1px' borderRadius='lg'
            minH="100px"
            display='flex'
            paddingTop="20px"
            paddingLeft="10px"
          >
            {this.state.resp} 
          </Box></>: <div></div>}
        </Container>
      </div>
    );
  }
}

export default App;
