import React, { Component, useState, useRef } from 'react';
import {
  Button,
  Tooltip,
  Container,
  Textarea,
  Input,
  InputRightElement,
  InputGroup,
  useToast,
  Box,
  Text,
  SkeletonText
} from '@chakra-ui/react';
import SidebarWithHeader from './components/Sidebar'
import Navbar from './components/Navbar.js';
import { Search2Icon, CopyIcon } from "@chakra-ui/icons";
const axios = require("axios");
import {Helmet} from "react-helmet";
import favicon from "./favicon.png"


const breakpoints = {
  base: "90%",
  sm: '90%',
  md: '80%',
  lg: '70%',
  xl: '70%',
  '2xl': '70%',
}

function CreatedToast(props){
  const toast = useToast()
  const toastIdRef = useRef()
  toastIdRef.current = toast({
    title: props.title,
    description: props.description,
    status: props.status,
    duration: props.duration,
    isClosable: props.closable,
  })
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
      isLoading={props.isLoading}
      loadingText='Sending...'
      onClick={() =>
        {
          props.submit();
          if(props.data != null && props.data != "" || props.data != undefined){
          toast({
          title: props.title,
          description: props.description,
          status: props.status,
          duration: props.duration,
          isClosable: props.closable,
        })}
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
      marginBottom={props.mb}
      ml={props.ml}
      minH={props.minH}
      display={props.display}
      paddingTop={props.pt}
      paddingLeft={props.pl}
      as="button"
      alignItems="center"
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
      {(props.textarea) ? <Textarea isReadonly={true} variant="filled" focusBorderColor="gray.300" height="200px" value={props.data}/> : props.data }
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
      subFailed: true,
      loading: false,
      started: null
    }
  }

  handleSearch = (e) => {
    if(e.key === 'Enter'){
      this.setState({
        started: true
      })
      axios.post("https://onclip.herokuapp.com/retrive", {
        retrive_id: e.target.value
      }).then(res => {
        if(res.data.msg === "success"){
          this.setState({
            resp: res.data.data,
            started: false
          })
        }else{
          this.setState({
            resp: "Invalid retrive id",
            started: false
          })
        }
        
      }).catch(error => {
        console.log(error)
        this.setState({started: false})
      })
    }
  }
  
  handleSubmit = (e) => {
    if(this.state.value != "" && this.state.value != null && this.state.subFailed === false){
      console.log(`value: ${this.state.value} loading on`)
      this.setState({loading: true})
      axios.post("https://onclip.herokuapp.com/paste", {
        data: this.state.value
      }, 
      {
        "accept": "application/json",
        "Content-type": "application/json"
      }).then((response) => {
          this.setState({
            id: response.data.id,
            subFailed: false,
            loading: false
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
        <Helmet>
          <title>CopyTxt Online - The Online Clipboard - Copy your text online and share it with anyone</title>
          <meta name="description" content="Copytxt.online is a free online clipboard. You can save your text to the cloud and retrive it from any device. "/>
          <meta name="keywords" content='online clipboard, copy text online, share text online, store txt online, share text in cloud, copy online, copy paste online, save online, share links online, save links online'/>
          <meta name="author" content="Copytxt.online"/>
          <meta name="robots" content="index, follow"/>
          <link rel="icon" type="image/png" href={favicon}/>
          {/* <meta name="revisit-after" content="1 days"/> */}
          <meta name="language" content="English"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="theme-color" content="#56a6dc"/>
          <meta name="msapplication-TileColor" content="#56a6dc"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
          {/* <link rel="icon" type="image/png" sizes="192x192" href="https://onclip.herokuapp.com/favicon/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="https://onclip.herokuapp.com/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="https://onclip.herokuapp.com/favicon/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="https://onclip.herokuapp.com/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="https://onclip.herokuapp.com/favicon/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="https://onclip.herokuapp.com/favicon/ms-icon-144x144.png"/> */}
          {/* <meta name="theme-color" content="#56a6dc"/> */}
        </Helmet>
        {/* <Navbar />
         */}
         
        <Container
        maxW={breakpoints}
        maxH={breakpoints}
        boxShadow='2xl'
         bg="container.light" style={{
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
              bg="submit.light"
              width='100%'
              marginTop="15px"
              submit={this.handleSubmit}
              title={(!this.state.subFailed)? "Created Successfully": "Invalid input"}
              description={(!this.state.subFailed)? "clipboard created successfully": "clipboard should not be empty"}
              status={(!this.state.subFailed)? "success": "error"}
              duration={1500}
              closable={true}
              text="Save to Clipboard"
              isLoading={this.state.loading}
          />
          </Tooltip>
          
            {(this.state.id !== null) ? <><Tooltip shouldWrapChildren label="click to copy" placement="bottom">
            Your Retrive ID: <ToastBox
            data={this.state.id}
            title='Copied to Clipboard.' 
            description="Retrive ID copied to Clipboard." 
            status='success'
            duration={1500}
            closable={true}
            mt="10px"
            fontWeight='semibold'
         /> </Tooltip> 
         </>: <div></div>}
          {/* {this.state.id ? <CreatedToast
          title='Created successfully.' 
          description="Text saved to clipboard successfully." 
          status='success'
          duration={1500}
          closable={true}
          textarea={true}/>: <div></div>} */}
        </Container>
        <Container
        boxShadow='2xl'
          maxW={breakpoints}
          maxH={breakpoints}
          bg="container.light" style={{
            marginTop: "60px",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <InputGroup size="lg">
            <InputRightElement
                pointerEvents='none'
                children={<Search2Icon color='gray.300' />}/>
            <Input
                placeholder="Enter your retrive ID..."
                onKeyPress={this.handleSearch}
            />
          </InputGroup>
          {(this.state.started) ? <SkeletonText mt='4' noOfLines={4} spacing='4' />: (this.state.resp !== null) ? <>
            <Tooltip label="click to copy" shouldWrapChildren placement="auto">
            <ToastBox 
              mt="10px"
              mg="30px" 
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
              textarea={true}
            />
            </Tooltip>
          </>: <div></div>}
        </Container>
      </div>
    );
  }
}

export default App;
