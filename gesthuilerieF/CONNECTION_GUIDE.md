# 🔗 Guide de Connexion Frontend-Backend

## Configuration Actuelle
- **Backend (Spring Boot)**: `http://localhost:8000`
- **Frontend (Angular)**: À démarrer sur le port 4200 (par défaut)
- **Base de données**: MySQL `gestionhuilerie` sur `localhost:3306`

---

## 📋 Étape 1: Configurer CORS sur le Backend Spring Boot

Pour que le frontend puisse communiquer avec le backend, vous DEVEZ ajouter la configuration CORS côté backend.

### Créer une classe `CorsConfig` dans votre projet Spring Boot:

```java
package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")  // URL du frontend
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

**OU** ajouter dans `application.properties`:
```properties
cors.allowed-origins=http://localhost:4200
cors.allowed-methods=GET,POST,PUT,PATCH,DELETE,OPTIONS
cors.allowed-headers=*
cors.max-age=3600
cors.allow-credentials=true
```

---

## 🚀 Étape 2: Démarrer le Backend Spring Boot

1. **Ouvrez votre projet Spring Boot** dans votre IDE (IntelliJ, VS Code, etc.)

2. **Vérifiez que MySQL est en cours d'exécution**:
   - La base `gestionhuilerie` doit exister ou être créée automatiquement (ddl-auto=update)
   - Vérifiez les credentials: `root` / (aucun mot de passe)

3. **Exécutez l'application**:
   ```bash
   # Avec Maven
   mvn spring-boot:run
   
   # Ou avec Gradle
   gradle bootRun
   ```

4. **Vérifiez que le backend est accessible**:
   ```
   http://localhost:8000/api/huileries
   ```
   Vous devriez recevoir une réponse JSON (possiblement un tableau vide `[]`)

---

## 🎨 Étape 3: Démarrer le Frontend Angular

### Terminal 1 - Installer les dépendances (si nécessaire):
```bash
cd c:\Users\takwa\Desktop\GestHuilerieFront\gesthuilerieF
npm install
```

### Terminal 2 - Démarrer le serveur de développement Angular:
```bash
cd c:\Users\takwa\Desktop\GestHuilerieFront\gesthuilerieF
npm start
# ou
ng serve
```

Le frontend démarrera sur: **http://localhost:4200**

---

## ✅ Vérifier la Connexion

1. **Ouvrez le navigateur**: `http://localhost:4200`
2. **Ouvrez la console du navigateur** (F12 → Console)
3. **Accédez à un module** (ex: Machines, Matières Premières, etc.)
4. **Vérifiez qu'il n'y a pas d'erreurs CORS** dans la console

**Erreur CORS typique**:
```
Access to XMLHttpRequest at 'http://localhost:8000/api/...' from origin 
'http://localhost:4200' has been blocked by CORS policy
```
→ Solution: Configurez CORS dans votre Spring Boot (voir Étape 1)

---

## 🔧 Configuration des Environnements

### Pour modifier l'URL du backend:

**Développement** (`environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

**Production** (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.votredomaine.com/api'  // Remplacez par votre URL production
};
```

---

## 📡 Endpoints Disponibles

### Huileries (Oil Mills)
```
GET  /api/huileries               → Récupérer toutes les huileries
POST /api/huileries               → Créer une huilerie
GET  /api/huileries/{id}          → Récupérer une huilerie
PUT  /api/huileries/{id}          → Modifier une huilerie
PATCH /api/huileries/{id}/activate   → Activer une huilerie
PATCH /api/huileries/{id}/deactivate → Désactiver une huilerie
```

### Machines
```
GET  /api/machines                → Récupérer toutes les machines
POST /api/machines                → Créer une machine
GET  /api/machines/{id}           → Récupérer une machine
PUT  /api/machines/{id}           → Modifier une machine
DELETE /api/machines/{id}         → Supprimer une machine
GET  /api/machines/huilerie/{nom} → Machines par huilerie
PATCH /api/machines/{id}/matiere-premiere → Assigner matière première
```

### Matières Premières (Raw Materials)
```
GET  /api/matieresPremieres               → Récupérer toutes
POST /api/matieresPremieres               → Créer
GET  /api/matieresPremieres/{id}          → Récupérer une
PUT  /api/matieresPremieres/{id}          → Modifier
DELETE /api/matieresPremieres/{id}        → Supprimer
```

### Pesées (Weighings)
```
GET  /api/pesees         → Récupérer toutes les pesées
POST /api/pesees         → Créer une pesée (réception)
GET  /api/pesees/{id}    → Récupérer une pesée
GET  /api/pesees/{id}/pdf → Télécharger le bon de pesée (PDF)
```

### Mouvements de Stock
```
GET  /api/stockMovements             → Récupérer tous les mouvements
POST /api/stockMovements             → Créer un mouvement
GET  /api/stockMovements/stock/{id}  → Mouvements par stock
PATCH /api/stockMovements/{id}/type  → Modifier le type de mouvement
```

### Traçabilité
```
GET /api/traceability/lot/{lotId} → Historique complet du lot
```

---

## 🐛 Troubleshooting

### ❌ Erreur: "Cannot GET /api/..."
- Vérifiez que le backend Spring Boot est en cours d'exécution (port 8000)
- Vérifiez l'URL dans la console du navigateur (F12)

### ❌ Erreur CORS
- Configurez la classe `CorsConfig` dans le backend (voir Étape 1)
- Redémarrez le backend après la modification

### ❌ Erreur connexion base de données
- Vérifiez que MySQL est en cours d'exécution
- Vérifiez les credentials dans `application.properties`:
  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/gestionhuilerie
  spring.datasource.username=root
  spring.datasource.password=
  ```

### ❌ Le frontend ne démarre pas
```bash
# Vérifiez Node.js
node --version

# Réinstallez les dépendances
npm install

# Démarrez à nouveau
npm start
```

---

## 💾 Résumé des Modifications du Frontend

✅ **Centralisé les URLs**: Tous les services utilisent désormais `environment.apiUrl`
✅ **Fichiers environment.ts créés**: Pour dev et production
✅ **URL changée de 8069 → 8000**: Pour correspondre à votre backend

### Services mis à jour:
- `huilerie.service.ts`
- `machine.service.ts`
- `raw-material.service.ts`
- `weighing.service.ts`
- `stock-movement.service.ts`
- `traceability.service.ts`
- `lot-olives.service.ts`
- `analyse-laboratoire.service.ts`

---

## 🎯 Prochaines Étapes

1. ✅ Configurez CORS sur le backend
2. ✅ Démarrez MySQL
3. ✅ Démarrez le backend Spring Boot (port 8000)
4. ✅ Démarrez le frontend Angular (port 4200)
5. ✅ Testez la connexion en accédant à `http://localhost:4200`
6. ✅ Vérifiez que les données s'affichent sans erreurs

**Questions?** Vérifiez la console du navigateur (F12) pour les messages d'erreur détaillés.
