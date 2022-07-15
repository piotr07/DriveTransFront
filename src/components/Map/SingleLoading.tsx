import React, {useEffect, useState} from "react";
import { LoadingEntity } from "types";
import {Btn} from "../common/Btn";
import {Spinner} from "../common/Spinner/Spinner";
import {apiUrl} from "../../config/api";

interface Props {
    id: string;
}

export const SingleLoading = (props: Props) => {
    const [loading, setLoading] = useState<LoadingEntity | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/loading/${props.id}`);
            const data = await res.json();
            setLoading(data);
        })();
    }, []);

    if (loading === null) {
        return <Spinner/>
    }

    return <>
        <h2>{loading.name}</h2>
        {!!loading.freight && <p>Fracht: <b>{loading.freight} zł</b></p>}
        {!!loading.weight && <p>Waga: <b>{loading.weight} kg</b></p>}
        <div className='moreInfo'>
            <Btn to={`/loading/${loading.id}`} text="Więcej informacji"/>
        </div>
    </>
}