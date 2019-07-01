import React from "react";
import {Route } from "react-router-dom";
import "./App.css";
import FormInscription from "./components/FormInscription";
import LoginForm from "./components/LoginForm";
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
      <Route path="/" render ={()=> <Navbar />} />
      <div className="container">
      <Route path="/LoginForm" render={() => <LoginForm />} />
      <Route path="/FormInscription" render={() => <FormInscription />} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
