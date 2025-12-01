# Warsztaty Playwright - MiniBank

Witaj na warsztatach Playwright! 🎉

Ten projekt to prosta aplikacja bankowa stworzona specjalnie do nauki testowania end-to-end z użyciem Playwright. Podczas warsztatów nauczysz się pisać testy automatyczne, które sprawdzą czy aplikacja działa poprawnie.

## � Wymagania wstępne

Przed rozpoczęciem warsztatów upewnij się, że masz zainstalowane:

- **Node.js** (wersja LTS) i **npm**
- **Visual Studio Code** https://code.visualstudio.com (lub inny edytor kodu)

## �🚀 Instalacja

### Instalacja Node.js i npm

#### Windows:

1. **Pobierz instalator Node.js:**
   - Wejdź na stronę: https://nodejs.org/en/download/current
   - Kliknij na zielony przycisk **"Windows Installer (.msi)"** (wersja LTS - Long Term Support)

2. **Zainstaluj Node.js:**
   - Uruchom pobrany plik instalacyjny
   - Klikaj **"Next"** we wszystkich krokach (domyślne ustawienia są OK)
   - **WAŻNE:** Zaznacz opcję _"Automatically install the necessary tools"_ jeśli się pojawi
   - Kliknij **"Install"** i poczekaj na zakończenie instalacji
   - Kliknij **"Finish"**

3. **Sprawdź czy instalacja się powiodła:**

- Otwórz **Command Prompt** (CMD) lub **PowerShell**:
  - Naciśnij `Windows + R`
  - Wpisz `cmd` i naciśnij Enter
- W terminalu wpisz i zatwierdź:
  ```bash
  node --version
  ```
  Powinnaś zobaczyć numer wersji, np. `v20.11.0`
- Następnie sprawdź npm:
  ```bash
  npm --version
  ```
  Powinnaś zobaczyć numer wersji, np. `10.2.4`

> 💡 **Jeśli komendy nie działają:** Zamknij i otwórz ponownie terminal (CMD/PowerShell), a następnie spróbuj ponownie.
> 💡 **Jeśli dostałaś błąd:** ".ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies" - wpisz w terminalu:

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### MacOS:

**Opcja 1: Instalacja przez nvm (polecam)**

nvm (Node Version Manager) pozwala łatwo zarządzać różnymi wersjami Node.js.

1. **Otwórz Terminal:**
   - Naciśnij `Cmd + Spacja`
   - Wpisz `Terminal` i naciśnij Enter

2. **Zainstaluj nvm:**

   Skopiuj i wklej poniższą komendę do terminala:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

   Naciśnij Enter i poczekaj na zakończenie instalacji.

3. **Zrestartuj terminal:**

   Zamknij i otwórz ponownie Terminal, lub wpisz:

   ```bash
   source ~/.zshrc
   ```

4. **Sprawdź czy nvm działa:**

   ```bash
   nvm --version
   ```

   Powinnaś zobaczyć numer wersji, np. `0.39.7`

5. **Zainstaluj Node.js:**

   ```bash
   nvm install --lts
   ```

   To zainstaluje najnowszą stabilną wersję Node.js (LTS - Long Term Support).

6. **Ustaw jako domyślną wersję:**

   ```bash
   nvm alias default 'lts/*'
   nvm use default
   ```

7. **Sprawdź instalację:**

   ```bash
   node --version
   ```

   Powinnaś zobaczyć numer wersji, np. `v20.11.0`

   ```bash
   npm --version
   ```

   Powinnaś zobaczyć numer wersji, np. `10.2.4`

**Opcja 2: Instalacja bezpośrednia (prostsza, ale mniej elastyczna)**

1. Wejdź na stronę: https://nodejs.org/
2. Kliknij na zielony przycisk **"Download Node.js"**
3. Uruchom pobrany plik `.pkg`
4. Klikaj **"Kontynuuj"** we wszystkich krokach
5. Sprawdź instalację w Terminalu (komendy jak w punkcie 7 powyżej)

> 💡 **Wskazówka:** Jeśli planujesz pracować z różnymi projektami, wybierz Opcję 1 (nvm).

### Instalacja zależności w projekcie

```bash
npm install
```

### Instalacja (globalna) Playwright

```bash
npx playwright install
```

### Sprawdzenie wersji Playwright

```bash
npx playwright --version
```

### Instalacja wtyczki Playwright Test do VSCode:

Playwright Test for VSCode - https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

## 🏃 Uruchamianie projektu

### Uruchomienie aplikacji w trybie developerskim (serwer + klient)

```bash
npm run dev
```

Po uruchomieniu:

- **Aplikacja (klient)** będzie dostępna pod adresem: `http://localhost:5173`
- **Server (API)** będzie działał pod adresem: `http://localhost:3001`

_Wskazówka: Do uruchomienia testów NIE jest potrzebny pracujący serwer w oddzielnym terminalu. Plik konfiguracyjny `playwright.config.ts` zawiera odpowiednią konfigurację `webServer`, która go uruchomia w tle._

### Uruchomienie testów E2E

Playwright oferuje kilka sposobów uruchamiania testów:

#### Podstawowe komendy:

```bash
# Uruchom wszystkie testy (w tle, bez otwierania przeglądarki)
npx playwright test

# Uruchom testy z widoczną przeglądarką (przydatne do debugowania)
npx playwright test --headed

# Uruchom testy w trybie UI (interaktywny interfejs)
npx playwright test --ui
```

#### Uruchamianie wybranych testów:

```bash
# Uruchom testy z konkretnego pliku
npx playwright test smoke.spec.ts

# Uruchom konkretny test po nazwie
npx playwright test -g "should login successfully"

# Uruchom testy z konkretnego projektu
npx playwright test --project=chromium
```

> 💡 **Wskazówka dla uczestniczek**: Podczas warsztatów najczęściej będziesz używać `npx playwright test --ui` lub `npx playwright test --headed` aby widzieć co się dzieje w testach.

## 🎯 Co będziemy testować? (o ile starczy nam czasu)

Aplikacja MiniBank to prosta aplikacja bankowa z następującymi funkcjonalnościami:

- 🔐 **Logowanie i rejestracja** - użytkownicy mogą się zalogować lub założyć nowe konto
- 💰 **Doładowanie konta** - użytkownicy mogą dodać środki do swojego konta
- 💰 **Zasilenie konta** - użytkownicy mogą dodać środki do swojego konta
- 💸 **Przelewy** - użytkownicy mogą wysyłać pieniądze do innych osób

### Domyślni użytkownicy

Aplikacja ma już utworzonych kilku użytkowników testowych:

| Email               | Hasło             | Rola   | Saldo początkowe |
| ------------------- | ----------------- | ------ | ---------------- |
| `admin@minibank.pl` | `admin@gmail.com` | Admin  | 0 zł             |
| `user@minibank.pl`  | `user@gmail.com`  | Klient | 0 zł             |

> 💡 **Wskazówka**: Możesz też zarejestrować nowe konta podczas testowania!

## 📂 Skrócona struktura projektu

```
playwright-workshop/
├── _server/                    # Backend aplikacji
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
│   │   ├── AdminPageObject.ts
│   │   ├── DashboardPageObject.ts
│   │   ├── LoginPageObject.ts
│   │   ├── RegistrationPageObject.ts
│   │   └── TransactionPageObject.ts
│   ├── utils/                  # Narzędzia pomocnicze dla testów
│   │   └── userGenerator.ts    # Generowanie danych użytkownika
│   ├── moneyAdditions.spec.ts  # Testy doładowań konta
│   ├── moneySending.spec.ts    # Testy przelewów
│   ├── smoke.spec.ts           # Testy smoke
│   └── userAuth.spec.ts        # Testy autoryzacji użytkowników
├── playwright.config.ts        # Konfiguracja Playwright
└── README.md                   # Ten plik
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
│   │   ├── loggers.ts
│   │   └── validation.ts
│   ├── types.ts               # Typy TypeScript
│   ├── App.tsx                # Główny komponent
│   └── main.tsx               # Entry point
├── tests/                     # Testy E2E Playwright
│   ├── pages/    # Page Object Models
│   │   ├── AdminPageObject.ts
│   │   ├── DashboardPageObject.ts
│   │   ├── LoginPageObject.ts
│   │   ├── RegistrationPageObject.ts
│   │   └── TransactionPageObject.ts
│   ├── utils/                # Narzędzia pomocnicze dla testów
│   │   ├── resetDatabase.ts # Reset bazy danych
│   │   └── userGenerator.ts # Generowanie danych użytkownika
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

## ⚠️ Ważne informacje

- 🔄 **Baza danych jest resetowana** przy każdym uruchomieniu serwera - wszystkie zmiany zostaną utracone po restarcie
- 💾 Aplikacja używa `localStorage` do przechowywania sesji użytkownika (w prawdziwej aplikacji to **zła praktyka**!)
- 👥 Domyślni użytkownicy są tworzeni automatycznie przy starcie serwera
- 🧪 To jest aplikacja **tylko do celów edukacyjnych** - nie używaj jej w produkcji!

## 🧪 Struktura testów

Podczas warsztatów będziesz pracować z następującymi testami:

### Pliki testowe:

- **`smoke.spec.ts`** - Podstawowy test sprawdzający czy aplikacja działa
- **`userAuth.spec.ts`** - Testy logowania i rejestracji użytkowników
- **`moneyAdditions.spec.ts`** - Testy doładowywania konta
- **`moneySending.spec.ts`** - Testy wysyłania przelewów

### Page Object Models (POM):

W katalogu `tests/pages/` znajdziesz gotowe klasy reprezentujące strony aplikacji:

- **`LoginPageObject.ts`** - Strona logowania
- **`RegistrationPageObject.ts`** - Strona rejestracji
- **`DashboardPageObject.ts`** - Strona główna użytkownika
- **`TransactionPageObject.ts`** - Strona przelewów i doładowań
- **`AdminPageObject.ts`** - Panel administratora

> 💡 **Wskazówka**: Page Object Model to wzorzec projektowy, który ułatwia pisanie i utrzymanie testów. Zamiast powtarzać kod, tworzymy klasy reprezentujące strony aplikacji.

## 🛠️ Technologie

- **Frontend**: React 19, TypeScript, Vite, React Router, React Hook Form
- **Backend**: Node.js, Express, TypeScript
- **Baza danych**: W pamięci
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
- ⏱️ Endpoint `/api/add-money` ma **celowo długi czas odpowiedzi (6-7 sekund)** - to świetna okazja do testowania długotrwałych operacji!
- ⚡ Endpoint `/api/send-money` ma krótki czas odpowiedzi (0.3-1 sekundy)

## 🎓 Zadania warsztatowe

Zadania warsztatowe znajdziesz w katalogu `zadania/`:

- **Zadanie 0** - Poznajemy aplikację i narzędzie Playwright
- **Zadanie 1** - Test smoke
- **Zadanie 2** - Testy logowania i rejestracji
- **Zadanie 3** - Testy logowania i rejestracji - lepsze praktyki
- **Zadanie 4** - Testy doładowań konta
- **Zadanie 5** - Testy przelewów
- **Zadanie 6** - Zaawansowane techniki testowania

> 💡 **Wskazówka**: Wykonuj zadania po kolei. Każde zadanie buduje na wiedzy z poprzednich!

## 🆘 Potrzebujesz pomocy?

### Przydatne zasoby:

- 📖 [Oficjalna dokumentacja Playwright](https://playwright.dev/)
- 🎯 [Playwright Test Generator](https://playwright.dev/docs/codegen) - narzędzie do automatycznego generowania testów
- 🔍 [Playwright Inspector](https://playwright.dev/docs/debug) - debugowanie testów krok po kroku

### Częste problemy:

**Problem**: Testy nie uruchamiają się

- ✅ Sprawdź czy aplikacja jest uruchomiona (`npm run dev`)
- ✅ Sprawdź czy Playwright jest zainstalowany (`npx playwright install`)

**Problem**: Testy nie znajdują elementów

- ✅ Użyj Playwright Inspector do sprawdzenia selektorów
- ✅ Sprawdź czy strona się załadowała przed interakcją

**Problem**: Baza danych nie resetuje się

- ✅ Zrestartuj serwer (`Ctrl+C` i ponownie `npm run dev`)

---

**Miłych warsztatów! 🚀**
