export interface Entreprise {
  idEntreprise: number;
  nom: string;
  adresse: string;
  telephone: string;
  email: string;
}

export interface Huilerie {
  idHuilerie: number;
  nom: string;
  localisation: string;
  type: string;
  certification: string;
  capaciteProduction: number;
  entrepriseId: number;
  active: boolean;
}

export interface Machine {
  idMachine: number;
  nomMachine: string;
  typeMachine: string;
  etatMachine: string;
  capacite: number;
  huilerieId: number;
}

export interface Maintenance {
  idMaintenance: number;
  dateMaintenance: string;
  type: string;
  observations: string;
  machineId: number;
}

export interface CampagneOlives {
  idCampagne: number;
  annee: String;
  dateDebut: string;
  dateFin: string;
  huilerieId: number;
}

export const EXAMPLE_HUILERIES_JSON: Huilerie[] = [
  {
    idHuilerie: 1,
    nom: 'Huilerie Atlas',
    localisation: 'Fes',
    type: 'Industrielle',
    certification: 'ISO 22000',
    capaciteProduction: 45000,
    entrepriseId: 1,
    active: true,
  },
  {
    idHuilerie: 2,
    nom: 'Huilerie Rif',
    localisation: 'Taza',
    type: 'Cooperative',
    certification: 'ONSSA',
    capaciteProduction: 28000,
    entrepriseId: 1,
    active: false,
  },
];

export const EXAMPLE_MACHINES_JSON: Machine[] = [
  {
    idMachine: 1,
    nomMachine: 'Presse P-01',
    typeMachine: 'Presse',
    etatMachine: 'EN_SERVICE',
    capacite: 12000,
    huilerieId: 1,
  },
  {
    idMachine: 2,
    nomMachine: 'Decanteur D-02',
    typeMachine: 'Decanteur',
    etatMachine: 'SURVEILLANCE',
    capacite: 9000,
    huilerieId: 1,
  },
];