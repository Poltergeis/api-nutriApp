export const validateJustLetters = (value) => {
    return /^[a-zA-Z\s]+$/.test(value);
}

export const validateMotivo = (value) => {
    return /^[a-zA-Z0-9\s()\-.'",]+$/.test(value);
}

export const validateFecha = (value) => {
    return /^\d{2}[-/]\d{2}[-/]\d{4}$/.test(value);
}