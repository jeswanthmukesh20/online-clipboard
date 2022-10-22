import React, { Component } from 'react';
const axios = require("axios");
import Seo from '../../components/Seo'
import RetriveContainer from '../../components/RetriveContainer'
import TextContainer from '../../components/TextContainer'
import Breakpoints from '../../components/Breakpoints'
import  {
    useLocation
} from "react-router-dom";




class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: null,
            value: '',
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
            expire: 0,
            path: false,
            retrive_id: 0

        }
        this.update = this.update.bind(this)
    }
    update = (setstate) => {
        this.setState(setstate)
    }
    retriveSubmit = () => {
        console.log("submited")
        this.setState({
            started: true
        })
        console.log(this.state.retrive_id)
        axios.post("https://copytxt-online.herokuapp.com/retrive", {
            retrive_id: this.state.retrive_id
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
    handleSearch = (e) => {
        if(e.key === 'Enter'){
            this.setState({
                started: true
            })
            // https://onclip.herokuapp.com/retrive
            axios.post("https://copytxt-online.herokuapp.com/retrive", {
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
    retrive = () => {
        console.log(this.state)
        // this.handleSearch({key:"Enter"})
        this.setState({
            path: false,
            id: Number(this.props.path.pathname.split("/")[1])
        })
        console.log(this.state.resp)


    }
    componentDidMount() {
        (this.props.path.pathname) ? (isNaN(Number(this.props.path.pathname.split("/")[1]))) ? this.setState({
            path: false
        }): this.retrive() : this.setState({
            path: false
        })
    }
    //
    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    //     console.log(this.state.path)
    // }
    handleChange = (e) => {
        console.log(this.state.retrive_id)
        this.setState({
            retrive_id: e.target.value
        })
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
            axios.post("https://copytxt-online.herokuapp.com/paste", data,
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
        console.log("im running here")
        return (
            <div className="App">
                <Seo/>
                {(!this.state.path) ? <> <TextContainer
                    setState={this.update}
                    breakpoints={Breakpoints}
                    state={this.state}
                    handleSubmit={this.handleSubmit}
                /> <RetriveContainer
                    breakpoints={Breakpoints}
                    state={this.state}
                    setState={this.setState}
                    handleSearch={this.handleSearch}
                    retriveSubmit={this.retriveSubmit}
                    handleChange={this.handleChange}
                /> </>: <RetriveContainer
                    breakpoints={Breakpoints}
                    state={this.state}
                    setState={this.setState}
                    handleSearch={this.handleSearch}
                    retriveSubmit={this.retriveSubmit}
                    handleChange={this.handleChange}
                />}
            </div>
        );
    }
}

const App = (Component) => {
    return (props) => {
        const location = useLocation()
        return <Component {...props} path={location}/>
    }
}

export default App(Home);
