import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from './Helper';

const Campo = styled.div`
	display: flex;
	margin-bottom: 1rem;
	align-items: center;
`;

const Label = styled.label`
	flex: 0 0 100px;
`;

const Select = styled.select`
	display: block;
	width: 100%;
	padding: 1rem;
	border: 1px solid #e1e1e1;
	-webkit-appearance: none;
`;

const InputRadio = styled.input`
	margin: 0 1rem;
`;

const Boton = styled.button`
	background-color: #00838f;
	font-size: 16px;
	width: 100%;
	padding: 1rem;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	border: none;
	transition: background-color 0.3s ease;
	margin-top: 2rem;

	&:hover {
		background-color: #62c6da;
		cursor: pointer;
	}
`;

const Error = styled.div`
	background-color: red;
	color: white;
	padding: 1rem;
	margin-bottom: 2rem;
	width: 100%;
	text-align: center;
`;

const Formulario = ({ setCargando, setResumen }) => {
	const [datos, setDatos] = useState({
		marca: '',
		year: '',
		plan: '',
	});
	const [error, setError] = useState(false);

	// Extraer los valores del state
	const { marca, year, plan } = datos;

	// Leer datos de formulario y colocarlos en el state
	const handleChange = e => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		});
	};

	// Cuando el usuario presiona submit
	const onSubmit = e => {
		e.preventDefault();

		if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
			setError(true);
			return;
		}

		setError(false);

		// Una base de 2000
		let resultado = 2000;

		// Obtener la diferencia de años
		const diferencia = obtenerDiferenciaYear(year);

		// Por cada año hay que restar el 3%
		resultado -= (diferencia * 3 * resultado) / 100;

		// Americano 15%
		// Asiático 5%
		// Europeo 30%
		resultado *= calcularMarca(marca);

		// Básico aumenta 220%
		// Completo 50%
		const incrementoPlan = obtenerPlan(plan);
		resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

		setCargando(true);

		setTimeout(() => {
			// Elimina el spinner
			setCargando(false);
			// Pasa la información al componente principal
			setResumen({
				cotizacion: Number(resultado),
				datos,
			});
		}, 3000);
	};

	return (
		<form onSubmit={onSubmit}>
			{error ? <Error>Todos los campos son obligatorios</Error> : null}
			<Campo>
				<Label>Marca</Label>
				<Select name='marca' value={marca} onChange={handleChange}>
					<option value=''>-- Seleccione --</option>
					<option value='americano'>Americano</option>
					<option value='europeo'>Europeo</option>
					<option value='asiatico'>Asiático</option>
				</Select>
			</Campo>

			<Campo>
				<Label>Año</Label>
				<Select name='year' value={year} onChange={handleChange}>
					<option value=''>-- Seleccione --</option>
					<option value='2021'>2021</option>
					<option value='2020'>2020</option>
					<option value='2019'>2019</option>
					<option value='2018'>2018</option>
					<option value='2017'>2017</option>
					<option value='2016'>2016</option>
					<option value='2015'>2015</option>
					<option value='2014'>2014</option>
					<option value='2013'>2013</option>
					<option value='2012'>2012</option>
				</Select>
			</Campo>

			<Campo>
				<Label>Plan</Label>
				<InputRadio
					type='radio'
					name='plan'
					value='basico'
					checked={plan === 'basico'}
					onChange={handleChange}
				/>{' '}
				Básico
				<InputRadio
					type='radio'
					name='plan'
					value='completo'
					checked={plan === 'completo'}
					onChange={handleChange}
				/>{' '}
				Completo
			</Campo>

			<Boton type='submit'>Cotizar</Boton>
		</form>
	);
};

Formulario.propTypes = {
	setCargando: PropTypes.func.isRequired,
	setResumen: PropTypes.func.isRequired,
};

export default Formulario;
