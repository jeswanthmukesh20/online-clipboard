import {
    Button,
    Tooltip,
    Container,
    Center,
    Textarea,
    HStack,
    MenuDivider,
    FormLabel,
    Stack,
    Select,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Switch
} from '@chakra-ui/react';
import {ChevronDownIcon, TimeIcon} from "@chakra-ui/icons";
import CodeEditor from '@uiw/react-textarea-code-editor';
import languages from "./languages.json";
import ToastBox from "./ToastBox";
import styles from "./SyntaxTheme";

const DSelect = (props) => {
    return (
        <Select variant='filled' isDisabled={!props.state.switch} isRequired placeholder='Language' onChange={(e) => {
            (props.type === "lang") ? props.setState({
             language: e.target.value
            }) : props.setState({
                theme: e.target.value
            })
        }} maxW={150} >
            {
                (props.type === "lang") ? languages.map(lang => {
                    return (<option value={lang}>{lang}</option>)
                }) : Object.keys(styles).map(theme => {
                      return (<option value={theme}>{theme}</option>)
                })
            }

        </Select>
    )
}

const TextContainer = (props) => {
    return (
        <Container
          maxW={props.breakpoints.TextContainer}
          maxH={props.breakpoints.TextContainer}
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
            <FormLabel htmlFor="syntax">Syntax Highlighting: {<Switch ml={2} id="syntax" isChecked={props.state.switch}
                                                                        onChange={() => props.setState({switch: !props.state.switch})}/>}  </FormLabel>

            <HStack spacing={5}>
                <DSelect {...props} type={"theme"}/>
                <DSelect {...props} type={"lang"} />
            </HStack>
          </Stack>
            {(!props.state.switch) ? <Textarea
                    mt={3}
                    placeholder="Paste your text here"
                    colorScheme="white"
                    color="black"
                    errorBorderColor="red.300"
                    isInvalid={props.state.error}
                    size="lg"
                    height="200px"
                    onChange={(e) => {
                        if (e.target.value !== "") {
                            props.setState({
                                value: e.target.value,
                                error: false,
                                subFailed: false
                            })
                        } else if (e.target.value !== "" && props.error === true) {
                            props.setState({
                                error: false,
                                value: e.target.value,
                                subFailed: false
                            })
                        } else {
                            props.setState({
                                error: true,
                                value: e.target.value,
                                subFailed: true
                            })
                        }
                    }}

                />:
                <CodeEditor
                    className="w-tc-editor-var"
                    value={props.state.value}
                    language={props.state.language}
                    padding={15}
                    placeholder="Paste your code here."
                    onChange={(e) => {
                        if (e.target.value !== "") {
                            props.setState({
                                value: e.target.value,
                                error: false,
                                subFailed: false
                            })
                        } else if (e.target.value !== "" && props.state.error === true) {
                            props.setState({
                                error: false,
                                value: e.target.value,
                                subFailed: false
                            })
                        } else {
                            props.setState({
                                error: true,
                                value: e.target.value,
                                subFailed: true
                            })
                        }
                    }}
                    style={{
                        fontSize: 14,
                        fontWeight: 400,
                        backgroundColor: "rgb(45, 45, 45)",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        borderRadius: "5px",
                        minHeight: "200px",
                    }
                    }
                />}

            <Stack marginTop="15px" display='flex'  alignItems='center' direction={{
                base: "column",
                sm: "row"
            }}>
            <Menu marginTop="15px" >
              <MenuButton
                  width={[ "100%","40%"]}
                as={Button}
                variant="solid"
                colorScheme="white"
                bg="teal.400"
                alighItems={"center"}
              >
                  <Center>{<TimeIcon ml={2} mr={2}/>}{(props.state.txt === "Expire in") ? props.state.txt : `Expire in ${props.state.txt}`} {<ChevronDownIcon mr={2}/>}</Center>
              </MenuButton>
              <MenuList>
                  <MenuItem onClick={() => props.setState({txt: "15 minutes", expire: 15*60, subFailed: false, error: false})}>15 minutes</MenuItem>
                  <MenuItem onClick={() => props.setState({txt: "1 Hour", expire: 15*60*60, subFailed: false, error: false})}>1 hour</MenuItem>
                  <MenuItem onClick={() => props.setState({txt: "1 Day", expire: 15*60*60*24, subFailed: false, error: false})}>1 day</MenuItem>
                  <MenuDivider/>
                  <MenuItem onClick={() => props.setState({txt: "1 Weeks", expire: 15*60*60*24*7, subFailed: false, error: false})}>1 week</MenuItem>
                  <MenuItem onClick={() => props.setState({txt: "2 Weeks", expire: 15*60*60*24*14, subFailed: false, error: false})}>2 weeks</MenuItem>
                  <MenuItem onClick={() => props.setState({txt: "1 Month", expire: 15*60*60*24*30, subFailed: false, error: false})}>1 month</MenuItem>
              </MenuList>
            </Menu>
                <Tooltip label="click to submit" placement="bottom">
                    <Button
                        variant="solid"
                        colorScheme="white"
                        bg="submit.light"
                        width={["100%","60%"]}
                        marginTop="15px"
                        onClick={props.handleSubmit}
                        loadingText={"Coping..."}
                        isLoading={props.state.loading}
                    >
                        Save to CopyTxT
                    </Button>
                </Tooltip>
        </Stack>

            {(props.state.id !== null) ? <><Tooltip shouldWrapChildren label="click to copy" placement="bottom">
            Your Retrive ID: <ToastBox
            data={props.state.id}
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
    )
}

export default TextContainer;
