# GesthuilerieF

Application web PFE pour la gestion de la production d'une huilerie.

## Stack technique

- Angular 15.2.11 (compatible Node 16)
- Nebular 11 (base dashboard type ngx-admin)
- Thème personnalisé palette vert olive

## Modules initiaux disponibles

- Dashboard Responsable Production: suivi stock, extraction, qualité, collecte données IA
- Dashboard Administrateur: supervision globale, indicateurs système

## Lancer le projet

```bash
npm install
npm start
```

Application disponible sur `http://localhost:4200`.

## Build production

```bash
npm run build
```

## Notes de compatibilité

- Le projet est volontairement en architecture `NgModule` (non-standalone)
- Ce choix assure la compatibilité directe avec l'approche ngx-admin/Nebular
