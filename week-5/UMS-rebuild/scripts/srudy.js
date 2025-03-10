const str: string = "Hello world"
const num: number = 40;
const bool: boolean = false;
const arr: [string] =["hello"]
const arr2: string[] = ["hello 2"]
const arrOfNum: [number] = [1]
const arrOfNum2: number[] =[3]
const ArrOFNum: Function =() => {}
const variable: any = ''
interface Example {
  getBrandName: Function;
}

type _Car = {
  color: string
  model: number
  brand: Brand
}
type Brand = 'Maruti'|'Ford'|'Toyota'

class Car {
  public color: string = 'white';
  public model: number  = 2015;

  public brand: Brand = 'Maruti';
  constructor(props: _Car){  
    const { color, model, brand } = props
    this.color = color
    this.model = model
    this.brand = brand
    // const color = props.color
  }

}

class Maruti extends Car {
  constructor(props: _Car) {
    super(props)
  }

}
class Ford extends Maruti implements Example{
  constructor(props: _Car) {
    super(props)
  }
  getBrandName = ():Brand => {
    return this.brand
  }
}

console.log("hell")

type Address = {
    street: string,
    house_no: string,
    city: string,
    zipcode: number
  }
  type Role = 'CUSTOMER' | 'ADMIN' | 'SUPER-ADMIN'
  enum Roles_enum {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    'SUPER_ADMIN' = 'SUPER-ADMIN'
  }
  type Company = {
    name: string,
    url: string
  }
  type User = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    address: Address,
    role: Role,
    phone: number,
    website: string,
    company: Company,
    password: string,
  }
  const API_URL: Record<string, string> = {
    USER: 'http://localhost:3000/users'
  }
  const TABLE_HEADING_ELEMENT = document.getElementById('table-heading-row') as HTMLTableRowElement
  const TABLE_HEADINGS = ["ID", "Name", "Email", "Address", "Phone", "Role", "Company website", "Actions"]
  
  const TABLE_BODY_ROWS_ELEMENT = document.getElementById('table-body-rows') as HTMLTableRowElement
  const loadTableHeadings = (headings: string[]) => {
    TABLE_HEADING_ELEMENT.innerHTML = ''
    headings.forEach(heading => {
      TABLE_HEADING_ELEMENT.innerHTML += createTableHeadingElement(heading)
    })
  }
  
  const createTableHeadingElement = (heading: string) => {
    return `
    <th>${heading}</th>
    `
  }
  const loadTableRows = (rows: User[]) => {
    TABLE_BODY_ROWS_ELEMENT.innerHTML = ''
    rows.forEach(row => {
      TABLE_BODY_ROWS_ELEMENT.innerHTML += createTableRowElement(row)
    })
  }
  const onEditClick = (userId: number) => {
  }
  
  const onDeleteClick = (userId: number) => {
  
  }
  const createTableRowElement = (rowDetails: User) => {
    return `
                <tr>
                <td>${rowDetails.id}</td>
  
                <td>${rowDetails.first_name + " " + rowDetails.last_name}</td>
                <td>${rowDetails.email}</td>
                <td>${rowDetails.address.house_no + ", " + rowDetails.address.street + ", " + rowDetails.address.city}</td>
                <td>${rowDetails.phone}</td>
                <td>${rowDetails.role}</td>
                <td><a href=${rowDetails.company.url}>${rowDetails.company.name}</a></td>
  
                <td>
                  <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons"
                      data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                  <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons"
                      data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
              </tr>`
  }
  window.addEventListener('load', async () => {
    loadTableHeadings(TABLE_HEADINGS)
    const userList = await fetchUserList()
    loadTableRows(userList)
  
  })
  
  const fetchUserList = async (): Promise<User[]> => {
    const apiResponse = await fetch(API_URL.USER)
    const response = await apiResponse.json()
    return response
  }