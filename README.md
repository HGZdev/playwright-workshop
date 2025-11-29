# Warsztaty Playwright - MiniBank

Prosty projekt aplikacji bankowej stworzony do nauki testowania z Playwright.

## 🚀 Instalacja

### Instalacja Node.js i npm

#### Windows:

https://nodejs.org/en/download/

#### MacOS (obsługa przez nvm "Node Version Manager"):

```bash
# instalacja nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

```bash
# inicializacja nvm
source ~/.zshrc # lub otwórz ponownie terminal
```

```bash
# sprawdź wersję nvm (powinno wyświetlić numer wersji)
nvm --version
```

```bash
# zainstaluj najnowszą stabilną wersję Node.js (LTS):
nvm install --lts
```

```bash
# ustaw ją jako domyślną wersję (LTS):
nvm alias default 'lts/*'
```

```bash
# ustaw domyślną wersję:
nvm use default
```

```bash
# sprawdź wersję Node.js (powinno wyświetlić numer wersji)
node --version
```

```bash
# sprawdź wersję npm (powinno wyświetlić numer wersji)
npm --version
```

### Instalacja zależności w projekcie

```bash
npm install
```

### Instalacja (globalna) Playwright

```bash
npx playwright install
```

### Instalacja wtyczki Playwright Test do VSCode:

Playwright Test for VSCode - https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

## 🏃 Uruchamianie projektu

### Uruchomienie aplikacji w trybie developerskim (serwer + klient)

```bash
npm run dev
```

Aplikacja (klient) będzie dostępna pod adresem: `http://localhost:5173`

Server (API) będzie działał pod adresem: `http://localhost:3001`

### Uruchom testy E2E w terminalu

```bash
npx playwright test # uruchom wszystkie testy E2E

npx playwright test --ui # uruchom wszystkie testy E2E w trybie UI

npx playwright test --headed # uruchom wszystkie testy E2E z otwartą przeglądarką

npx playwright test --headed --ui # uruchom wszystkie testy E2E z otwartą przeglądarką w trybie UI

npx playwright test --project="login" # uruchom wszystkie testy E2E tylko z jednego projektu

npx playwright test --test="userAuth.spec.ts" # uruchom wszystkie testy E2E tylko z jednego pliku

npx playwright test --test="<nazwa testu>" # uruchom wszystkie testy E2E tylko jeden test
```

## Skrócona struktura projektu

```
playwright-workshop/
├── _server/                    # Backend aplikacji
├── data/                       # Dane aplikacji
│   └── database.db            # Baza danych (SQLite)
├── src/                        # Frontend aplikacji
│   ├── pages/                        # Strony aplikacji
│   │   ├── AdminDashboardPage.tsx    # Panel administracyjny
│   │   ├── DashboardPage.tsx         # Strona główna użytkownika
│   │   ├── EditUserPage.tsx          # Edycja użytkownika
│   │   ├── LoginPage.tsx             # Strona logowania
│   │   ├── RegisterPage.tsx          # Strona rejestracji
│   │   ├── TransactionPage.tsx       # Strona przelewów i doładowań
│   │   └── UnauthorizedPage.tsx
├── tests/                     # Testy E2E Playwright
│   ├── pages/    # Page Object Models
│   │   ├── AdminPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegistrationPage.ts
│   │   └── TransactionPage.ts
│   ├── utils/                # Narzędzia pomocnicze dla testów
│   │   ├── resetDatabase.ts # Reset bazy danych
│   │   └── userDataGenerator.ts # Generowanie danych użytkownika
│   ├── global.setup.ts       # Globalna konfiguracja testów
│   ├── moneyAdditions.spec.ts # Testy doładowań konta
│   ├── moneySending.spec.ts # Testy przelewów
│   ├── smoke.spec.ts         # Testy smoke
│   └── userAuth.spec.ts      # Testy autoryzacji użytkowników
├── playwright.config.ts       # Konfiguracja Playwright
└── README.md                  # Ten plik
```

## 📁 Pełna struktura projektu

```
playwright-workshop/
├── _server/                    # Backend aplikacji
│   ├── controllers/           # Kontrolery API
│   │   ├── accountController.ts
│   │   ├── adminController.ts
│   │   └── authController.ts
│   ├── database/              # Baza danych i typy
│   │   ├── database.ts
│   │   ├── initalData.ts
│   │   └── types.d.ts
│   ├── middleware/            # Middleware (autoryzacja userów, role)
│   │   ├── authMiddleware.ts
│   │   └── roleMiddleware.ts
│   ├── routes/                # Definicje endpointów
│   │   ├── accountRoutes.ts
│   │   ├── adminRoutes.ts
│   │   └── authRoutes.ts
│   ├── services/              # Logika biznesowa
│   │   ├── accountService.ts
│   │   ├── authService.ts
│   │   └── usersService.ts
│   ├── utils/                 # Narzędzia pomocnicze
│   │   ├── delay.ts
│   │   └── errorMessages.ts
│   └── server.ts              # Główny plik serwera
├── data/                       # Dane aplikacji
│   └── database.db            # Baza danych (SQLite)
├── src/                        # Frontend aplikacji
│   ├── api/                   # Klient API
│   │   └── apiClient.ts
│   ├── components/            # Komponenty React
│   │   ├── AdminRoute.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── FormField.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── SubmitButton.tsx
│   ├── context/               # Context API (zalogowany user w aplikacji)
│   │   └── UserContext.tsx
│   ├── hooks/                 # Custom hooks (zapytania do API i kontekstu)
│   │   ├── useAccount.ts
│   │   ├── useAdmin.ts
│   │   └── useUser.ts
│   ├── pages/                        # Strony aplikacji
│   │   ├── AdminDashboardPage.tsx    # Panel administracyjny
│   │   ├── DashboardPage.tsx         # Strona główna użytkownika
│   │   ├── EditUserPage.tsx          # Edycja użytkownika
│   │   ├── LoginPage.tsx             # Strona logowania
│   │   ├── RegisterPage.tsx          # Strona rejestracji
│   │   ├── TransactionPage.tsx       # Strona przelewów i doładowań
│   │   └── UnauthorizedPage.tsx
│   ├── styles/                # Style CSS
│   │   └── global.css
│   ├── utils/                 # Narzędzia pomocnicze
│   │   ├── apiErrorHandler.ts
│   │   └── validation.ts
│   ├── types.ts               # Typy TypeScript
│   ├── App.tsx                # Główny komponent
│   └── main.tsx               # Entry point
├── tests/                     # Testy E2E Playwright
│   ├── page-object-models/    # Page Object Models
│   │   ├── AdminPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegistrationPage.ts
│   │   └── TransactionPage.ts
│   ├── utils/                # Narzędzia pomocnicze dla testów
│   │   ├── resetDatabase.ts # Reset bazy danych
│   │   └── userDataGenerator.ts # Generowanie danych użytkownika
│   ├── global.setup.ts       # Globalna konfiguracja testów
│   ├── moneyAdditions.spec.ts # Testy doładowań konta
│   ├── moneySending.spec.ts # Testy przelewów
│   ├── smoke.spec.ts         # Testy smoke
│   └── userAuth.spec.ts      # Testy autoryzacji użytkowników
├── .gitignore                 # Pliki ignorowane przez Git
├── .prettierrc                # Konfiguracja Prettier
├── eslint.config.js           # Konfiguracja ESLint
├── index.html                 # Główny plik HTML
├── playwright.config.ts       # Konfiguracja Playwright
├── package.json               # Zależności projektu
├── tsconfig.json              # Konfiguracja TypeScript
├── vite.config.ts             # Konfiguracja Vite
└── README.md                  # Ten plik
```

## 📝 Komentarze

- Aplikacja używa `localStorage` do przechowywania sesji użytkownika **(UWAGA: zła praktyka!)**
- Baza danych jest resetowana przy każdym uruchomieniu serwera **(UWAGA: takie akcje powinny być dozwolone tylko na środowiskach testowych!)**
- Domyślni użytkownicy są tworzone automatycznie (sprawdź `_server/database/initalData.ts`)

## 🧪 Testy

Projekt zawiera testy E2E napisane w Playwright:

- **userAuth.spec.ts** - Testy autoryzacji użytkowników
- **moneyAdditions.spec.ts** - Testy dodawania środków do konta bankowego
- **moneySending.spec.ts** - Testy przelewów na inne konta bankowe

## 🛠️ Technologie

- **Frontend**: React 19, TypeScript, Vite, React Router, React Hook Form
- **Backend**: Node.js, Express, TypeScript
- **Baza danych**: SQLite (plik lokalny)
- **Testowanie**: Playwright
- **Style**: CSS (vanilla)

## 🔌 Dostępne API

Aplikacja udostępnia następujące endpointy API:

### Autoryzacja (Public)

#### `POST /api/login`

Logowanie użytkownika.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Jan Kowalski",
    "role": "client",
    "accountId": 123
  }
}
```

#### `POST /api/register`

Rejestracja nowego użytkownika.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Jan Kowalski"
}
```

**Response:**

```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Jan Kowalski",
    "role": "client",
    "accountId": 123
  }
}
```

### Konto (Wymaga autoryzacji)

#### `GET /api/account/:accountId`

Pobiera szczegóły konta wraz z transakcjami.

**Response:**

```json
{
  "id": 123,
  "transactions": [
    {
      "id": 1,
      "date": "2024-01-15",
      "recipient": "Sklep ABC",
      "title": "Zakupy",
      "amount": -100,
      "accountId": 123,
      "type": "outgoing"
    }
  ]
}
```

#### `POST /api/add-money/:accountId`

Doładowanie konta (transakcja przychodząca).

**Request Body:**

```json
{
  "title": "Spadek",
  "amount": 1000
}
```

**Response:**

```json
{
  "success": true,
  "transaction": {
    "id": 2,
    "date": "2024-01-15",
    "recipient": "Ja",
    "title": "Spadek",
    "amount": 1000,
    "accountId": 123,
    "type": "incoming"
  }
}
```

#### `POST /api/send-money/:accountId`

Wysłanie przelewu (transakcja wychodząca).

**Request Body:**

```json
{
  "recipient": "Jan Kowalski",
  "title": "Zwrot długu",
  "amount": 500
}
```

**Response:**

```json
{
  "success": true,
  "transaction": {
    "id": 3,
    "date": "2024-01-15",
    "recipient": "Jan Kowalski",
    "title": "Zwrot długu",
    "amount": -500,
    "accountId": 123,
    "type": "outgoing"
  }
}
```

### Admin (Wymaga autoryzacji + rola admin)

#### `GET /api/admin/users`

Pobiera listę wszystkich użytkowników.

**Response:**

```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "Jan Kowalski",
    "role": "client",
    "accountId": 123
  }
]
```

#### `PUT /api/admin/users/:id`

Aktualizuje dane użytkownika.

**Request Body:**

```json
{
  "email": "newemail@example.com",
  "name": "Jan Nowak",
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "id": 1,
  "email": "newemail@example.com",
  "name": "Jan Nowak",
  "role": "client",
  "accountId": 123
}
```

#### `DELETE /api/admin/users/:id`

Usuwa użytkownika.

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

### Uwagi dotyczące API

- 🔒 Endpointy wymagające autoryzacji potrzebują nagłówka `Authorization: Bearer <token>`
- 👑 Endpointy admin wymagają roli `admin`
- ⏱️ Endpoint `/api/add-money` ma celowo długi czas odpowiedzi (6-7 sekund) do testowania długotrwałych operacji
- ⚡ Endpoint `/api/send-money` ma krótki czas odpowiedzi (0.3-1 sekundy)
