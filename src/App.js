import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import login from './page/login';
import gallery from './page/gallery';
import myWishList from './page/myWishList';

class App extends Component {
  render() {
    return (
      <div>
        
        <Router>
          <Switch>
            <Route path="/" exact component= {login} />
            <Route path="/gallery" exact component={gallery} />
            <Route path="/myWishList" exact component={myWishList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;