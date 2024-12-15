import React from 'react';

import Card from '../components/card';


import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/compras`;

function ListagemCompra() {

    // const cadastrar = () => {
    //     navigate(`/cadastro-categorias`);
    // };

    const [dados, setDados] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setDados(response.data.compras);
        });
    }, []);
    
    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Listagem de Compras'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Data</th>
                                        <th scope='col'>Forma de Pagamento</th>
                                        <th scope='col'>Desconto</th>
                                        <th scope='col'>Aprovada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dados.map((dado) => (
                                        <tr key={dado.id}>
                                            <td>{dado.data}</td>
                                            <td>{dado.formaPag}</td>
                                            <td>{dado.desconto}</td>
                                            <td>{dado.aprovada}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ListagemCompra;