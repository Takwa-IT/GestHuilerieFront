export interface LotOlives {
  idLot: number;
  varieteOlive: string;
  maturite: string;
  origine: string;
  dateRecolte: string;
  dateReception: string;
  dureeStockageAvantBroyage: number;
  quantiteInitiale: number;
  quantiteRestante: number;
  matierePremiereId: number;
  campagneId: number;
}

export interface AnalyseLaboratoire {
  idAnalyse: number;
  acidite: number;
  indicePeroxyde: number;
  k232: number;
  k270: number;
  classeQualiteFinale: string;
  dateAnalyse: string;
  lotId: number;
}

export interface TraceabilityEvent {
  date: string;
  etape: 'LOT_OLIVES' | 'PESEE' | 'PRODUCTION' | 'PRODUIT_FINAL' | 'STOCK';
  description: string;
  reference: string;
}

export const EXAMPLE_TRACEABILITY_JSON: TraceabilityEvent[] = [
  {
    date: '2026-03-10 07:30',
    etape: 'LOT_OLIVES',
    description: 'Reception lot OL-031 variete Picholine',
    reference: 'LOT-OL-031',
  },
  {
    date: '2026-03-10 08:05',
    etape: 'PESEE',
    description: 'Pesee net enregistree 11 000 kg',
    reference: 'PES-0001',
  },
  {
    date: '2026-03-10 11:30',
    etape: 'PRODUCTION',
    description: 'Demarrage extraction sur ligne P-01',
    reference: 'PROD-0102',
  },
  {
    date: '2026-03-10 15:40',
    etape: 'PRODUIT_FINAL',
    description: 'Huile vierge extra produite 2 120 L',
    reference: 'PF-0441',
  },
  {
    date: '2026-03-10 16:10',
    etape: 'STOCK',
    description: 'Entree stock cuve C1',
    reference: 'STK-8892',
  },
];