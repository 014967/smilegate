import '../App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { useLocation, useHistory, withRouter } from 'react-router-dom'
import Header from '../components/Header.js'
import MainPage from '../pages/MainPage'
import ManagerPage from '../pages/ManagerPage'
import Editor from '../components/BoardEditor'
import TopBackground from '../components/TopBackground'
import Board from '../components/Board'
import Footer from '../components/Footer'
import TableBoard from '../components/TableBoard'
import DirectBoard from '../components/DirectBoard'
import Edit from '../components/Edit'

const HeadSkin = styled.div`
  background-color: #f5eded;
  position: relative;
  height: 4000px;
  z-index: 1;
`

const App = () => {
  return (
    <HeadSkin>
      <Router>
        <TopBackground
          url={
            'https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/w-qjCHPZbeXCQ-unsplash.jpg'
          }
        />

        <Header />
        <MainPage />

        <Route exact path="/category/:id" component={Board} />
        <Route exact path="/board/:id" component={DirectBoard} />
        <Route exact path="/blog"></Route>
        <Route exact path="/diray"></Route>
        <Route exact path="/etc"></Route>
        <Route exact path="/information" component={ManagerPage}></Route>
        <Route exact path="/Editor" component={Editor}></Route>
        <Route exact path="/Edit/:id" component={Edit}></Route>
      </Router>
    </HeadSkin>
  )
}
//<Route exact path="/" component={TableBoard} />
//<Route exact path="/" component ={ MainPage }></Route>

export default App
