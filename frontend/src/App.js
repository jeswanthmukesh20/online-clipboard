import React, { Component } from 'react';
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
  SkeletonText,
  Switch,
  FormLabel,
  Stack,
  Select
} from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as theme from 'react-syntax-highlighter/dist/esm/styles/prism';

import SidebarWithHeader from './components/Sidebar'
import Navbar from './components/Navbar.js';
import { Search2Icon, CopyIcon } from "@chakra-ui/icons";
const axios = require("axios");
import {Helmet} from "react-helmet";
import favicon from "./favicon.png";
const breakpoints = {
  base: "90%",
  sm: '90%',
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
      theme: undefined
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
    if(this.state.value != "" && this.state.value != null && this.state.subFailed === false){
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
        // "https://onclip.herokuapp.com/paste"
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
          error: true,
          subFailed: true
        })
      }
  }
  render() {
    return (
      <div className="App">
        
        {/* <Navbar />
         */}
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
         
        <Container
          maxW={breakpoints}
          maxH={breakpoints}
          boxShadow='2xl'
          bg="container.light" style={{
            marginTop: "60px",
            borderRadius: "10px",
            padding: "20px",
          }}>
          <Stack display='flex' spacing={2} alignItems='center' justifyContent="flex-end" direction="row" mb="10px">
            <><FormLabel htmlFor="syntax">Syntax Highlighting: </FormLabel>
          <Switch id="syntax" isChecked={this.state.switch} onChange={()=> this.setState({switch: !this.state.switch})}/>  </>
          
          <Select variant='filled' isDisabled={!this.state.switch} placeholder='default' maxW={150} onChange={(e) => {
            this.setState({
              theme: e.target.value
            })
            console.log(this.state.theme)
            console.log(e.target.value)
          }}>
            <option value="dark">dark</option>
            <option value="funky">funky</option>
            <option value="okaidia">okaidia</option>
            <option value="solarizedlight">solarizedlight</option>
            <option value="tomorrow">tomorrow</option>
            <option value="twilight">twilight</option>
            <option value="prism">prism</option>
            <option value="a11yDark">a11yDark</option>
            <option value="atomDark">atomDark</option>
            <option value="base16AteliersulphurpoolLight">base16AteliersulphurpoolLight</option>
            <option value="cb">cb</option>
            <option value="coldarkCold">coldarkCold</option>
            <option value="coldarkDark">coldarkDark</option>
            <option value="coyWithoutShadows">coyWithoutShadows</option>
            <option value="darcula">darcula</option>
            <option value="duotoneDark">duotoneDark</option>
            <option value="duotoneEarth">duotoneEarth</option>
            <option value="duotoneForest">duotoneForest</option>
            <option value="duotoneLight">duotoneLight</option>
            <option value="duotoneSea">duotoneSea</option>
            <option value="duotoneSpace">duotoneSpace</option>
            <option value="ghcolors">ghcolors</option>
            <option value="gruvboxDark">gruvboxDark</option>
            <option value="gruvboxLight">gruvboxLight</option>
            <option value="holiTheme">holiTheme</option>
            <option value="hopscotch">hopscotch</option>
            <option value="lucario">lucario</option>
            <option value="materialDark">materialDark</option>
            <option value="materialLight">materialLight</option>
            <option value="materialOceanic">materialOceanic</option>
            <option value="nightOwl">nightOwl</option>
            <option value="nord">nord</option>
            <option value="oneDark">oneDark</option>
            <option value="oneLight">oneLight</option>
            <option value="pojoaque">pojoaque</option>
            <option value="shadesOfPurple">shadesOfPurple</option>
            <option value="solarizedDarkAtom">solarizedDarkAtom</option>
            <option value="synthwave84">synthwave84</option>
            <option value="vs">vs</option>
            <option value="vscDarkPlus">vscDarkPlus</option>
            <option value="xonokai">xonokai</option>
            <option value="zTouch">zTouch</option>   
          </Select>
          <Select variant='filled' isDisabled={!this.state.switch} isRequired placeholder='Language' onChange={(e) => {
            this.setState({
              language: e.target.value
            })
          }} maxW={150} >
            <option value="1c">1c</option>
            <option value="abnf">abnf</option>
            <option value="accesslog">accesslog</option>
            <option value="actionscript">actionscript</option>
            <option value="ada">ada</option>
            <option value="angelscript">angelscript</option>
            <option value="apache">apache</option>
            <option value="applescript">applescript</option>
            <option value="arcade">arcade</option>
            <option value="arduino">arduino</option>
            <option value="armasm">armasm</option>
            <option value="asciidoc">asciidoc</option>
            <option value="aspectj">aspectj</option>
            <option value="autohotkey">autohotkey</option>
            <option value="autoit">autoit</option>
            <option value="avrasm">avrasm</option>
            <option value="awk">awk</option>
            <option value="axapta">axapta</option>
            <option value="bash">bash</option>
            <option value="basic">basic</option>
            <option value="bnf">bnf</option>
            <option value="brainfuck">brainfuck</option>
            <option value="c-like">c-like</option><option value="c">c</option>
            <option value="cal">cal</option>
            <option value="capnproto">capnproto</option>
            <option value="ceylon">ceylon</option>
            <option value="clean">clean</option>
            <option value="clojure-repl">clojure-repl</option>
            <option value="clojure">clojure</option>
            <option value="cmake">cmake</option>
            <option value="coffeescript">coffeescript</option>
            <option value="coq">coq</option>
            <option value="cos">cos</option>
            <option value="cpp">cpp</option>
            <option value="crmsh">crmsh</option>
            <option value="crystal">crystal</option>
            <option value="csharp">csharp</option>
            <option value="csp">csp</option>
            <option value="css">css</option>
            <option value="d">d</option>
            <option value="dart">dart</option><option value="delphi">delphi</option><option value="diff">diff</option><option value="django">django</option><option value="dns">dns</option><option value="dockerfile">dockerfile</option><option value="dos">dos</option><option value="dsconfig">dsconfig</option><option value="dts">dts</option><option value="dust">dust</option><option value="ebnf">ebnf</option><option value="elixir">elixir</option><option value="elm">elm</option><option value="erb">erb</option><option value="erlang-repl">erlang-repl</option><option value="erlang">erlang</option><option value="excel">excel</option><option value="fix">fix</option><option value="flix">flix</option><option value="fortran">fortran</option><option value="fsharp">fsharp</option><option value="gams">gams</option><option value="gauss">gauss</option><option value="gcode">gcode</option><option value="gherkin">gherkin</option><option value="glsl">glsl</option><option value="gml">gml</option><option value="go">go</option><option value="golo">golo</option><option value="gradle">gradle</option><option value="groovy">groovy</option><option value="haml">haml</option><option value="handlebars">handlebars</option><option value="haskell">haskell</option><option value="haxe">haxe</option><option value="hsp">hsp</option><option value="htmlbars">htmlbars</option><option value="http">http</option><option value="hy">hy</option><option value="inform7">inform7</option><option value="ini">ini</option><option value="irpf90">irpf90</option><option value="isbl">isbl</option><option value="java">java</option><option value="javascript">javascript</option><option value="jboss-cli">jboss-cli</option><option value="json">json</option><option value="jsx">jsx</option><option value="julia-repl">julia-repl</option><option value="julia">julia</option><option value="kotlin">kotlin</option><option value="lasso">lasso</option><option value="latex">latex</option><option value="ldif">ldif</option><option value="leaf">leaf</option><option value="less">less</option><option value="lisp">lisp</option><option value="livecodeserver">livecodeserver</option><option value="livescript">livescript</option><option value="llvm">llvm</option><option value="lsl">lsl</option><option value="lua">lua</option><option value="makefile">makefile</option><option value="markdown">markdown</option><option value="mathematica">mathematica</option><option value="matlab">matlab</option><option value="maxima">maxima</option><option value="mel">mel</option><option value="mercury">mercury</option><option value="mipsasm">mipsasm</option><option value="mizar">mizar</option><option value="mojolicious">mojolicious</option><option value="monkey">monkey</option><option value="moonscript">moonscript</option><option value="n1ql">n1ql</option><option value="nginx">nginx</option><option value="nim">nim</option><option value="nix">nix</option><option value="node-repl">node-repl</option><option value="nsis">nsis</option><option value="objectivec">objectivec</option><option value="ocaml">ocaml</option><option value="openscad">openscad</option><option value="oxygene">oxygene</option><option value="parser3">parser3</option><option value="perl">perl</option><option value="pf">pf</option><option value="pgsql">pgsql</option><option value="php-template">php-template</option><option value="php">php</option><option value="plaintext">plaintext</option><option value="pony">pony</option><option value="powershell">powershell</option><option value="processing">processing</option><option value="profile">profile</option><option value="prolog">prolog</option><option value="properties">properties</option><option value="protobuf">protobuf</option><option value="puppet">puppet</option><option value="purebasic">purebasic</option><option value="python-repl">python-repl</option><option value="python">python</option><option value="q">q</option><option value="qml">qml</option><option value="r">r</option><option value="reasonml">reasonml</option><option value="rib">rib</option><option value="roboconf">roboconf</option><option value="routeros">routeros</option><option value="rsl">rsl</option><option value="ruby">ruby</option><option value="ruleslanguage">ruleslanguage</option><option value="rust">rust</option><option value="sas">sas</option><option value="scala">scala</option><option value="scheme">scheme</option><option value="scilab">scilab</option><option value="scss">scss</option><option value="shell">shell</option><option value="smali">smali</option><option value="smalltalk">smalltalk</option><option value="sml">sml</option><option value="sqf">sqf</option><option value="sql">sql</option><option value="sql_more">sql_more</option><option value="stan">stan</option><option value="stata">stata</option><option value="step21">step21</option><option value="stylus">stylus</option><option value="subunit">subunit</option><option value="swift">swift</option><option value="taggerscript">taggerscript</option><option value="tap">tap</option><option value="tcl">tcl</option><option value="thrift">thrift</option><option value="tp">tp</option><option value="twig">twig</option><option value="typescript">typescript</option><option value="vala">vala</option><option value="vbnet">vbnet</option><option value="vbscript-html">vbscript-html</option><option value="vbscript">vbscript</option><option value="verilog">verilog</option><option value="vhdl">vhdl</option><option value="vim">vim</option><option value="x86asm">x86asm</option><option value="xl">xl</option><option value="xml">xml</option><option value="xquery">xquery</option><option value="yaml">yaml</option><option value="zephir">zephir</option>
          </Select>
          </Stack>
          {this.state.switch ? <SyntaxHighlighter language={this.state.language} style={styles[this.state.theme]}>
            {this.state.value}
          </SyntaxHighlighter>: <></>}
          
          <Textarea
              mt={5}
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
                  value: e.target.value,
                subFailed: false})
               }else{
                 this.setState({
                   error:true,
                   value: e.target.value,
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
            textarea={false}
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
