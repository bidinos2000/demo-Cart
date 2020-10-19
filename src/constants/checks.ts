export const isEmail = (value: string) => {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value) ? undefined : 'You must enter username is E-mail';
}

export const isDigit = (value: string) => {
    let regex = /^\d+$/;
    return regex.test(value) ? undefined : "You must enter number";
}