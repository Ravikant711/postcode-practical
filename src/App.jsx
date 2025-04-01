import ColorCodedCollection from "./Components/ColorCodedCollection"
import PostCodeInput from "./Components/PostCodeInput"
import ContentServices from "./Components/ContentServices";
import { content, service } from "./Constants/ContentSeviceConstant";

function App() {
 
  return (
    <div className="full-container">
      <div className="heading-title">
        <h1>Find out your rubbish <br/>collection day</h1>
        <p>Check when your rubbish collected</p>
        <div className="postcode__content">
          <div className="flex__left">
            <PostCodeInput/>
            <ColorCodedCollection/>
          </div>
          <div className="flex__right">
            <ContentServices title={content.title} list={content.contents}/>
            <ContentServices title={service.title} list={service.services}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
