import * as Xlsx from 'xlsx'
export function importExcel(file: File) {
    return new Promise<any>((resolve, reject) => {
        const bufReader = new FileReader();
        bufReader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            let workbook = Xlsx.read(arrayBuffer, { type: 'array' })
            const sheetName = workbook.SheetNames.at(0) as any;
            const sheet = workbook.Sheets[sheetName];
            let data = Xlsx.utils.sheet_to_json(sheet);
            resolve(data)
        }
        bufReader.onerror = (e) => {
            reject(e)
        }
        bufReader.readAsArrayBuffer(file);
    })
}

export function exportExcel(data: any[], fileName: string) {
    const wb = Xlsx.utils.book_new();
    const ws = Xlsx.utils.json_to_sheet(data.map(item => {
        let newData = { ...item };
        delete newData.open;
        delete newData.id;
        delete newData.create_time;
        return newData;
    }));
    Xlsx.utils.book_append_sheet(wb, ws, fileName);
    Xlsx.writeFile(wb, fileName);
}