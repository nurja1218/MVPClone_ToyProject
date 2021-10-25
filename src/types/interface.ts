
export interface TableColumn {
    title: string;
    dataIndex: string;
}

export interface singleTransport {
    alarmRangeStatusId: string,
    arrivalLocation: string,
    arrivalTime: number,
    certificateStatusId: string,
    departureLocation: string,
    departurePlaceName: string,
    departureTime: number,
    humidity: Array<number>,
    indexTime: number,
    inspectionLocation: string,
    inspectionTime: number,
    interval: number,
    maxHumidity: number,
    maxShock: number,
    maxTemperature: number,
    minHumidity: number,
    minTemperature: number,
    mkt: number,
    productName: string,
    serial: string,
    shock: Array<number>,
    temperature: Array<number>,
    transportStatusId: string,
    userName: string,
    userPhone: string,

}
// Generate Order Data
export interface TableRowData {
    alarmRangeStatusId: string;
    arrivalTime: number;
    certificateStatusId: string;
    departurePlaceName: string;
    departureTime: number;
    id: string;
    key: string;
    productName: string;
    transportStatusId: string;
}

export interface TableData {
    result: Array<TableRowData>
}

export interface StatusCount {
    inTransit: number;
    normal: number;
    abnormal: number;
}
