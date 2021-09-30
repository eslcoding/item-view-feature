import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
import userService from './services/userService'
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"
import Button from "monday-ui-react-core/dist/Button.js"
import MenuButton from "monday-ui-react-core/dist/MenuButton.js"
const img = require('./assets/img/esl-logo.jpg')
const monday = mondaySdk();

class App extends React.Component {


  // Default state
  state = {
    settings: {},
    name: "",
    color: 'primary',
    isShowTxt: false,
    isUserExist: true

  };

  navToStore(){
    window.open('https://appsource.microsoft.com/en-us/product/office/WA200002596?tab=Overview')
  }

  setItemToStart = async () => {
    if (!this.state.isUserExist || this.state.color==='positive') return
    try {


      const { data: { boardId, itemId } } = await monday.get('context')
      // var { data: { boardIds, itemIds } } = await monday.get('context')
      // const [boardId, itemId] = [boardIds[0], itemIds[0]]
      const query = `query {
      boards (ids: ${boardId}) {
        name
        groups {
          id
          items{
            id
            name
          }
        }
      }
      me { 
        name
        email
      }
      
    }`
      const res = await monday.api(query)
      const { me: { email } } = res.data
      const userTest = await userService.isUserExist(email)
      if (!userTest) {
        this.setState({ isUserExist: false,  color:'negative'})
        return
      }
      console.log('setItemToStart= -> userTest', userTest)
      const { groups } = res.data.boards[0]

      // const groupId = groups.find(group => group.items.some(item => +item.id === itemId)).id
      const groupId = groups.find(group => group.items.some(item => +item.id === itemId)).id

      // userService.setStartItem(email, boardId, groupId, itemId)
      await userService.setStartItem('anistav1@outlook.com', boardId, groupId, itemId)
      this.setState({ ...this.state, color: 'positive', isShowTxt: !this.state.isShowTxt })

    } catch (err) {
      console.log('err check if user exist: ', err);

    }


  }


  componentDidMount() {
    // TODO: set up event listeners
  }

  render() {
    return <div className="App">
      <section className="app-link">
        <h3>ESL's monday.com for outlook</h3>
        <Button color={this.state.color} className="success" onClick={this.setItemToStart}>Work on this item from Outlook</Button>
        {this.state.isShowTxt && <div><p>Job done! This item has been set as your last state</p><p>Please click the "Home" button to view it</p></div>}
        {!this.state.isUserExist && <div>
          <p>We're sorry, but it seems like you are not registerd in ESl's monday.com for outlook</p>
          <p>Please click the <span onClick={this.navToStore}>here</span> to sign in</p>
        </div>}
      </section>
    </div>;
  }
}

export default App;
