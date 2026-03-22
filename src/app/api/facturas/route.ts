import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simulate connection to Litardovera SRI Gateway
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Extracted live data from Litardovera Reportes -> Ventas
    const invoices = [
      { id: '001-002-00000552', ruc: '0908862907', client: 'Patricia Baquerizo', date: '2026-03-03', v0: 110.00, v15: 0.00, iva: 0.00, total: 110.00, status: 'AUTORIZADA' },
      { id: '001-002-00000553', ruc: '0907704571', client: 'Monica Daccach', date: '2026-03-03', v0: 115.00, v15: 0.00, iva: 0.00, total: 115.00, status: 'AUTORIZADA' },
      { id: '001-002-00000554', ruc: '0914815972001', client: 'Juan Xavier Muñoz', date: '2026-03-03', v0: 20.00, v15: 0.00, iva: 0.00, total: 20.00, status: 'AUTORIZADA' },
      { id: '001-002-00000555', ruc: '0908390230', client: 'Gabriela Cadena', date: '2026-03-03', v0: 95.00, v15: 0.00, iva: 0.00, total: 95.00, status: 'AUTORIZADA' },
      { id: '001-002-00000556', ruc: '0905953253', client: 'Ana Maria Vries', date: '2026-03-03', v0: 37.00, v15: 0.00, iva: 0.00, total: 37.00, status: 'AUTORIZADA' },
      { id: '001-002-00000557', ruc: '0905953253', client: 'Ana Maria Vries', date: '2026-03-03', v0: 20.00, v15: 0.00, iva: 0.00, total: 20.00, status: 'AUTORIZADA' },
      { id: '001-002-00000558', ruc: '0910565068001', client: 'Stefania Wright', date: '2026-03-04', v0: 154.50, v15: 0.00, iva: 0.00, total: 154.50, status: 'AUTORIZADA' },
      { id: '001-002-00000559', ruc: '0913104584', client: 'Diana Rodriguez', date: '2026-03-04', v0: 29.00, v15: 0.00, iva: 0.00, total: 29.00, status: 'AUTORIZADA' },
      { id: '001-002-00000560', ruc: '0930054358', client: 'Manuela Gomez', date: '2026-03-04', v0: 205.00, v15: 0.00, iva: 0.00, total: 205.00, status: 'AUTORIZADA' },
      { id: '001-002-00000561', ruc: '0910777804', client: 'Martha Rios', date: '2026-03-04', v0: 15.00, v15: 0.00, iva: 0.00, total: 15.00, status: 'AUTORIZADA' },
      { id: '001-002-00000562', ruc: '0919965418', client: 'Nathalia Velasquez', date: '2026-03-04', v0: 65.00, v15: 0.00, iva: 0.00, total: 65.00, status: 'AUTORIZADA' },
      { id: '001-002-00000563', ruc: '0902895391', client: 'Monica Bucheli', date: '2026-03-04', v0: 175.00, v15: 0.00, iva: 0.00, total: 175.00, status: 'AUTORIZADA' },
      { id: '001-002-00000564', ruc: '0922845607', client: 'Amalia Fernandez', date: '2026-03-04', v0: 165.00, v15: 0.00, iva: 0.00, total: 165.00, status: 'AUTORIZADA' },
      { id: '001-002-00000565', ruc: '0910565159', client: 'Lorena Garcia', date: '2026-03-04', v0: 165.00, v15: 0.00, iva: 0.00, total: 165.00, status: 'AUTORIZADA' },
      { id: '001-002-00000566', ruc: '0911402634', client: 'Andrea Sotomayor', date: '2026-03-05', v0: 78.00, v15: 0.00, iva: 0.00, total: 78.00, status: 'AUTORIZADA' },
      { id: '001-002-00000567', ruc: '0907419600001', client: 'Alexandra Valdivieso', date: '2026-03-05', v0: 80.00, v15: 0.00, iva: 0.00, total: 80.00, status: 'AUTORIZADA' },
      { id: '001-002-00000568', ruc: '0924733058001', client: 'Priscila Ramos', date: '2026-03-05', v0: 217.00, v15: 0.00, iva: 0.00, total: 217.00, status: 'AUTORIZADA' },
      { id: '001-002-00000569', ruc: '0915033146', client: 'Valentina Intriago', date: '2026-03-05', v0: 20.00, v15: 0.00, iva: 0.00, total: 20.00, status: 'AUTORIZADA' },
      { id: '001-002-00000570', ruc: '0911301620001', client: 'Fabian Cedeño Crespin', date: '2026-03-05', v0: 75.00, v15: 0.00, iva: 0.00, total: 75.00, status: 'AUTORIZADA' },
      { id: '001-002-00000571', ruc: '0902718618', client: 'Maria Lourdes Cañarte', date: '2026-03-05', v0: 75.00, v15: 0.00, iva: 0.00, total: 75.00, status: 'AUTORIZADA' }
    ];
    
    return NextResponse.json(invoices);
    
  } catch (error) {
    console.error("Error API Litardovera:", error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
