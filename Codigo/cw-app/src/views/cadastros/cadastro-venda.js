import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import { mensagemSucesso, mensagemErro } from "../../components/toastr";
import { BASE_URL } from "../../config/axios";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const vendasURL = `${BASE_URL}/vendas`;
const clientesURL = `${BASE_URL}/clientes`;
const vendedoresURL = `${BASE_URL}/vendedores`;
const veiculosURL = `${BASE_URL}/veiculos`;
const modelosURL = `${BASE_URL}/modelos`;

function CadastroVenda() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [formaPag, setFormaPag] = useState("");
  const [cliente, setCliente] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const [itens, setItens] = useState([]);

  const [itemAtual, setItemAtual] = useState({
    veiculo: null,
    modelo: null,
    descontoParcial: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const [clientesOptions, setClientesOptions] = useState([]);
  const [vendedoresOptions, setVendedoresOptions] = useState([]);
  const [modelosOptions, setModelosOptions] = useState([]);
  const [veiculosOptions, setVeiculosOptions] = useState([]);
  
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [
          clientesRes,
          vendedoresRes,
          veiculosRes,
          modelosRes,
        ] = await Promise.all([
          axios.get(clientesURL),
          axios.get(vendedoresURL),
          axios.get(veiculosURL),
          axios.get(modelosURL),
        ]);

        setClientesOptions(
          clientesRes.data.map((c) => ({ value: c.id, label: c.cpf }))
        );
        setVendedoresOptions(
          vendedoresRes.data.map((v) => ({ value: v.id, label: v.nome }))
        );
        setVeiculosOptions(
          veiculosRes.data.map((v) => ({
            value: v.id,
            label: v.chassi,
            nomeModelo: v.nomeModelo,
            preco: v.precoAtual,
            modeloVeiculoId: v.modeloVeiculoId,
          }))
        );
        setModelosOptions(
          modelosRes.data.map((m) => ({ value: m.id, label: m.nome }))
        );
      } catch (error) {
        mensagemErro("Erro ao carregar dados para o formulário.");
      }
    };
    loadOptions();
  }, []);

  useEffect(() => {
    const allOptionsLoaded =
      clientesOptions.length > 0 &&
      vendedoresOptions.length > 0 &&
      modelosOptions.length > 0 &&
      veiculosOptions.length > 0;

    const loadVenda = async () => {
      try {
        const response = await axios.get(`${vendasURL}/${idParam}`);
        const venda = response.data;
        
        setData(venda.data);
        setFormaPag(venda.formaPag);
        
        setCliente(clientesOptions.find((opt) => opt.value === venda.clienteId));
        setVendedor(vendedoresOptions.find((opt) => opt.value === venda.vendedorId));

        const loadedItens = venda.itens.map((item) => {
          const veiculo = veiculosOptions.find((v) => v.value === item.veiculoId);
          const modelo = modelosOptions.find((m) => m.value === veiculo.modeloVeiculoId);
          return {
            id: item.id,
            veiculo: veiculo,
            modelo: modelo,
            descontoParcial: item.descontoParcial,
          };
        });
        setItens(loadedItens);

      } catch (error) {
        mensagemErro("Erro ao carregar dados da venda para edição.");
      }
    };

    if (idParam && allOptionsLoaded) {
      loadVenda();
    }
  }, [idParam, clientesOptions, vendedoresOptions, modelosOptions, veiculosOptions]);

  const { precoBrutoTotal, descontoTotalCalculado, precoFinalTotal } = useMemo(() => {
    let precoBruto = 0;
    let descontoTotal = 0;

    itens.forEach(item => {
      const precoItem = parseFloat(item.veiculo?.preco) || 0;
      const percentualDesconto = parseFloat(item.descontoParcial) || 0;
      
      precoBruto += precoItem;
      descontoTotal += precoItem * (percentualDesconto / 100);
    });

    const precoFinal = precoBruto - descontoTotal;

    return {
      precoBrutoTotal: precoBruto,
      descontoTotalCalculado: descontoTotal,
      precoFinalTotal: precoFinal
    };
  }, [itens]);

  const handleVeiculoChange = (selectedVeiculoOption) => {
    if (!selectedVeiculoOption) {
      setItemAtual({ veiculo: null, modelo: null, descontoParcial: "" });
      return;
    }

    const idDoModeloDoVeiculo = selectedVeiculoOption.modeloVeiculoId; 
    const modeloCorrespondente = modelosOptions.find(
      (m) => m.value === idDoModeloDoVeiculo
    );

    if (!modeloCorrespondente) {
      mensagemErro(`Modelo correspondente ao veículo selecionado não foi encontrado na lista de modelos.`);
      setItemAtual({ veiculo: selectedVeiculoOption, modelo: null, descontoParcial: "" });
    } else {
      setItemAtual({
        ...itemAtual,
        veiculo: selectedVeiculoOption,
        modelo: modeloCorrespondente,
      });
    }
  };
  
  const handleAddItem = () => {
    if (!itemAtual.veiculo || !itemAtual.modelo) {
      mensagemErro("Selecione um veículo válido cujo modelo esteja cadastrado.");
      return;
    }

    if (editIndex !== null) {
      const updatedItens = [...itens];
      updatedItens[editIndex] = itemAtual;
      setItens(updatedItens);
      setEditIndex(null);
    } else {
      setItens([...itens, itemAtual]);
    }

    setItemAtual({ veiculo: null, modelo: null, descontoParcial: "" });
  };
  
  const handleEditItem = (index) => {
    setItemAtual(itens[index]);
    setEditIndex(index);
  };
  
  const handleDeleteItem = (index) => {
    const updatedItens = itens.filter((_, i) => i !== index);
    setItens(updatedItens);
  };

  const salvar = async () => {
    if (!data || !formaPag || !cliente || !vendedor || itens.length === 0) {
      mensagemErro("Preencha todos os campos obrigatórios e adicione ao menos um item.");
      return;
    }

    const payload = {
      id: idParam || null,
      data,
      formaPag,
      clienteId: cliente.value,
      vendedorId: vendedor.value,
      itens: itens.map((item) => ({
        id: item.id || null,
        veiculoId: item.veiculo.value,
        descontoParcial: item.descontoParcial || 0,
      })),
    };

    try {
      const promise = idParam
        ? axios.put(`${vendasURL}/${idParam}`, payload)
        : axios.post(vendasURL, payload);
      
      await promise;

      mensagemSucesso(`Venda ${idParam ? 'atualizada' : 'cadastrada'} com sucesso!`);
      navigate("/listagem-venda");
    } catch (error) {
      mensagemErro(error.response?.data || "Ocorreu um erro ao salvar a venda.");
    }
  };

  return (
    <div className="container">
      <Card title={idParam ? "Edição de Venda" : "Cadastro de Venda"}>
        <div className="row mb-3">
          <div className="col-md-6">
            <FormGroup label="Data: *" htmlFor="inputData">
              <input type="date" id="inputData" value={data} className="form-control" onChange={(e) => setData(e.target.value)} />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup label="Forma de Pagamento: *" htmlFor="inputFormaPag">
              <input type="text" id="inputFormaPag" value={formaPag} className="form-control" onChange={(e) => setFormaPag(e.target.value)} />
            </FormGroup>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <FormGroup label="Cliente (CPF): *">
              <Select options={clientesOptions} value={cliente} onChange={setCliente} placeholder="Selecione..." isSearchable />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup label="Vendedor: *">
              <Select options={vendedoresOptions} value={vendedor} onChange={setVendedor} placeholder="Selecione..." isSearchable />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup label="Desconto Total (R$):" htmlFor="inputDesconto">
              <input type="text" id="inputDesconto" value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(descontoTotalCalculado)} className="form-control" disabled />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Preço Bruto (R$):" htmlFor="inputPrecoBruto">
              <input type="text" id="inputPrecoBruto" value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoBrutoTotal)} className="form-control" disabled />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Preço Final (R$):" htmlFor="inputPrecoFinal">
              <input type="text" id="inputPrecoFinal" value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoFinalTotal)} className="form-control" disabled />
            </FormGroup>
          </div>
        </div>
      </Card>

      <Card title="Itens da Venda" className="mt-4">
        <div className="row">
          <div className="col-md-4">
            <FormGroup label="Veículo (Chassi): *">
              <Select
                options={veiculosOptions}
                value={itemAtual.veiculo}
                onChange={handleVeiculoChange}
                placeholder="Selecione..."
                isSearchable
              />
            </FormGroup>
          </div>
          <div className="col-md-3">
            <FormGroup label="Modelo:" htmlFor="inputModelo">
              <input
                type="text"
                id="inputModelo"
                value={itemAtual.modelo ? itemAtual.modelo.label : ""}
                className="form-control"
                disabled
              />
            </FormGroup>
          </div>
          <div className="col-md-3">
            <FormGroup label="Desconto do Item (%):" htmlFor="inputDescParcial">
              <input type="number" id="inputDescParcial" value={itemAtual.descontoParcial} className="form-control" onChange={(e) => setItemAtual({ ...itemAtual, descontoParcial: e.target.value })} />
            </FormGroup>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button onClick={handleAddItem} type="button" className="btn btn-primary w-100">
              {editIndex !== null ? "Atualizar" : "Adicionar"}
            </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Chassi</th>
                  <th>Preço do Veículo</th>
                  <th>Desconto (%)</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item, index) => (
                  <tr key={index}>
                    <td>{item.modelo?.label}</td>
                    <td>{item.veiculo?.label}</td>
                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.veiculo?.preco || 0)}</td>
                    <td>{item.descontoParcial}%</td>
                    <td>
                      <IconButton aria-label="edit" onClick={() => handleEditItem(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDeleteItem(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      
      <div className="mt-3">
        <button onClick={salvar} type="button" className="btn btn-success me-2">
          Salvar
        </button>
        <button onClick={() => navigate("/listagem-venda")} type="button" className="btn btn-danger">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CadastroVenda;