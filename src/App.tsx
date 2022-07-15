import React, {useState} from 'react';
import {Header} from "./components/layout/Header";
import {Map} from "./components/Map/Map";
import {SearchContext} from "./contexts/search.context";
import {Route, Routes} from "react-router-dom";
import {AddForm} from "./components/AddForm/AddForm";
import {Loading} from "./components/loading/Loading";

export const App = () => {
    const [search, setSearch] = useState('');

    return (
        <>
            <SearchContext.Provider value={{search, setSearch}}>
                <Header/>
                <Routes>
                    <Route path="/" element={<Map/>}/>
                    <Route path="/add" element={<AddForm/>}/>
                    <Route path="/loading/:id" element={<Loading/>}/>
                </Routes>
            </SearchContext.Provider>
        </>
    );
}