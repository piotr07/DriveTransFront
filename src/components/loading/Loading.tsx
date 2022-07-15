import React, { useEffect, useState} from 'react';
import "./Loading.css";
import {useParams} from "react-router-dom"
import { LoadingEntity } from 'types';
import {LoadingTranslatedKeys} from "../../data/translator";
import {LoadingUnits} from "../../data/units";
import {Btn} from "../common/Btn";
import {Spinner} from "../common/Spinner/Spinner";
import {apiUrl} from "../../config/api";

export const Loading = () => {
    const [loading, setLoading] = useState<LoadingEntity | null>(null);
    const params = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/${params.id}`);
            const data = await res.json();
            setLoading(data);
        })();
    }, []);

    if (loading === null) {
        return <Spinner/>
    }

    return (
        <div className='details'>
            <Btn to="/" text="Wróć na stronę głórwną"/>
            <p className="details-header">
                Szczegóły ładunku: <b>{loading.name}</b>
            </p>
            <table>
                {Object.entries(loading).map(([key, val]) => {
                    return (
                        LoadingTranslatedKeys.get(key)
                            && <tr>
                                <th>{LoadingTranslatedKeys.get(key)}</th>
                                <td>{val} {LoadingUnits.get(key)}</td>
                            </tr>
                    )
                })}
            </table>
        </div>
    );
};