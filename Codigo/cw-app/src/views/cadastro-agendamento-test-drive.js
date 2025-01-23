// mport React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// import Stack from '@mui/material/Stack';

// import Card from '../components/card';
// import FormGroup from '../components/form-group';

// import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import axios from 'axios';
// import { BASE_URL } from '../config/axios';

// function CadastroTestDrive() {
//   const { idParam } = useParams();
//   const navigate = useNavigate();
//   const baseURL = `${BASE_URL}/listagem-agendamento-test-drive`;

//   const [id, setId] = useState('');
//   const [dataAgendada, setDataAgendada] = useState('');
//   const [horaEntregue, setHoraEntregue] = useState('');
//   const [horaEntregue, setHoraEntregue] = useState('');
//   const [cpf, setHoraEntregue] = useState('');
//   const [horaEntregue, setHoraEntregue] = useState('');

//   const [dados, setDados] = useState(null);

//   function inicializar() {
//     setId('');
//     setMarca('');
//     setNome('');
//   }

//   async function salvar() {
//     const data = {
//       id,
//       marca,
//       nome,
//     };

//     try {
//       if (!idParam) {
//         await axios.post(baseURL, data, {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         mensagemSucesso(`Veículo ${nome} cadastrado com sucesso!`);
//       } else {
//         await axios.put(`${baseURL}/${idParam}`, data, {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         mensagemSucesso(`Veículo ${nome} alterado com sucesso!`);
//       }
//       navigate('/listagem-veiculos');
//     } catch (error) {
//       mensagemErro(error.response?.data || 'Erro ao salvar veículo.');
//     }
//   }

//   async function buscar() {
//     if (idParam) {
//       try {
//         const response = await axios.get(`${baseURL}/${idParam}`);
//         const veiculo = response.data;
//         setId(veiculo.id);
//         setMarca(veiculo.marca);
//         setNome(veiculo.nome);
//         setDados(veiculo);
//       } catch (error) {
//         mensagemErro('Erro ao carregar os dados do veículo.');
//       }
//     } else {
//       inicializar();
//     }
//   }

//   useEffect(() => {
//     buscar();
//   }, [idParam]);

//   return (
//     <div className='container'>
//       <Card title='Cadastro de Veículo'>
//         <div className='row'>
//           <div className='col-lg-12'>
//             <br />
//             <div className='bs-component'>
//               <FormGroup label='Marca: *' htmlFor='inputMarca'>
//                 <input
//                   type='text'
//                   id='inputMarca'
//                   value={marca}
//                   className='form-control'
//                   onChange={(e) => setMarca(e.target.value)}
//                 />
//               </FormGroup>
//               <br />
//               <FormGroup label='Nome: *' htmlFor='inputNome'>
//                 <input
//                   type='text'
//                   id='inputNome'
//                   value={nome}
//                   className='form-control'
//                   onChange={(e) => setNome(e.target.value)}
//                 />
//               </FormGroup>
//               <br />
//               <Stack spacing={1} padding={1} direction='row'>
//                 <button onClick={salvar} type='button' className='btn btn-success'>
//                   Salvar
//                 </button>
//                 <button onClick={inicializar} type='button' className='btn btn-danger'>
//                   Cancelar
//                 </button>
//               </Stack>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default CadastroModelo;
