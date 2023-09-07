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