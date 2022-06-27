import React, { Component } from 'react';
import * as theme from 'react-syntax-highlighter/dist/esm/styles/prism';

const axios = require("axios");
import Seo from './Seo'
import RetriveContainer from './components/RetriveContainer'
import TextContainer from './components/TextContainer'
import Breakpoint from './components/Breakpoints'

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
    this.update = this.update.bind(this)
  }
  update = (setstate) => {
      this.setState(setstate)
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
    return (
      <div className="App">
          <Seo/>
          <TextContainer
              setState={this.update}
              breakpoints={Breakpoint}
              state={this.state}
              handleSubmit={this.handleSubmit}
          />
          <RetriveContainer
              breakpoints={Breakpoint}
              state={this.state}
              handleSearch={this.handleSearch}
          />
      </div>
    );
  }
}

export default App;
