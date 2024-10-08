import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UpdateRestaurant = (props) => {
    const { id } = useParams();
    let navigate = useNavigate();
    const {restaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [PriceRange, setPriceRange] = useState("")

    useEffect(()=> {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`)
            console.log(response.data.data)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }
        fetchData()
    },[])

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`,{
            name,
            location,
            price_range: PriceRange
        });
        navigate("/");
    }

    return (
        <div>
            <form action=''>
                <div className='form-group mb-3'>
                    <label htmlFor='name'>Name</label>
                    <input value={name} onChange={e=>setName(e.target.value)} id='name' className='form-control' type='text' />
                </div>

                <div className='form-group mb-3'>
                    <label htmlFor='location'>Location</label>
                    <input value={location} onChange={e=>setLocation(e.target.value)} id='location' className='form-control' type='text' />
                </div>

                <div className='form-group mb-3'>
                    <label htmlFor='price_range'>Price Range</label>
                    <input value={PriceRange} onChange={e=>setPriceRange(e.target.value)} id='price_range' className='form-control' type='number' />
                </div>

                <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
}

export default UpdateRestaurant;
