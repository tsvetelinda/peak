export interface SkiPass {
    startDate: Date;
    endDate: Date;
    mountain: string;
    priceRate: 'Adult' | 'Young' | 'Elder';
    qrCodeData: string;
}