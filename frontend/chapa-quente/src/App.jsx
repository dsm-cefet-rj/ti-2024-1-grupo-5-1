import React, { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Router from './components/Router'

import "./App.css"
import Agendamento from './components/Agendamento';

const App = () => {
    return (
        <>
            <Header />
            <Router/>
            <Agendamento />
            <Footer />

        </>
    )
}

export default App;