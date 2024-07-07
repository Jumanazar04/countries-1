import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePageApp = () => {
    const [data, setData] = useState();
    const [population, setPopulation] = useState();
    const params = useParams();
    console.log(params);

    useEffect(() => {
        const getData =  async () =>{
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const newData =  response.data.find((el) => (
                    el.population === +params.id
                ));
                setData([newData]);
                console.log(newData.population);
                if (newData.population > 1000) {
                    setPopulation(`${(newData.population / 1000).toFixed(1)}k`)
                }
                if (newData.population > 1000000) {
                    setPopulation(`${(newData.population / 1000000).toFixed(1)}mln`)
                }
                if (newData.population > 1000000000) {
                    setPopulation(`${(newData.population / 1000000000).toFixed(1)}mlrd`)
                }
            } catch (error) {
                message.error(error)
            }
        }

        getData()
     }, [params])
    // console.log(data[0]);
    // const map =     data[0].maps.googleMaps;
    return (
        <div>
            { data && data.map((el) => (
                <div className='max-[780px]:flex-col flex gap-7 border rounded-2xl max-[780px]:p-2 p-5' key={el.population}>
                    <img className='w-96' src={el.flags.png} alt="ok" />
                    <div>
                        <h1 className='max-[780px]:text-2xl text-3xl font-bold'>Name: {el.name.common}</h1>
                        <span>Offical name: {el.name.official}</span>
                        <h2 className='max-[780px]:text-xl text-2xl font-bold'>Capital: {el.capital}</h2>
                        <p className='text-xl font-bold'>Population: {population}</p>
                        <p>Region: {el.region}</p>
                        <p>Subregion: {el.subregion}</p>
                        <p>Continents: {el.continents}</p>
                        <p>IsIndependent: {el.independent ? 'True': 'False'}</p>
                    </div>
                    <br />
                    {/* <div>
                        <iframe
                            src={el.maps.googleMaps}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title='ok'
                        ></iframe>
                    </div> */}
                </div>
            ))}
        </div>
    );
}

export default SinglePageApp;
