export interface PaginancionRequest {
    page: number,
    size: number,
    order: string,
    asc: boolean
}

// clases es necesario solo para hacer calculo o utilizar metodos las interface solo sirve para enviar datos