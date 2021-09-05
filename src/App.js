import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Product from './Components/Product';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <nav>
        <Navbar />
      </nav>
      <main>
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={Product} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} /> 
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default App;
