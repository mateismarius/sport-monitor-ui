
export interface ProductDto {
        crt: number,
        id: number,
        productName: string;
        productBrand?: string;
        description: string;
        category: string;
        inventoryNo: string;
        serialNo?: string;
        productValue?: number;
        ipAddress?: string; 
        employee: string;
        productLocation: string;
        boughtAt?: string;
}