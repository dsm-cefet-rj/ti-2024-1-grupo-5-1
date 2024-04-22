export const ordenarVendas = (periodo, data) => {
    const agora = new Date();
    const ultimaHora = new Date(agora.getTime() - (24 * 60 * 60 * 1000));
    ultimaHora.setMinutes(0, 0, 0); // Zera os minutos, segundos e milissegundos para formatação

    const ultimos7Dias = new Date(agora - 7 * 24 * 3600 * 1000);
    const ultimoMesMesmoAno = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const anoAtual = agora.getFullYear();

    let anoPrimeiroRegistro;
    const datasConvertidas = data.map(pedido => new Date(pedido.date * 1000));
    const dataMaisAntiga = new Date(Math.min.apply(null, datasConvertidas));
    anoPrimeiroRegistro = dataMaisAntiga.getFullYear();

    const dataFiltradaParaPeriodo = data.filter(pedido => {
        const dataPedido = new Date(pedido.date * 1000);
        switch (periodo) {
            case 'hora':
                return dataPedido >= ultimaHora;
            case 'dia':
                anoPrimeiroRegistro = Math.min(anoPrimeiroRegistro, dataPedido.getFullYear());
                return dataPedido >= ultimos7Dias;
            case 'mes':
                return dataPedido.getFullYear() === anoAtual || (dataPedido.getMonth() >= agora.getMonth() && dataPedido.getFullYear() === ultimoMesMesmoAno.getFullYear());
            case 'ano':
                anoPrimeiroRegistro = Math.min(anoPrimeiroRegistro, dataPedido.getFullYear());
                return dataPedido.getFullYear() >= anoPrimeiroRegistro;
        }
    });

    const vendasPorPeriodo = dataFiltradaParaPeriodo.reduce((acc, pedido) => {
        let chave;
        const dataPedido = new Date(pedido.date * 1000);
        switch (periodo) {
            case 'hora':
                chave = `${dataPedido.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: undefined, hour12: false })}:00 (${dataPedido.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })})`;
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
        }

        acc[chave] = (acc[chave] || 0) + 1;
        return acc;
    }, {});

    return vendasPorPeriodo;
};