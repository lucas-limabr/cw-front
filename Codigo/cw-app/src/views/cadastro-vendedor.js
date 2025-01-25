import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroVendedor() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/listagem-vendedor`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [concessionaria, setConcessionaria] = useState('');
  const [dados, setDados] = useState(null);

  function inicializar() {
    setId('');
    setNome('');
    setCpf('');
    setLogin('');
    setSenha('');
    setTelefone('');
    setEmail('');
    setLogradouro('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCep('');
    setUf('');
    setConcessionaria('');
  }

  async function salvar() {
    const data = {
      id,
      nome,
      cpf,
      login,
      senha,
      telefone,
      email,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf,
      concessionaria
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Vendedor ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Vendedor ${nome} alterado com sucesso!`);
      }
      navigate('/listagem-vendedores');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar vendedor.');
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const vendedor = response.data;
        setId(vendedor.id);
        setNome(vendedor.nome);
        setCpf(vendedor.cpf);
        setLogin(vendedor.login);
        setSenha(vendedor.senha);
        setTelefone(vendedor.telefone);
        setEmail(vendedor.email);
        setLogradouro(vendedor.logradouro);
        setNumero(vendedor.numero);
        setComplemento(vendedor.complemento);
        setBairro(vendedor.bairro);
        setCep(vendedor.cep);
        setUf(vendedor.uf);
        setConcessionaria(vendedor.concessionaria);
        setDados(vendedor);
      } catch (error) {
        mensagemErro('Erro ao carregar os dados do vendedor.');
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
      <Card title='Cadastro de Vendedor'>
        <div className='row'>
          <div className='col-lg-12'>
            <br />
            <div className='bs-component'>
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
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Login: *' htmlFor='inputLogin'>
                <input
                  type='text'
                  id='inputLogin'
                  value={login}
                  className='form-control'
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input
                  type='password'
                  id='inputSenha'
                  value={senha}
                  className='form-control'
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input
                  type='text'
                  id='inputTelefone'
                  value={telefone}
                  className='form-control'
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Número: *' htmlFor='inputNumero'>
                <input
                  type='text'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Complemento:' htmlFor='inputComplemento'>
                <input
                  type='text'
                  id='inputComplemento'
                  value={complemento}
                  className='form-control'
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                <input
                  type='text'
                  id='inputBairro'
                  value={bairro}
                  className='form-control'
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='CEP: *' htmlFor='inputCep'>
                <input
                  type='text'
                  id='inputCep'
                  value={cep}
                  className='form-control'
                  onChange={(e) => setCep(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label='UF: *' htmlFor='inputConcessionaria'>
                <input
                  type='text'
                  id='inputConcessionaria'
                  value={uf}
                  className='form-control'
                  onChange={(e) => setUf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Concessionária: *' htmlFor='inputConcessionaria'>
                <input
                  type='text'
                  id='inputConcessionaria'
                  value={concessionaria}
                  className='form-control'
                  onChange={(e) => setUf(e.target.value)}
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

export default CadastroVendedor;
