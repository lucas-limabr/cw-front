import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroVeiculo() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/listagem-veiculo`;

  const [id, setId] = useState('');
  const [vin, setVin] = useState('');
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [precoAtual, setPrecoAtual] = useState('');
  const [cor, setCor] = useState('');
  const [condicao, setCondicao] = useState('');
  const [vendido, setVendido] = useState('');
  const [garantia, setGarantia] = useState('');
  const [idModeloVeiculo, setIdModeloVeiculo] = useState('');
  const [idConcessionaria, setIdConcessionaria] = useState('');

  const [dados, setDados] = useState(null);

  function inicializar() {
    setId('');
    setVin('');
    setNome('');
    setMarca('');
    setPrecoAtual('');
    setCor('');
    setCondicao('');
    setVendido('');
    setGarantia('');
    setIdModeloVeiculo('');
    setIdConcessionaria('');
  }

  async function salvar() {
    const data = {
      id,
      vin,
      nome,
      marca,
      precoAtual,
      cor,
      condicao,
      vendido,
      garantia,
      idModeloVeiculo,
      idConcessionaria,
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Veículo ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Veículo ${nome} alterado com sucesso!`);
      }
      navigate('/listagem-veiculos');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar veículo.');
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const veiculo = response.data;
        setId(veiculo.id);
        setVin(veiculo.vin);
        setNome(veiculo.nome);
        setMarca(veiculo.marca);
        setPrecoAtual(veiculo.precoAtual);
        setCor(veiculo.cor);
        setCondicao(veiculo.condicao);
        setVendido(veiculo.vendido);
        setGarantia(veiculo.garantia);
        setIdModeloVeiculo(veiculo.idmodeloveiculo);
        setIdConcessionaria(veiculo.idconcessionaria);
        setDados(veiculo);
      } catch (error) {
        mensagemErro('Erro ao carregar os dados do veículo.');
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    buscar();
  }, [idParam]);

  return (
    <div className='container'>
      <Card title='Cadastro de Veículo'>
        <div className='row'>
          <div className='col-lg-12'>
            <br />
            <div className='bs-component'>
              <FormGroup label='VIN: *' htmlFor='inputVin'>
                <input
                  type='text'
                  id='inputVin'
                  value={vin}
                  className='form-control'
                  onChange={(e) => setVin(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Marca: *' htmlFor='inputMarca'>
                <input
                  type='text'
                  id='inputMarca'
                  value={marca}
                  className='form-control'
                  onChange={(e) => setMarca(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Preço Atual: *' htmlFor='inputPrecoAtual'>
                <input
                  type='number'
                  id='inputPrecoAtual'
                  value={precoAtual}
                  className='form-control'
                  onChange={(e) => setPrecoAtual(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Cor: *' htmlFor='inputCor'>
                <input
                  type='text'
                  id='inputCor'
                  value={cor}
                  className='form-control'
                  onChange={(e) => setCor(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Condição: *' htmlFor='inputCondicao'>
                <input
                  type='text'
                  id='inputCondicao'
                  value={condicao}
                  className='form-control'
                  onChange={(e) => setCondicao(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Vendido: *' htmlFor='inputVendido'>
                <input
                  type='text'
                  id='inputVendido'
                  value={vendido}
                  className='form-control'
                  onChange={(e) => setVendido(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Garantia: *' htmlFor='inputGarantia'>
                <input
                  type='text'
                  id='inputGarantia'
                  value={garantia}
                  className='form-control'
                  onChange={(e) => setGarantia(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='ID Modelo de Veículo: *' htmlFor='inputIdModeloVeiculo'>
                <input
                  type='text'
                  id='inputIdModeloVeiculo'
                  value={idModeloVeiculo}
                  className='form-control'
                  onChange={(e) => setIdModeloVeiculo(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='ID Concessionária: *' htmlFor='inputIdConcessionaria'>
                <input
                  type='text'
                  id='inputIdConcessionaria'
                  value={idConcessionaria}
                  className='form-control'
                  onChange={(e) => setIdConcessionaria(e.target.value)}
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

export default CadastroVeiculo;
