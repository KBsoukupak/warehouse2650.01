import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { NavbarMenu } from '../../components/NavbarMenu';
import {PrijemData} from './PrijemData';
import { SkladPrijem } from './SkladPrijem';

export function SkladPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'skladPrijem'));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(docs);
        };
        fetchData();
    }, []);

    return (
        <>
            <NavbarMenu />
            <SkladPrijem />
            <PrijemData data={data} />
        </>
    );
}
