import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Entity } from './Entitet/Entity';
import { Search } from './Search/Search';
import { Term } from '../Pages/Term/Term';
import { Header } from '../Components/Header/Header';
import './App.css';
import Footer from '../Components/Footer/Footer';
import { Forside } from './Forside/Forside';
import { NotFound } from './NotFound/NotFound';

// The service is being shut down: while true, every route shows the "Siden finnes ikke" page.
const SERVICE_SHUT_DOWN = true;

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <div className="App-maincontent">
                    <Routes>
                        {SERVICE_SHUT_DOWN ? (
                            <Route path="*" element={<NotFound />} />
                        ) : (
                            <Route path="/">
                                <Route index element={<Forside />} />
                                <Route path="search" element={<Search />} />
                                <Route path="term/:id/:tittel" element={<Term />} />
                                <Route path="term/:id" element={<Term />} />
                                <Route path="entity/:id/:tittel" element={<Entity />} />
                                <Route path="entity/:id" element={<Entity />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        )}
                    </Routes>
                </div>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
