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
  const [chassi, setChassi] = useState('');
  const [modelo, setNome] = useState('');
  const [fabricante, setMarca] = useState('');
  const [precoAtual, setPrecoAtual] = useState('');
  const [cor, setCor] = useState('');
  const [condicao, setCondicao] = useState('');
  const [vendido, setVendido] = useState('');
  const [garantia, setGarantia] = useState('');
  const [idModeloVeiculo, setIdModeloVeiculo] = useState('');
  const [concessionaria, setIdConcessionaria] = useState('');

  const [dados, setDados] = useState(null);

  function inicializar() {
    setId('');
    setChassi('');
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
      chassi,
      modelo,
      fabricante,
      precoAtual,
      cor,
      condicao,
      vendido,
      garantia,
      idModeloVeiculo,
      concessionaria,
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Veículo ${modelo} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Veículo ${modelo} alterado com sucesso!`);
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
        setChassi(veiculo.chassi);
        setNome(veiculo.modelo);
        setMarca(veiculo.fabricante);
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
              <FormGroup label='Chassi: *' htmlFor='inputVin'>
                <input
                  type='text'
                  id='inputVin'
                  value={chassi}
                  className='form-control'
                  onChange={(e) => setChassi(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Modelo: *' htmlFor='inputModelo'>
                <input
                  type='text'
                  id='inputModelo'
                  value={modelo}
                  className='form-control'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Fabricante: *' htmlFor='inputFabricante'>
                <input
                  type='text'
                  id='inputFabricante'
                  value={fabricante}
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
              <br />
              <FormGroup label='Concessionária: *' htmlFor='inputConcessionaria'>
                <input
                  type='text'
                  id='inputConcessionaria'
                  value={concessionaria}
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
