import React from 'react';
import useServices from '../../hooks/useServices';

const ManageServices = () => {
	const [services, setServices] = useServices();

	const handleDelete = id => {
		const proceed = window.confirm(`Are you to delete service: ${(services.find( s => s._id === id)).name}`);
		
		if(proceed){
			const url = `https://safe-ocean-32131.herokuapp.com/service/${id}`;
			fetch(url, {
				method: 'DELETE'
			})
			.then(res => res.json())
			.then(data => {
				const remaining = services.filter(service => service._id !== id);
				setServices(remaining);
			});
		}
	}
	return (
		<div className='w-50 mx-auto'>
			<h2>Manage Your Services</h2>
			{
				services.map(service => <div key={service._id}> 
					<h4 className='py-2'>{service.name}
					<button onClick={ () => handleDelete(service._id)} className='btn btn-danger ms-3 px-3'>X</button>
					</h4>
				</div>)
			}
		</div>
	);
};

export default ManageServices;