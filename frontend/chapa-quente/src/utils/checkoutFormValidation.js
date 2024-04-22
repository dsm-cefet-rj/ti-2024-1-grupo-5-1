const HORA_ABERTURA = 18;
const HORA_FECHAMENTO = 22;

const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
}

function isSameDay(d1, d2) {
    return d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();
}

const tomorrow = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);
    return today;
}

export const validateSchedule = ({ data, hora }) => {
    const errors = {};
    
    if (!data) errors.data = 'Data é obrigatória';
    if (!hora) errors.hora = 'Hora é obrigatória';

    if (errors.data || errors.hora) return errors;

    const agendamentoDate = new Date(`${data}T${hora}:00`);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const agendamentoDateOnly = new Date(agendamentoDate);
    agendamentoDateOnly.setHours(0, 0, 0, 0);

    const isToday = +(agendamentoDateOnly) === +(hoje);

    if (isWeekend(agendamentoDateOnly)) {
        errors.data = 'Não é possível agendar para o fim de semana.';
    }
    
    if (!isToday && agendamentoDateOnly < hoje) {
        errors.data = (errors.data || '') + ' Não é possível agendar para o passado.';
    }

    const horas = agendamentoDate.getHours();
    const agora = new Date();

    if (isToday && (horas < agora.getHours() || !isSameDay(agendamentoDate, agora))) {
        errors.hora = 'Não é possível agendar para horas passadas.';
    }
    else if (horas < HORA_ABERTURA || horas >= HORA_FECHAMENTO) {
        errors.hora = 'Não é possível agendar fora do horário de funcionamento.';
    }

    if (Object.keys(errors).length) {
        throw { errors };
    }

    const agendamentoUnix = agendamentoDate.getTime() / 1000;

    return agendamentoUnix;
}

export const mustSchedule = () => {
    const currentDate = new Date();
    const openingTime = new Date(currentDate);
    openingTime.setHours(HORA_ABERTURA, 0, 0, 0);

    const closingTime = new Date(currentDate);
    closingTime.setHours(HORA_FECHAMENTO, 0, 0, 0);

    if (isWeekend(currentDate)) {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(HORA_ABERTURA, 0, 0, 0);
        return nextDay;
    }

    if (currentDate < openingTime) {
        return openingTime;
    }

    if (currentDate >= closingTime) {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(HORA_ABERTURA, 0, 0, 0);
        return nextDay;
    }

    // Caso contrário, não precisa agendar
    return null;
}
