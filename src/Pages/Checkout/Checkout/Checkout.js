import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetails from '../../../hooks/useServiceDetails';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
	const {serviceId} =  useParams();
	const [service] = useServiceDetails(serviceId);
	const [user] = useAuthState(auth);

	const handlePlaceOrder = event => {
		event.preventDefault();
		const order = {
			email: user.email,
			name: user.displayName,
			service: service.name,
			serviceId: serviceId,
			address: event.target.address.value,
			phone: event.target.phone.value,
		}
		axios.post('http://localhost:5000/order', order)
		.then(response => {
			const {data} = response;
			if(data.insertedId){
				toast('Your Order is Booked!');
				event.target.reset();
			}
		})

	}
	return (
		<div className='w-50 mx-auto'>
			<h1>Please order in: {service.name}</h1>
			<form onSubmit={handlePlaceOrder}>
				<input className='w-100 mb-2' type="text" value={user?.displayName} name='name' placeholder='name'  readOnly disabled/>
				<br />
				<input className='w-100 mb-2' type="email" value={user?.email} name='email' placeholder='email'  readOnly disabled/>
				<br />
				<input className='w-100 mb-2' type="text" value={service.name} name='service' placeholder='service'  readOnly disabled/>
				<br />
				<input className='w-100 mb-2' type="text" name='address' placeholder='address'  required autoComplete='off' />
				<br />
				<input className='w-100 mb-2' type="number" name='phone' placeholder='phone' required />
				<br />
				<input className='btn btn-primary' type="submit" value="Place Order" />
			</form>
		</div>
	);
};

export default Checkout;