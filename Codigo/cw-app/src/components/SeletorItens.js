import '../App.css';

export default function SeletorItens({ itens, selecionados, onSelecionadosChange, nomeAtributo, nomeCategoria }) {
    const toggleSelecionado = (id) => {
        if (selecionados.includes(id)) {
            onSelecionadosChange(selecionados.filter((itemId) => itemId !== id));
        } else {
            onSelecionadosChange([...selecionados, id]);
        }
    };

    const renderItem = (item) => {
        const isSelecionado = selecionados.includes(item.id);

        return (
            <div
                key={item.id}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${isSelecionado ? 'active' : ''
                    }`}
                onClick={() => toggleSelecionado(item.id)}
                role="button"
            >
                {item[nomeAtributo]}
                {isSelecionado && <span className="badge bg-light text-dark">Selecionado</span>}
            </div>
        );
    };

    const disponiveis = itens.filter(a => !selecionados.includes(a.id));
    const selecionadosList = itens.filter(a => selecionados.includes(a.id));

    return (
        <div className="dual-listbox d-flex flex-column flex-md-row gap-4">
            <div className="w-50">
                <h5 className="text-center fs-6 text-muted">{nomeCategoria} disponíveis</h5>
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
