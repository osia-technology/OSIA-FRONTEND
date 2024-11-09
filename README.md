# OSIA VERSION 2

Ce projet est une application web utilisant Laravel 11 pour la partie backend et React pour le frontend. La configuration nécessite Node.js 18 pour les dépendances JavaScript, et Composer pour gérer les dépendances PHP.

## Prérequis

- **PHP** 8.1+
- **Composer**
- **Node.js** 18.x
- **NPM** ou **Yarn**
- **MySQL** ou autre base de données supportée par Laravel

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-utilisateur/votre-projet.git
   cd votre-projet
   ```

2. **Installer les dépendances PHP**
   ```bash
   composer install
   ```

3. **Installer les dépendances JavaScript**
   ```bash
   npm install
   # ou si vous préférez Yarn
   yarn install
   ```

4. **Configurer l'environnement**
    - Copier le fichier `.env.example` pour créer un fichier `.env` :
      ```bash
      cp .env.example .env
      ```
    - Mettre à jour les variables de configuration (connexion à la base de données, etc.) dans le fichier `.env`.

5. **Générer la clé de l'application**
   ```bash
   php artisan key:generate
   ```

6. **Migrer la base de données**
   ```bash
   php artisan migrate
   ```

7. **Compiler les assets**
    - Pour compiler en mode développement avec hot reload :
      ```bash
      npm run dev
      ```
    - Pour une compilation de production :
      ```bash
      npm run build
      ```

## Lancer l'application

1. **Lancer le serveur Laravel**
   ```bash
   php artisan serve
   ```
   Cela démarre le backend Laravel à l'adresse `http://127.0.0.1:8000`.

2. **Démarrer le frontend React**
   ```bash
   npm run dev
   ```
   Le frontend React sera servi, habituellement sur `http://localhost:3000`.

## Utilisation

- Accéder au frontend via `http://localhost:3000`.
- Le backend Laravel sera accessible via `http://127.0.0.1:8000` pour toutes les API.

## Commandes utiles

- **Tests unitaires Laravel** :
  ```bash
  php artisan test
  ```

- **Linting et formatage JavaScript** :
  ```bash
  npm run lint
  npm run format
  ```

## Déploiement

Pour déployer en production, assurez-vous d'utiliser les commandes de build appropriées et configurez correctement votre serveur pour servir Laravel et React.

## Contributions

Les contributions sont les bienvenues ! Merci de soumettre une **pull request** ou d'ouvrir une **issue** pour discuter de changements potentiels.

## Licence
 
Ce projet est sous licence [MIT](LICENSE).
```

Ce fichier devrait couvrir l'installation de base et le lancement du projet Laravel/React avec Node.js 18.