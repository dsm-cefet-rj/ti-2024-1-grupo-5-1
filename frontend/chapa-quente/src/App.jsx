import React, { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Router from './components/Router'

import "./App.css"

const App = () => {
    return (
        <>
            <Header />
            <Router/>
            <Footer />
        </>
    )
}

export default App;