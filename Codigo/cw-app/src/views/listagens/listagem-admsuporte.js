import React from "react";

import Card from "../../components/card";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/admssuporte`;

function ListagemAdmSuporte() {
    const navigate = useNavigate();

    const cadastrar = () => {
        navigate(`/cadastro-admsuporte`);
    };

    const editar = (id) => {
        navigate(`/cadastro-admsuporte/${id}`);
    };

    const [dados, setDados] = React.useState(null);

    async function excluir(id) {
        let url = `${baseURL}/${id}`;
        console.log(url);
        await axios
            .delete(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                mensagemSucesso(`AdmSuporte excluído com sucesso!`);
                setDados(
                    dados.filter((dado) => {
                        return dado.id !== id;
                    }),
                );
            })
            .catch(function (error) {
                mensagemErro(`Erro ao excluir o AdmSuporte`);
                console.error("Erro detalhado:", error);
            });
    }

    const token = localStorage.getItem("token");

    React.useEffect(() => {
        axios.get(`${baseURL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setDados(response.data);
        });
    }, []);

    if (!dados) return null;

    return (
        <div className="container">
            <Card title="Listagem de ADMSuporte">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <button
                                type="button"
                                className="btn btn-warning mb-3"
                                onClick={() => cadastrar()}
                            >
                                Novo ADMSuporte
                            </button>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">CPF</th>
                                        <th scope="col">Email Principal</th>
                                        <th scope="col">Telefone Principal</th>
                                        <th scope="col">Endereço</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dados.map((dado) => (
                                        <tr key={dado.id}>
                                            <td>{dado.nome}</td>
                                            <td>{dado.cpf}</td>
                                            <td>{dado.email1}</td>
                                            <td>{dado.telefone1}</td>
                                            <td>{`${dado.logradouro}, ${dado.numero} - ${dado.bairro}, ${dado.uf}`}</td>
                                            <td>
                                                <Stack spacing={1} padding={0} direction="row">
                                                    <IconButton
                                                        aria-label="edit"
                                                        onClick={() => editar(dado.id)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => excluir(dado.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Stack>
                                            </td>
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

export default ListagemAdmSuporte;