export class ResponseModel {
    Header: Header;
    Data: any;
}

export class Header {
    StatusCode: number;
    Status: string;
    Desc: string;
}
