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
      variant={props.variant}
      colorScheme={props.colorScheme}
      bg={props.bg}
      width={props.width}
      marginBottom={props.marginBottom}
      marginTop={props.marginTop}
      marginLeft={props.ml}
      onClick={() =>
        {
          props.submit();
          toast({
          title: props.title,
          description: props.description,
          status: props.status,
          duration: props.duration,
          isClosable: props.closable,
        })
        navigator.clipboard.writeText(props.data)}
      }
    >
      {props.text}
    </Button>
  )
}

function ToastBox(props){
  const toast = useToast()
  return (
    <Box
      marginTop={props.mt}
      ml={props.ml}
      borderWidth={props.bw} 
      borderRadius={props.br}
      minH={props.minH}
      display={props.display}
      paddingTop={props.pt}
      paddingLeft={props.pl}
      as="button"
      width={props.width}
      fontWeight={props.fontWeight}
      onClick={() => {
        
        toast({
          title: props.title,
          description: props.description,
          status: props.status,
          duration: props.duration,
          isClosable: props.closable,
        })
        navigator.clipboard.writeText(props.data)
      }
      }
    >
      {props.data}
    </Box>
  )
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
      value: null, 
      resp: null,
      error:false,
      subFailed: true
    }
  }

  handleSearch = (e) => {
    if(e.key === 'Enter'){
      axios.post("https://onclip.herokuapp.com/retrive", {
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
    if(this.state.value != "" && this.state.value != null && this.state.subFailed === false){
      console.log(`value: ${this.state.value}`)

      axios.post("https://onclip.herokuapp.com/paste", {
        data: this.state.value
      }, 
      {
        "accept": "application/json",
        "Content-type": "application/json"
      }).then((response) => {
          this.setState({
            id: response.data.id,
            subFailed: false
          })
      }).catch((error) => {
        console.log(error);
      })
    }else{
        this.setState({
          error: true,
          subFailed: true
        })
      }
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
             errorBorderColor="red.300"
             isInvalid={this.state.error}
             size="lg"
             height="200px"
             
             onChange={(e) => {
               if(e.target.value !==""){
                 this.setState({
                   value: e.target.value,
                   error: false,
                   subFailed: false
                  })

                }else if(e.target.value !=="" && this.state.error === true){
                 this.setState({error:false,
                subFailed: false})
               }else{
                 this.setState({
                   error:true,
                   subFailed: true
                 })
               }
              }}
             />
          <Tooltip label="click to submit" placement="bottom">
                <Toast
              variant="solid"
              colorScheme="white"
              bg="#56A6DC"
              width='100%'
              marginTop="15px"
              submit={this.handleSubmit}
              title={(!this.state.subFailed)? "Created Successfully": "Invalid input"}
              description={(!this.state.subFailed)? "clipboard created successfully": "clipboard should not be empty"}
              status={(!this.state.subFailed)? "success": "error"}
              duration={1500}
              closable={true}
              text="Save to Clipboard"

          >
           
          </Toast>
          </Tooltip>
          
            {(this.state.id !== null) ? <Tooltip shouldWrapChildren label="click to copy" placement="bottom">
            Your Retrive ID: <ToastBox
            data={this.state.id}
            title='Copied to Clipboard.' 
            description="Retrive ID copied to Clipboard." 
            status='success'
            duration={1500}
            closable={true}
            mt="10px"
            fontWeight='semibold'
         /> </Tooltip>: <div></div>}
          
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
          {(this.state.resp !== null) ? <>
            <Tooltip label="click to copy" shouldWrapChildren placement="auto">
            <ToastBox 
              mt="10px" 
              bw="1px" 
              br="lg" 
              width="100%"
              minH="100px" 
              display="flex" 
              pt="20px" 
              pl="10px"
              data={this.state.resp} 
              title='Copied to Clipboard.' 
              description="Text copied to you clipboard." 
              status='success'
              duration={1500}
              closable={true}
            />
            </Tooltip>
          </>: <div></div>}
        </Container>
      </div>
    );
  }
}

export default App;
