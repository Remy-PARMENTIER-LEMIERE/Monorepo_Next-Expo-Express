# Application Mobile (Expo)

Application React Native avec Expo, utilisant le routing basé sur les fichiers (expo-router).

## Prérequis

1. **Compte Expo** : Crée un compte sur [expo.dev](https://expo.dev/signup) si ce n'est pas déjà fait
2. **Connexion EAS** : Depuis la racine du monorepo, connecte-toi :
   ```bash
   pnpm exec eas login
   ```

## Démarrage rapide

### Première utilisation

1. **Installe les dépendances** (depuis la racine du monorepo) :
   ```bash
   pnpm install
   ```

2. **Crée ton premier development build** :
   ```bash
   pnpm build:dev
   ```
   > Le build se fait dans le cloud Expo (5-15 min). Tu recevras un lien pour télécharger l'APK/app.

3. **Installe le build** sur ton appareil ou émulateur

4. **Lance le serveur de développement** :
   ```bash
   pnpm dev
   ```

5. **Ouvre l'app** et scanne le QR code

### Utilisation quotidienne

Une fois le build installé, tu n'as besoin que de :

```bash
pnpm dev
```

Toutes tes modifications de code sont reflétées **instantanément** grâce au Fast Refresh.

## Scripts disponibles

| Script | Description |
|--------|-------------|
| `pnpm dev` | Démarre le serveur Metro avec dev-client |
| `pnpm android` | Démarre sur Android avec dev-client |
| `pnpm ios` | Démarre sur iOS avec dev-client |
| `pnpm web` | Démarre la version web |
| `pnpm build:dev` | Build de développement (Android + iOS) |
| `pnpm build:dev:android` | Build de développement Android |
| `pnpm build:dev:ios` | Build de développement iOS |
| `pnpm build:preview` | Build de preview (test interne) |
| `pnpm build:production` | Build de production |
| `pnpm lint` | Vérifie le code avec Biome |
| `pnpm lint:fix` | Corrige automatiquement les erreurs |

## Quand rebuilder ?

Tu dois recréer un development build **uniquement** si :

- Tu ajoutes une nouvelle dépendance avec du **code natif**
- Tu modifies les **plugins Expo** dans `app.json`
- Tu changes la configuration native (permissions, icônes, splash screen, etc.)

> Les modifications de code TypeScript/JavaScript ne nécessitent **jamais** de rebuild.

## Structure du projet

```
app/                  # Routes (file-based routing)
├── (auth)/           # Routes d'authentification
├── (protected)/      # Routes protégées
└── _layout.tsx       # Layout racine
assets/               # Images et ressources
components/           # Composants réutilisables
constants/            # Constantes (thème, etc.)
hooks/                # Hooks personnalisés
lib/                  # Utilitaires (auth, etc.)
```

## Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
