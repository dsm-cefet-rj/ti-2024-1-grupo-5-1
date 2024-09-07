const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
}

const tomorrow = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);
    return today;
}

export const validate = ({ data, hora }) => {

    const horaAberto = 14;
    const horaFechado = 22;
     
    const errors = {};

    if (!data) errors.data = 'Data é obrigatória';
    if (!hora) errors.hora = 'Hora é obrigatória';

    if (errors.data || errors.hora) return errors;

    const agendamentoDate = new Date(`${data}T${hora}:00`);

    const dateOnly = new Date(agendamentoDate);
    dateOnly.setHours(0, 0, 0, 0);

    if (isWeekend(dateOnly)) {
        errors.data = 'Não é possível agendar para o fim de semana.';
    }
    if (dateOnly < tomorrow()) {
        errors.data = (errors.data || '') + ' Não é possível agendar para hoje ou para o passado.';
    }

    const horas = agendamentoDate.getHours();
    const minutos = agendamentoDate.getMinutes();

    if (horas < horaAberto || horas >= horaFechado) {
        errors.hora = 'Não é possível agendar fora do horário.';
    }

    if (Object.keys(errors).length) {
        throw { errors };
    }

    const agendamentoUnix = agendamentoDate.getTime() / 1000;

    return agendamentoUnix;
}