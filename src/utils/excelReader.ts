import * as XLSX from 'xlsx';

export interface Contact {
    Name: string;
    Designation: string;
    JoiningDate: string;
    Mobile: string;
    Company: string;
    Cadre?: string;
}

export const readExcelFile = async (file: Blob): Promise<Contact[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
                const data = e.target?.result as ArrayBuffer;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];  // Get the first sheet
                const sheet = workbook.Sheets[sheetName];

                if (!sheet) {
                    throw new Error('Sheet not found');
                }

                // Convert the sheet to JSON format
                const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

                // Map the data to match the Contact interface
                const contacts: Contact[] = jsonData.map(row => ({
                    Name: row['Name'],                // Full name of the contact
                    Designation: row['Designation'],  // Job title
                    JoiningDate: row['Joining Date'], // Date of joining
                    Mobile: row['Mobile'],            // Phone number
                    Company: row['Company'],          // Company name
                    Cadre: row['Cadre']               // Job cadre (optional)
                }));

                resolve(contacts);
            } catch (error) {
                console.error('Error processing the file:', error);
                reject(error);
            }
        };

        reader.onerror = (err) => {
            console.error('FileReader error:', err);
            reject(err);
        };

        reader.readAsArrayBuffer(file);
    });
};
