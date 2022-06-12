import React, { Component } from 'react';
import {
    Button,
    Tooltip,
    Container,
    Center,
    useToast,
    Textarea,
    Input,
    InputRightElement,
    InputGroup,
    Box,
    HStack,
    MenuDivider,
    SkeletonText,
    Switch,
    FormLabel,
    Stack,
    Select,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as theme from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from './components/Navbar.js';
import { Search2Icon, CopyIcon, ChevronDownIcon, TimeIcon } from "@chakra-ui/icons";
import languages from "./languages.json";
const axios = require("axios");
import {Helmet} from "react-helmet";
import favicon from "./favicon.png";
import CodeEditor from '@uiw/react-textarea-code-editor';

const breakpoints = {
  base: "90%",
  sm: '95%',
  md: '80%',
  lg: '70%',
  xl: '70%',
  '2xl': '70%',
}

const styles = {
  "dark": theme.dark,
  "funky": theme.funky,
  "okaidia": theme.okaidia,
  "solarizedlight": theme.solarizedlight,
  "tomorrow": theme.tomorrow,
  "twilight": theme.twilight,
  "prism": theme.prism,
  "a11yDark": theme.a11yDark,
  "atomDark": theme.atomDark,
  "base16AteliersulphurpoolLight": theme.base16AteliersulphurpoolLight,
  "cb": theme.cb,
  "coldarkCold": theme.coldarkCold,
  "coldarkDark": theme.coldarkDark,
  "coyWithoutShadows": theme.coyWithoutShadows,
  "darcula": theme.darcula,
  "dracula": theme.dracula,
  "duotoneDark": theme.duotoneDark,
  "duotoneEarth": theme.duotoneEarth,
  "duotoneForest": theme.duotoneForest,
  "duotoneLight": theme.duotoneLight,
  "duotoneSea": theme.duotoneSea,
  "duotoneSpace": theme.duotoneSpace,
  "ghcolors": theme.ghcolors,
  "gruvboxDark": theme.gruvboxDark,
  "gruvboxLight": theme.gruvboxLight,
  "holiTheme": theme.holiTheme,
  "hopscotch": theme.hopscotch,
  "lucario": theme.lucario,
  "materialDark": theme.materialDark,
  "materialLight": theme.materialLight,
  "materialOceanic": theme.materialOceanic,
  "nightOwl": theme.nightOwl,
  "nord": theme.nord,
  "oneDark": theme.oneDark,
  "oneLight": theme.oneLight,
  "pojoaque": theme.pojoaque,
  "shadesOfPurple": theme.shadesOfPurple,
  "solarizedDarkAtom": theme.solarizedDarkAtom,
  "synthwave84": theme.synthwave84,
  "vs": theme.vs,
  "vscDarkPlus": theme.vscDarkPlus,
  "xonokai": theme.xonokai,
  "zTouch": theme.zTouch
}

function ToastBox(props){
  const toast = useToast()


  return (
    (!props.isCode) ? <Box
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
      style={ (props.isCode) ? {
        display:"flex",
        alignItems: "center",
        justifyContent:"center"
      } : {}}
      onClick={ () => {

        toast({
          title: props.title,
          description: props.description,
          status: props.status,
          duration: props.duration,
          isClosable: props.closable,
        })
        navigator.clipboard.writeText(!props.textarea ? props.data : props.data.data )
      }
    }

    >
      {(!props.textarea) ? props.data : <Textarea style={{
        color: "black"
      }} variant="filled" isReadOnly resize={"none"} value={props.data.data} />}

    </Box> : <SyntaxHighlighter onClick={() => {
        toast({
          title: props.title,
          description: props.description,
          status: props.status,
          duration: props.duration,
          isClosable: props.closable,
        })
        navigator.clipboard.writeText(props.data.data )
      }}
      language={props.data.meta.language}
      style={{...styles[props.data.meta.theme]}}>
        {props.data.data}
    </SyntaxHighlighter>
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
        started: null,
        switch: false,
        code: "",
        language: "",
        theme: undefined,
        isOpen: false,
        txt: "Expire in",
        expire: 0
    }
  }

  handleSearch = (e) => {
    if(e.key === 'Enter'){
      this.setState({
        started: true
      })
      // https://onclip.herokuapp.com/retrive
      axios.post("https://online-clipboard.herokuapp.com/retrive", {
        retrive_id: e.target.value
      },{
        "accept": "application/json",
        "Content-type": "application/json"
      }).then(res => {
        console.log(this.state.resp, 'response')
        if(res.data.msg === "success"){
          this.setState({
            resp: res.data,
            started: false
          })
          console.log('success')

        }else{
          this.setState({
            resp: null,
            started: false
          })
        }

      }).catch(error => {
        console.log(error, "error")
        this.setState({started: false, resp: null})
      })
    }
  }

  handleSubmit = (e) => {
    if(this.state.value !== "" && this.state.value != null && this.state.subFailed === false && this.state.expire !== 0){
      this.setState({loading: true})
      let data = {
          data: this.state.value,
          meta: {
            isCode: this.state.switch,
            language: this.state.language,
            theme: this.state.theme !== undefined ? this.state.theme : ""
        }
      }
        console.log(data)
      axios.post("https://online-clipboard.herokuapp.com/paste", data,
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
            error: (this.state.expire !== 0),
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
        </Helmet>

        <Container
          maxW={breakpoints}
          maxH={breakpoints}
          boxShadow='2xl'
          bg="container.light" style={{
            marginTop: "60px",
            borderRadius: "10px",
            padding: "20px",
          }}>
          <Stack display='flex' spacing={2} alignItems='center' justifyContent="flex-end" direction={{
                base: "column",
                sm: "row"
              }} mb="10px"
          >
            <FormLabel htmlFor="syntax">Syntax Highlighting: {<Switch ml={2} id="syntax" isChecked={this.state.switch}
                                                                        onChange={() => this.setState({switch: !this.state.switch})}/>}  </FormLabel>

            <HStack spacing={5}>
              {/*<Select variant='filled' isDisabled={!this.state.switch} colorScheme={"gray.700"} placeholder='default' maxW={150} onChange={(e) => {*/}
              {/*  this.setState({*/}
              {/*    theme: e.target.value*/}
              {/*  })*/}
              {/*  console.log(this.state.theme)*/}
              {/*  console.log(e.target.value)*/}
              {/*}}>*/}
              {/*  {*/}
              {/*    Object.keys(styles).map(theme => {*/}
              {/*    return (<option value={theme}>{theme}</option>)*/}
              {/*  })}*/}
              {/*</Select>*/}
              <Select variant='filled' isDisabled={!this.state.switch} isRequired placeholder='Language' onChange={(e) => {
                this.setState({
                  language: e.target.value
                })
              }} maxW={150} >
                {
                  languages.map(lang => {
                    return (<option value={lang}>{lang}</option>)
                  })
                }

              </Select>
            </HStack>
          </Stack>
          {/*{this.state.switch ? <SyntaxHighlighter language={this.state.language} style={styles[this.state.theme]}>*/}
          {/*  {this.state.value}*/}
          {/*</SyntaxHighlighter>: <></>}*/}

            {(!this.state.switch) ? <Textarea
                    mt={3}
                    placeholder="Paste your text here"
                    colorScheme="white"
                    color="black"
                    errorBorderColor="red.300"
                    isInvalid={this.state.error}
                    size="lg"
                    height="200px"
                    onChange={(e) => {
                        if (e.target.value !== "") {
                            this.setState({
                                value: e.target.value,
                                error: false,
                                subFailed: false
                            })
                        } else if (e.target.value !== "" && this.state.error === true) {
                            this.setState({
                                error: false,
                                value: e.target.value,
                                subFailed: false
                            })
                        } else {
                            this.setState({
                                error: true,
                                value: e.target.value,
                                subFailed: true
                            })
                        }
                    }}

                />:
                <CodeEditor
                    className="w-tc-editor-var"
                    value={this.state.value}
                    language={this.state.language}
                    padding={15}
                    placeholder="Paste your code here."
                    onChange={(e) => {
                        if (e.target.value !== "") {
                            this.setState({
                                value: e.target.value,
                                error: false,
                                subFailed: false
                            })
                        } else if (e.target.value !== "" && this.state.error === true) {
                            this.setState({
                                error: false,
                                value: e.target.value,
                                subFailed: false
                            })
                        } else {
                            this.setState({
                                error: true,
                                value: e.target.value,
                                subFailed: true
                            })
                        }
                    }}
                    // padding={15}
                    style={{
                        fontSize: 14,
                        fontWeight: 400,
                        backgroundColor: "rgb(45, 45, 45)",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        borderRadius: "5px",
                        minHeight: "200px",
                        // overflowY: "scroll",
                        // overflow: "scroll",
                        // resize: "none"
                    }
                    }
                    // style={styles[this.state.theme]}
                />}
          {/* <Tooltip label="click to submit" placement="bottom"> */}
            <Stack marginTop="15px" display='flex'  alignItems='center' direction={{
                base: "column",
                sm: "row"
            }}>
            <Menu marginTop="15px" >
              <MenuButton
                  // maxW={{
                  //     base: '45%',
                  //     sm: "100%"
                  // }}
                  width={[ "100%","40%"]}
                as={Button}
                // rightIcon={}

                variant="solid"
                colorScheme="white"
                bg="teal.400"

                alighItems={"center"}

              >
                  <Center>{<TimeIcon ml={2} mr={2}/>}{(this.state.txt === "Expire in") ? this.state.txt : `Expire in ${this.state.txt}`} {<ChevronDownIcon mr={2}/>}</Center>

              </MenuButton>
              <MenuList>
                  <MenuItem onClick={() => this.setState({txt: "15 minutes", expire: 15*60, subFailed: false, error: false})}>15 minutes</MenuItem>
                  <MenuItem onClick={() => this.setState({txt: "1 Hour", expire: 15*60*60, subFailed: false, error: false})}>1 hour</MenuItem>
                  <MenuItem onClick={() => this.setState({txt: "1 Day", expire: 15*60*60*24, subFailed: false, error: false})}>1 day</MenuItem>
                  <MenuDivider/>
                  <MenuItem onClick={() => this.setState({txt: "1 Weeks", expire: 15*60*60*24*7, subFailed: false, error: false})}>1 week</MenuItem>
                  <MenuItem onClick={() => this.setState({txt: "2 Weeks", expire: 15*60*60*24*14, subFailed: false, error: false})}>2 weeks</MenuItem>
                  <MenuItem onClick={() => this.setState({txt: "1 Month", expire: 15*60*60*24*30, subFailed: false, error: false})}>1 month</MenuItem>
              </MenuList>
            </Menu>
            <Button
                variant="solid"
                colorScheme="white"
                bg="submit.light"
                width={["100%","60%"]}
                marginTop="15px"
                onClick={this.handleSubmit}
                loadingText={"Coping..."}
                isLoading={this.state.loading}
            >
                Save to CopyTxT
            </Button>
        </Stack>

            {(this.state.id !== null) ? <><Tooltip shouldWrapChildren label="click to copy" placement="bottom">
            Your Retrive ID: <ToastBox
            data={this.state.id}
            title='Copied to Clipboard.'
            description="Retrive ID copied to Clipboard."
            status='success'
            duration={1500}
            closable={true}
            textarea={false}
            mt="10px"
            fontWeight='semibold'
         /> </Tooltip>
         </>: <div></div>}
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
              isCode={(this.state.resp.meta.isCode !== undefined) ? this.state.resp.meta.isCode : false}
            />
            </Tooltip>
          </>: <div></div>}
        </Container>
      </div>
    );
  }
}

export default App;
