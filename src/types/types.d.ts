type Btn =  {
    children: any,
    type: any, 
    onClick: any, 
    buttonStyle: any, 
    buttonSize: any, 
    buttonColor: any,
}

type Menus = {
    name: string,
    to: string,
    exact: boolean,
    icon: any,
}

type Mess = {
    messEmail : string,
    messPassword: string,
}

type MessRegister = {
    messEmail : string,
    messPassword: string,
    messConfirm: string,
}

type Acc = {
    email: string,
    password: string
}

type Product = {
    id: any,
    name: string,
    descriptions: string,
    price: number,
    quantity: number,
    image: string,
    status: boolean,
    number: number,
}

type resLogin = {
    code: number,
    message: string,
    token: string,
}

type DataInfor = {
    id: string,
    email: string,
    password:string,
    firstName: string,
    lastName: string,
}

type DataHistory = {
    id: any,
    date: string,
    idUser: string,
    product: Product
}