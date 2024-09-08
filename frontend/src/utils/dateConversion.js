export const getFormattedDate = (date) => {
    const dateObject = new Date(date);
    return new Date(dateObject).toLocaleDateString('pt-BR');
}

export const getFormattedTime = (date) => {
    const dateObject = new Date(date);
    return new Date(dateObject).toLocaleTimeString('pt-BR');
}

export const getFormattedDateAndTime = (date) => {
    const dateObject = new Date(date);
    return `${getFormattedDate(dateObject)} ${getFormattedTime(dateObject)}`;
}

export const getTimeDifference = (date) => {
    const dateObject = new Date(date);
    const current = Math.floor(Date.now() / 1000);
    const diff = current - dateObject;
    const timeUnits = [
        { unit: 'ano', duration: 31536000 },
        { unit: 'mês', duration: 2628000 },
        { unit: 'dia', duration: 86400 },
        { unit: 'hora', duration: 3600 },
        { unit: 'minuto', duration: 60 },
        { unit: 'segundo', duration: 1 }
    ];

    for (const unit of timeUnits) {
        const value = Math.floor(diff / unit.duration);
        if (value > 0) {
            return `${value} ${unit.unit}${value > 1 ? 's' : ''} atrás`;
        }
    }

    return 'agora';
}