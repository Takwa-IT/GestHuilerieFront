export interface MatierePremiere {
  idMatierePremiere: number;
  nom: string;
  type: string;
  uniteMesure: string;
  description: string;
}

export const EXAMPLE_MATIERE_PREMIERE_JSON: MatierePremiere[] = [
  {
    idMatierePremiere: 1,
    nom: 'Olive Picholine',
    type: 'Olive',
    uniteMesure: 'kg',
    description: 'Olives recoltees en debut de campagne',
  },
  {
    idMatierePremiere: 2,
    nom: 'Olive Arbequina',
    type: 'Olive',
    uniteMesure: 'kg',
    description: 'Variete a haut rendement',
  },
];