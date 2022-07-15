import React, {SyntheticEvent, useContext, useState} from 'react';
import {Btn} from "../common/Btn";

import "./Header.css";
import {SearchContext} from "../../contexts/search.context";
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const {search, setSearch} = useContext(SearchContext);
    const [inputVal, setInputVal] = useState(search);

    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    }
    const navigate = useNavigate();

    const onClickHandler = () => navigate(`/`);

    return (
        <header>
            <h1 onClick={onClickHandler}
                style={{cursor:'pointer'}}
            >
                Drive <strong>Trans</strong> 🚛
            </h1>
            <Btn to="/add" text="Dodaj załadunek"/>
            <form className="search" onSubmit={setSearchFromLocalState}>
                <input
                    type="text"
                    placeholder="Wprowadź nazwę załadunku…"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                />
                <Btn text="Wyszukaj załadunek🔍"/>
            </form>
        </header>
    );
};