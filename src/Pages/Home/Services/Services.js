import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css'

const Services = () => {
	const [services, setServices] = useState([]);

	useEffect( ()=> {
		fetch('https://safe-ocean-32131.herokuapp.com/service')
		.then(res => res.json())
		.then(data => setServices(data));
	}, []);

	return (
		<div id='services' className='container pt-5 m-5 mx-auto'>
			<h1 className='services-title py-3'>Our Services</h1>
			<div className="services-container">
				{
					services.map(service => <Service
						key={service._id}
						service = {service}
					></Service>)
				}
			</div>
			
		</div>
	);
};

export default Services;