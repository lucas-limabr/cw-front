import '../App.css';

export default function SeletorAcessorios({ acessorios, selecionados, onSelecionadosChange }) {
    const toggleSelecionado = (id) => {
        if (selecionados.includes(id)) {
            onSelecionadosChange(selecionados.filter((itemId) => itemId !== id));
        } else {
            onSelecionadosChange([...selecionados, id]);
        }
    };

    const renderItem = (acessorio) => {
        const isSelecionado = selecionados.includes(acessorio.id);

        return (
            <div
                key={acessorio.id}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${isSelecionado ? 'active' : ''
                    }`}
                onClick={() => toggleSelecionado(acessorio.id)}
                role="button"
            >
                {acessorio.descricao}
                {isSelecionado && <span className="badge bg-light text-dark">Selecionado</span>}
            </div>
        );
    };

    const disponiveis = acessorios.filter(a => !selecionados.includes(a.id));
    const selecionadosList = acessorios.filter(a => selecionados.includes(a.id));

    return (
        <div className="dual-listbox d-flex flex-column flex-md-row gap-4">
            <div className="w-50">
                <h5 className="text-center fs-6 text-muted">Acessórios disponíveis</h5>
                <div className="list-group list-group-flush border rounded scrollbox">
                    {disponiveis.map(renderItem)}
                </div>
            </div>

            <div className="w-50">
                <h5 className="text-center fs-6 text-muted">Selecionados</h5>
                <div className="list-group list-group-flush border rounded scrollbox">
                    {selecionadosList.map(renderItem)}
                </div>
            </div>
        </div>
    );
}
