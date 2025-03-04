


// export let btnChange : boolean | null

export type Name =  {
        firstName: string,
        lastName: string
}

export type Address = {
houseNumber: string,
area: string,
city: string,
pin: number
}


export enum Roles {
ADMIN = 'Admin',
CUSTOMER = 'Customer',
SUPER_ADMIN = 'Super-Admin'
}

export type User = {
id: number,
name: Name,
email: string,
password: string,
address: Address,
phone: number,
company: string,
website: string,
role: Roles,
}
