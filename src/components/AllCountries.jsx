import { Pagination } from 'antd';
import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import {  NavLink } from 'react-router-dom';

const AllCountries = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                console.log(response.data);
                setData(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [])

    const sortedCountries = data.sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
    });
    console.log(sortedCountries);



    
    return (
        <div className='flex flex-wrap gap-3'>
            { data && data.map((el) => (
                <NavLink to={`/country/${el.population}`} className='w-40' key={el.name.common}>
                    <img className=' w-40 h-32 ' src={el.flags.png} alt={el.name.common} />
                    <div>
                        <h1>Name: {el.name.common}</h1>
                        <h2>Capital: {el.capital}</h2>
                    </div>
                </NavLink>
            ))}
            <Pagination  defaultCurrent={6} total={500} />
        </div>
    );
}

export default AllCountries;
