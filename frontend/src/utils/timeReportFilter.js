export const ordenarVendas = (periodo, data) => {
    const agora = new Date();
    const ultimaHora = new Date(agora.getTime() - (24 * 60 * 60 ));
    ultimaHora.setMinutes(0, 0, 0);

    const ultimos7Dias = new Date(agora.getTime() - 7 * 24 * 3600 );
    const ultimoAno = new Date(agora.getFullYear() - 1, agora.getMonth(), agora.getDate());
    const anoAtual = agora.getFullYear();

    const datasConvertidas = data.map(pedido => new Date(pedido.date_pedido ));
    const dataMaisAntiga = new Date(Math.min(...datasConvertidas));
    let anoPrimeiroRegistro = dataMaisAntiga.getFullYear();

    const dataFiltradaParaPeriodo = data.filter(pedido => {
        const dataPedido = new Date(pedido.date_pedido);
        switch (periodo) {
            case 'hora':
                return dataPedido >= ultimaHora;
            case 'dia':
                return dataPedido >= ultimos7Dias;
            case 'mes':
                return dataPedido >= ultimoAno;
            case 'ano':
                return dataPedido.getFullYear() >= anoPrimeiroRegistro;
            default:
                return false;
        }
    });

    const vendasPorPeriodo = dataFiltradaParaPeriodo.reduce((acc, pedido) => {
        let chave;
        const dataPedido = new Date(pedido.date_pedido );
        switch (periodo) {
            case 'hora':
                chave = `${dataPedido.toLocaleTimeString('pt-BR', { hour: '2-digit', hour12: false })}:00 (${dataPedido.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })})`;
                break;
            case 'dia':
                chave = `${dataPedido.toLocaleDateString('pt-BR', { weekday: 'long' })} (${dataPedido.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })})`;
                break;
            case 'mes': 
                chave = `${dataPedido.toLocaleString('pt-BR', { month: 'long' })}/${dataPedido.getFullYear()}`;
                break;
            case 'ano':
                chave = dataPedido.getFullYear().toString();
                break;
            default:
                return acc;
        }

        acc[chave] = (acc[chave] || 0) + 1;
        return acc;
    }, {});

    return vendasPorPeriodo;
};
