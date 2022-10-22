import {Helmet} from "react-helmet";
import favicon from "../Assets/brand/favicon.png";


const Seo = () => {
    return (
      <>
      <Helmet>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9325183895885388"
     crossorigin="anonymous"></script>
            <title>CopyTxt Online - The Online Clipboard - Copy your text online and share it with anyone</title>
            <meta name="description" content="Copytxt.online is a free online clipboard. You can save your text to the cloud and retrive it from any device. "/>
            <meta name="keywords" content='online clipboard, copy text online, share text online, store txt online, share text in cloud, copy online, copy paste online, save online, share links online, save links online'/>
            <meta name="author" content="Copytxt.online"/>
            <meta name="robots" content="index, follow"/>
            <link rel="icon" type="image/png" href={favicon}/>
            <meta name="language" content="English"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="theme-color" content="#56a6dc"/>
            <meta name="msapplication-TileColor" content="#56a6dc"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>

          </Helmet>
      </>
    )
  }

export default Seo;
