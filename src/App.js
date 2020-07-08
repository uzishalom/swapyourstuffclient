import React from 'react';
import { Switch, Route } from "react-router-dom"
import './App.css';

import Navbar from "./components/main-single-page/navbar";
import Footer from "./components/main-single-page/footer";
import About from "./components/data/about"
import Signup from "./components/auth/signup"
import Signin from "./components/auth/signin"

function App() {
  return (
    <React.Fragment>

      <header>
        <Navbar />
      </header>

      <main style={{ minHeight: '900px' }}>
        <Switch>
          <Route path="/" exact component={About} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact componenet={Signin} />
          <Route path="/about" exact component={About} />
        </Switch>
      </main>

      <footer>
        <Footer />

      </footer>

    </React.Fragment>

  );
}

export default App;
