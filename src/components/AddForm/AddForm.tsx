import React, {SyntheticEvent, useState} from 'react';
import './AddForm.css'
import {Btn} from "../common/Btn";
import {geocode} from "../../utils/geocoging";
import {TYPE_OF_TRAILER} from "../../data/typeOfTrailer";
import {TYPE_OF_CARGO} from "../../data/typeOfCargo";
import {apiUrl} from "../../config/api";

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const[id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        freight: 0,
        url: '',
        pickup_address: '',
        type_of_trailer: '',
        type_of_cargo: '',
        weight: 0,
        delivery_address: '',
    });

    const saveLoading = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const {lat, lon} = await geocode(form.pickup_address);

            const res = await fetch(`${apiUrl}/loading`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon,
                })
            });

            const data = await res.json();

            setId(data.id);
        } finally {
            setLoading(false);
        }

    }

    const updateForm = (key: string, value: any) => {
      setForm(form =>  ({
          ...form,
          [key]: value,
      }));
    };

    if (loading) {
        return <h2>Trwa dodawanie załadunku</h2>
    }

    if (id) {
        return <h2>Twój załadunek "{form.name}" został poprawnie dodany do serwisu pod ID: {id}.</h2>
    }

    return (
        <form action="" className="add-form" onSubmit={saveLoading}>
            <h1>Dodaj nowy załadunek</h1>
            <p>
                <label>
                    Nazwa: <br/>
                    <input
                        type="text"
                        name="name"
                        required
                        maxLength={99}
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Opis: <br/>
                    <textarea
                        name="description"
                        maxLength={999}
                        value={form.description}
                        onChange={e => updateForm('description', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Rodzaj nadwozia: <br/>
                    <select
                        name="type_of_trailer"
                        value={form.type_of_trailer}
                        onChange={e => updateForm('type_of_trailer', e.target.value)}
                    >
                        {
                            TYPE_OF_TRAILER.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))
                        }
                    </select>
                </label>
            </p>
            <p>
                <label>
                    Typ ładunku: <br/>
                    <select
                        name="type_of_cargo"
                        value={form.type_of_cargo}
                        onChange={e => updateForm('type_of_cargo', e.target.value)}
                        required
                    >
                        {
                            TYPE_OF_CARGO.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))
                        }
                    </select>
                </label>
            </p>
            <p>
                <label>
                    Waga: <br/>
                    <input
                        type="number"
                        name="weight"
                        required
                        value={form.weight}
                        maxLength={99}
                        onChange={e => updateForm('weight', Number(e.target.value))}
                    />
                    <small>☝Podaj wagę ładunku (kg)</small>
                </label>
            </p>
            <p>
                <label>
                    Fracht: <br/>
                    <input
                        type="number"
                        name="freight"
                        required
                        value={form.freight}
                        maxLength={99}
                        onChange={e => updateForm('freight', Number(e.target.value))}
                    />
                    <small>☝Opłata za przewóz (zł)</small>
                </label>
            </p>
            <p>
                <label>
                    Adres odbioru załadunku: <br/>
                    <input
                        type="text"
                        name="pickup_address"
                        required
                        value={form.pickup_address}
                        onChange={e => updateForm('pickup_address', e.target.value)}
                    />
                    <small>☝Użyj proszę formatu (Miasto, ulica numer domu)</small>
                </label>
            </p>
            <p>
                <label>
                    Adres dostarczenia załadunku: <br/>
                    <input
                        type="text"
                        name="delivery_address"
                        required
                        value={form.delivery_address}
                        onChange={e => updateForm('delivery_address', e.target.value)}
                    />
                </label>
            </p>


            <Btn text="Zapisz"/>
        </form>
    )
}