import sanitizeHtml from "sanitize-html"

export const validateNombre = (nombre) => {
    let nombreLimpio = sanitizeHtml(nombre).trim();
    const regex = /[^A-Za-z\s]/g;
    nombreLimpio = nombreLimpio.replace(regex, '');

    return nombre === nombreLimpio;
}

export const validateEmail = (email) => {
    let emailLimpio = sanitizeHtml(email).trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
    emailLimpio.replace(regex,'');
    return email === emailLimpio;
}

export const validatePassword = (psw) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[^\w\s])(?!.*\s).{8,}$/;
    return regex.test(psw);
}