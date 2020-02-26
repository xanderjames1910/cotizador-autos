import React, { useState } from 'react';
import styled from '@emotion/styled';

import Header from './componets/Header';
import Formulario from './componets/Formulario';
import Resumen from './componets/Resumen';
import Resultado from './componets/Resultado';
import Spinner from './componets/Spinner';

const Contendor = styled.div`
	max-width: 600px;
	margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
	background-color: #fff;
	padding: 3rem;
`;

function App() {
	const [resumen, setResumen] = useState({
		cotizacion: 0,
		datos: {
			marca: '',
			year: '',
			plan: '',
		},
	});

	const [cargando, setCargando] = useState(false);

	const { cotizacion, datos } = resumen;

	return (
		<Contendor>
			<Header titulo='Cotizador de Seguros' />

			<ContenedorFormulario>
				<Formulario setResumen={setResumen} setCargando={setCargando} />
				{cargando ? <Spinner /> : null}
				<Resumen datos={datos} />
				{!cargando ? <Resultado cotizacion={cotizacion} /> : null}
			</ContenedorFormulario>
		</Contendor>
	);
}

export default App;
