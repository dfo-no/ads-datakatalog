import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Entitet } from './Entitet/Entitet';
import { Søk } from './Søk/Søk';
import { Term } from '../Pages/Term/Term';
import { Header } from '../Components/Header/Header';
import './App.css';
import Footer from '../Components/Footer/Footer';
import { Forside } from './Forside/Forside';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <div className="App-maincontent">
                    <Routes>
                        <Route path="/">
                            <Route index element={<Forside />} />
                            <Route path="search" element={<Søk />} />
                            <Route path="term/:id/:tittel" element={<Term />} />
                            <Route path="term/:id" element={<Term />} />
                            <Route path="entitet/:id/:tittel" element={<Entitet />} />
                            <Route path="entitet/:id" element={<Entitet />} />
                            <Route path="*" element={<h2>Siden finnes ikke</h2>} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
