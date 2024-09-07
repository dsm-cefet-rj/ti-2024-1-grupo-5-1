
export const calculateDifference = (date) => {
    const current = Math.floor(Date.now() / 1000);
    const diff = current - date;
    return diff;
};

export const formatDifferenceFromUnix = (date) => {
    const diff = calculateDifference(date);
    return formatDifference(diff);
};

export const getDateFromUnix = (date) => {
    const d = new Date(date * 1000);
    return d.toLocaleDateString();
};

export const getFormattedDateTime = (date) => { 
    const formattedDate = new Date(date);

    const anos = formattedDate.getFullYear();
    const mes = formattedDate.getMonth() + 1;
    const dia = formattedDate.getDate();
    const hora = formattedDate.getHours();
    const minuto = formattedDate.getMinutes();

    return `${dia}/${mes}/${anos} ${hora}:${minuto}`;
};

export const getDaysDifference = (date) => {
    const current = Math.floor(Date.now() / 1000);
    const diff = current - date;
    return Math.floor(diff / 86400);
};