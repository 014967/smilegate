import '../App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../components/Header.js'
import MainPage from '../pages/MainPage'
import ManagerPage from '../pages/ManagerPage'
const App = () => {
  return (
    <Router>
      <Header />
      <Route exact path="/" component ={ MainPage }></Route>
      <Route exact path="/blog"></Route>
      <Route exact path="/diray"></Route>
      <Route exact path="/etc"></Route>
      <Route exact path="/manager" component = { ManagerPage }></Route>
    </Router>
  )
}

export default App
