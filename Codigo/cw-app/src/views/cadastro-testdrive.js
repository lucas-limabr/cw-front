import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroTestDrive() {
    const { idParam } = useParams();
    const navigate = useNavigate();
    const baseURL = `${BASE_URL}/listagem-agendamentotestdrive`;

    const [id, setId] = useState('');
    const [dataAgendada, setDataAgendada] = useState('');
    const [horaAgendada, setHoraAgendada] = useState('');
    const [horaEntregue, setHoraEntregue] = useState('');
    const [cpfCliente, setCpfCliente] = useState('');
    const [concessionaria, setConcessionaria] = useState('');
    const [modelo, setModelo] = useState('');

    const [dados, setDados] = useState(null);

    function inicializar() {
        setId('');
        setDataAgendada('');
        setHoraAgendada('');
        setHoraEntregue('');
        setCpfCliente('');
        setConcessionaria('');
        setModelo('');
    }

    async function salvar() {
        const data = {
            id,
            dataAgendada,
            horaAgendada,
            horaEntregue,
            cpfCliente,
            concessionaria,
            modelo,
        };

        try {
            if (!idParam) {
                await axios.post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                });
                mensagemSucesso(`Test-drive no dia ${horaAgendada} e data ${horaAgendada} cadastrado com sucesso!`);
            } else {
                await axios.put(`${baseURL}/${idParam}`, data, {
                    headers: { 'Content-Type': 'application/json' },
                });
                mensagemSucesso(`Test-drive alterado com sucesso!`);
            }
            navigate('/listagem-test-drive');
        } catch (error) {
            mensagemErro(error.response?.data || 'Erro ao salvar test-drive.');
        }
    }

    async function buscar() {
        if (idParam) {
            try {
                const response = await axios.get(`${baseURL}/${idParam}`);
                const test_drive = response.data;
                setId(test_drive.id);
                setDataAgendada(test_drive.dataAgendada);
                setHoraAgendada(test_drive.horaAgendada);
                setHoraEntregue(test_drive.horaEntregue);
                setCpfCliente(test_drive.cpfCliente);
                setConcessionaria(test_drive.concessionaria);
                setModelo(test_drive.modelo);
                setDados(test_drive);
            } catch (error) {
                mensagemErro('Erro ao carregar os dados do test-drive.');
            }
        } else {
            console.log('chama');
            inicializar();
        }
    }

    useEffect(() => {
        buscar();
    }, [idParam]);

    return (
        <div className='container'>
            <Card title='Cadastro de Test-drive'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <br />
                        <div className='bs-component'>
                            <FormGroup label='Data Agendada: *' htmlFor='inputDataAgendada'>
                                <input
                                    type='text'
                                    id='inputDataAgendada'
                                    value={dataAgendada}
                                    className='form-control'
                                    onChange={(e) => setDataAgendada(e.target.value)}
                                />
                            </FormGroup>
                            <br />
                            <FormGroup label='Hora Agendada: *' htmlFor='inputHoraAgendada'>
                                <input
                                    type='text'
                                    id='inputHoraAgendada'
                                    value={horaAgendada}
                                    className='form-control'
                                    onChange={(e) => setHoraAgendada(e.target.value)}
                                />
                            </FormGroup>
                            <br />
                            <FormGroup label='Hora Entregue: *' htmlFor='inputHoraEntregue'>
                                <input
                                    type='text'
                                    id='inputHoraEntregue'
                                    value={horaEntregue}
                                    className='form-control'
                                    onChange={(e) => setHoraEntregue(e.target.value)}
                                />
                            </FormGroup>
                            <br />
                            <FormGroup label='CPF do Cliente: *' htmlFor='inputCpfCliente'>
                                <input
                                    type='number'
                                    id='inputCpfCliente'
                                    value={cpfCliente}
                                    className='form-control'
                                    onChange={(e) => setCpfCliente(e.target.value)}
                                />
                            </FormGroup>
                            <br />
                            <FormGroup label='Concessionaria: *' htmlFor='inputConcessionaria'>
                                <input
                                    type='text'
                                    id='inputConcessionaria'
                                    value={concessionaria
                                    }
                                    className='form-control'
                                    onChange={(e) => setConcessionaria
                                        (e.target.value)}
                                />
                            </FormGroup>
                            <br />
                            <FormGroup label='Modelo: *' htmlFor='inputModelo'>
                                <input
                                    type='text'
                                    id='inputModelo'
                                    value={modelo
                                    }
                                    className='form-control'
                                    onChange={(e) => setModelo(e.target.value)}
                                />
                            </FormGroup>

                            <br />
                            <Stack spacing={1} padding={1} direction='row'>
                                <button onClick={salvar} type='button' className='btn btn-success'>
                                    Salvar
                                </button>
                                <button onClick={inicializar} type='button' className='btn btn-danger'>
                                    Cancelar
                                </button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default CadastroTestDrive;
