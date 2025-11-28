# Konspekt Instruktora - Playwright Workshop

## Krok 0 - Setup

### Działania instruktora

1. ✅ Upewnij się, że wszystkie uczestniczki mają zainstalowane:
   - VS Code
   - Node.js
   - Sklonowane repozytorium
2. ✅ Przeprowadź instalację krok po kroku
3. ✅ Sprawdź, czy wszystkie widzą rozszerzenie Playwright w VS Code
4. ✅ Uruchom `npm install` i `npm run dev`
5. ✅ Zweryfikuj, że aplikacja działa u wszystkich

### Wątki do poruszenia

- **Czym jest Playwright**: Nowoczesne narzędzie do testowania E2E
- **Dlaczego Playwright**: Auto-waiting, retry-ability, cross-browser
- **Struktura projektu**: Szybki przegląd katalogów

### Czas: ~10 minut

---

## Krok 1 - Opis aplikacji i narzędzia Playwright

### Działania instruktora

1. ✅ Pokazuję drzewo aplikacji Mini Bank w VS Code
2. ✅ Otwieram aplikację w przeglądarce i prezentuję funkcjonalność
3. ✅ Pytam czy wszystkie widzą to samo (szczególnie Playwright extension)
4. ✅ Otwieram `playwright.config.js` i omawiam sekcje

### Wątki do poruszenia przy `playwright.config.js`

#### Raportowanie

```typescript
reporter: [['list'], ['html']];
```

- **list**: Wyniki w konsoli podczas wykonywania
- **html**: Raport HTML po zakończeniu testów
- Można dodać inne: json, junit, allure

#### Domyślne opcje

```typescript
use: {
  baseURL: 'http://localhost:5173',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure'
}
```

- **baseURL**: Bazowy URL dla wszystkich testów
- **trace**: Kiedy zbierać szczegółowe logi
- **screenshot**: Kiedy robić zrzuty ekranu

#### Projects i dependencies

```typescript
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  { name: 'chromium', dependencies: ['setup'] },
];
```

- **setup**: Testy przygotowawcze (np. logowanie)
- **dependencies**: Kolejność wykonywania projektów
- **Różne przeglądarki**: chromium, firefox, webkit

#### Webserver

```typescript
webServer: {
  command: 'npm run dev',
  port: 5173,
  reuseExistingServer: !process.env.CI
}
```

- Automatyczne uruchamianie serwera przed testami
- Przydatne w CI/CD

### Czas: ~15 minut

---

## Krok 2 - Pierwszy test smoke

### Działania instruktora

1. ✅ **Metoda ręczna**: Sam piszę test na żywo
2. ✅ Pokazuję składnię: `page` + `locator` + `metoda` + `expect`
3. ✅ Wyjaśniam koncepty
4. ✅ Pokazuję 3 sposoby uruchomienia testu
5. ✅ Demonstruję 3 różne sposoby znalezienia `<h1>`

### Wątki do poruszenia

#### Page - Fixture

```typescript
test('example', async ({ page }) => {
  // page jest dostępny automatycznie
});
```

- **Fixture**: Automatycznie dostarczona przez Playwright
- **Nowa instancja**: Każdy test ma świeżą przeglądarkę
- **Izolacja**: Testy nie wpływają na siebie nawzajem
- **Context isolation**: Każdy test ma własny context (cookies, localStorage, etc.)

#### Locator - Kluczowy element

```typescript
const heading = page.locator('h1');
```

- **Auto-waiting**: Czeka aż element będzie dostępny
- **Retry-ability**: Automatycznie ponawia próby
- **Lazy evaluation**: Nie szuka elementu od razu, tylko gdy jest potrzebny
- **Reprezentacja**: Sposób na znalezienie elementu w dowolnym momencie

#### Expect - Walidacja

```typescript
await expect(heading).toBeVisible();
```

- **Asercje**: Sprawdzają prawdziwość warunków
- **Auto-waiting**: Czekają aż warunek będzie spełniony
- **Różne matchers**: toBeVisible, toHaveText, toHaveValue, etc.

### Demonstracja: 3 sposoby znalezienia `<h1>`

#### Sposób 1: CSS Selector

```typescript
await expect(page.locator('h1')).toBeVisible();
```

#### Sposób 2: Role Locator (ZALECANY)

```typescript
await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
```

#### Sposób 3: Text Locator

```typescript
await expect(page.getByText('minibank')).toBeVisible();
```

### Wątek: Dlaczego Role Locators?

> **Playwright zaleca role locators**, bo są najbliższe temu jak użytkownicy i technologie asystujące (screen readers) postrzegają stronę.

### Sposoby uruchomienia

#### 1. Headless (bez przeglądarki)

```bash
npx playwright test
```

- Szybkie
- Idealne dla CI/CD

#### 2. Headed (z przeglądarką)

```bash
npx playwright test --headed
```

- Widzimy co się dzieje
- Dobre do debugowania

#### 3. Test Explorer w VS Code

- Kliknięcie w zieloną strzałkę
- Wygodne podczas developmentu

### Czas: ~20 minut

---

## Krok 3 - Test logowania

### Działania instruktora

1. ✅ Uczestniczki piszą samodzielnie (z moją pomocą)
2. ✅ Pokazuję różne typy locatorów na żywo
3. ✅ Demonstruję `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`
4. ✅ Wprowadzam `getByTestId` jako metodologię
5. ✅ Pokazuję `filter` dla złożonych przypadków
6. ✅ Uruchamiamy test - pojawia się błąd (celowo!)
7. ✅ Otwieram UI Mode do debugowania: `npx playwright test --ui`

### Wątki do poruszenia

#### getByRole - Rekomendowane przez Playwright

```typescript
await page.getByRole('button', { name: 'Zaloguj' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('user@test.com');
```

- **Najbliższe użytkownikowi**: Tak jak użytkownik widzi stronę
- **Accessibility**: Wymusza dobre praktyki dostępności
- **Stabilne**: Mniej wrażliwe na zmiany w strukturze HTML

**Popularne role**:

- `button`, `link`, `textbox`, `heading`, `checkbox`, `radio`

#### getByLabel - Dla inputów

```typescript
await page.getByLabel('Email').fill('user@test.com');
await page.getByLabel('Password').fill('secret');
```

- Znajduje input przez `<label>`, `aria-labelledby` lub `aria-label`
- Idealne dla formularzy

**Przykład HTML**:

```html
<label for="email">Email</label> <input id="email" />
```

#### getByPlaceholder - Gdy nie ma label

```typescript
await page.getByPlaceholder('Wpisz email').fill('user@test.com');
```

- Używaj gdy nie ma label (ale lepiej dodać label!)
- Mniej stabilne niż getByLabel

#### getByText - W ostateczności

```typescript
await page.getByText('Zaloguj się').click();
await page.getByText('Hello world').click();
await page.getByText('Hello', { exact: true }).click(); // Dokładne dopasowanie
await page.getByText(/Hello/i).click(); // Regex
```

- Znajduje elementy po tekście
- Może być niejednoznaczne
- Użyj `exact: true` dla dokładnego dopasowania

#### getByTestId - Metodologia test-id

```typescript
await page.getByTestId('login-button').click();
```

- Wymaga dodania `data-testid` w HTML
- Bardzo stabilne
- Niezależne od zmian w UI
- Ale: dodatkowy narzut w kodzie produkcyjnym

**Przykład HTML**:

```html
<button data-testid="login-button">Zaloguj</button>
```

#### filter - Filtrowanie locatorów

```typescript
const row = page
  .locator('tr')
  .filter({ hasText: 'Jan Kowalski' })
  .filter({ has: page.getByRole('button', { name: 'Usuń' }) });
```

- Zawęża wyniki locatora
- `hasText`: Filtruje po tekście
- `has`: Filtruje po zawartym locatorze

#### Multiple elements

```typescript
const items = page.locator('*', { hasText: 'Saldo' });
console.log(await items.count()); // Liczba elementów
console.log(await items.evaluateAll((nodes) => nodes.map((n) => n.textContent)));
```

### Demonstracja: Formularz logowania

```typescript
test('should login successfully', async ({ page }) => {
  await page.goto('/login');

  // Sposób 1: getByLabel
  await page.getByLabel('Email').fill('user@test.com');

  // Sposób 2: getByPlaceholder
  await page.getByPlaceholder('Hasło').fill('password123');

  // Sposób 3: getByRole dla przycisku
  await page.getByRole('button', { name: 'Zaloguj' }).click();

  // Sposób 4: getByTestId (jeśli dodamy data-testid)
  // await page.getByTestId('login-form').getByRole('button').click();

  // Weryfikacja
  await expect(page).toHaveURL('/dashboard');
});
```

### Celowy błąd: /dashboard nie znaleziony

Po uruchomieniu testu pojawia się błąd - strona `/dashboard` nie ładuje się prawidłowo.

#### Debugowanie w UI Mode

```bash
npx playwright test --ui
```

**Co pokazuje UI Mode**:

1. **Screenshots**: before, action, after każdej akcji
2. **Console logs**: Wszystkie logi z przeglądarki
3. **Network**: Requesty HTTP, statusy, czasy odpowiedzi
4. **Source**: Kod testu z podświetleniem aktualnej linii
5. **Errors**: Szczegółowe informacje o błędach

**Analiza błędu**:

- Sprawdzamy Network tab - czy request do `/dashboard` zwrócił 200?
- Sprawdzamy Console - czy są błędy JavaScript?
- Sprawdzamy Screenshots - co faktycznie się załadowało?

### Wątek: Record at Cursor

Na koniec pokazuję funkcję **Record at Cursor** w Playwright Extension:

1. Klikam prawym na test
2. Wybieram "Record at Cursor"
3. Wykonuję akcje w przeglądarce
4. Playwright generuje kod automatycznie

**Zalety**:

- Szybkie prototypowanie
- Nie trzeba znać wszystkich locatorów

**Wady**:

- Generuje więcej kodu niż potrzeba
- Często używa `getByText` zamiast `getByRole`
- Trzeba posprzątać wygenerowany kod

### Czas: ~30 minut

---

## Krok 4 - Test rejestracji (samodzielnie)

### Działania instruktora

1. ✅ Uczestniczki piszą same używając **Record at Cursor**
2. ✅ Chodzę i pomagam indywidualnie
3. ✅ Po 10-15 minutach pokazuję swoje rozwiązanie
4. ✅ Omawiam kluczowe uwagi

### Wątki do poruszenia przy rozwiązaniu

#### Uwaga 0: Izolacja testów - Różne dane!

```typescript
// ❌ ŹLE - Każdy test używa tych samych danych
test('register user', async ({ page }) => {
  await registerPage.register('user@test.com', 'password');
});

test('register another user', async ({ page }) => {
  await registerPage.register('user@test.com', 'password'); // Konflikt!
});

// ✅ DOBRZE - Każdy test ma unikalne dane
test('register user 1', async ({ page }) => {
  await registerPage.register('user1@test.com', 'password');
});

test('register user 2', async ({ page }) => {
  await registerPage.register('user2@test.com', 'password');
});

test('user already exists', async ({ page }) => {
  await registerPage.register('existing@test.com', 'password');
  // Drugi raz ten sam użytkownik - testujemy błąd
  await registerPage.register('existing@test.com', 'password');
  await expect(page.getByText('Użytkownik już istnieje')).toBeVisible();
});
```

**Dlaczego to ważne**:

- Testy mogą być uruchamiane równolegle
- Testy muszą być niezależne od siebie
- Baza danych może być współdzielona

#### Uwaga 1: Recording robi więcej kliknięć

Recording generuje kod dla każdego kliknięcia, ale w praktyce możemy użyć Tab:

```typescript
// Recording wygeneruje:
await page.getByLabel('Email').click();
await page.getByLabel('Email').fill('user@test.com');
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill('password');

// Lepiej napisać:
await page.getByLabel('Email').fill('user@test.com');
await page.getByLabel('Password').fill('password');
// Playwright automatycznie kliknie przed wypełnieniem
```

#### Uwaga 2: Record at Cursor ujawnia typy elementów

Recording może pokazać, że element który myśleliśmy że jest linkiem, to button:

```typescript
// Myśleliśmy:
await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();

// Ale Record pokazał:
await page.getByRole('button', { name: 'Zarejestruj nowe konto' }).click();
```

**Lekcja**: Nie zakładaj typu elementu - sprawdź w DevTools lub użyj Record!

#### Uwaga 3: Kod jest długi i powtarzalny

```typescript
test('register user', async ({ page }) => {
  await page.goto('/register');
  await page.getByLabel('Email').fill('user1@test.com');
  await page.getByLabel('Password').fill('password');
  await page.getByLabel('Confirm Password').fill('password');
  await page.getByRole('button', { name: 'Zarejestruj' }).click();
  await expect(page).toHaveURL('/dashboard');
});

test('register admin', async ({ page }) => {
  await page.goto('/register');
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').fill('password');
  await page.getByLabel('Confirm Password').fill('password');
  await page.getByRole('checkbox', { name: 'Admin' }).check();
  await page.getByRole('button', { name: 'Zarejestruj' }).click();
  await expect(page).toHaveURL('/dashboard');
});
```

**Problem**: Dużo powtórzeń, trudne w utrzymaniu.

**Rozwiązanie**: Page Object Models! (następny krok)

### Czas: ~25 minut

---

## Krok 5 - Page Object Models

### Działania instruktora

1. ✅ Wyjaśniam czym są Page Objects
2. ✅ Pokazuję strukturę katalogów
3. ✅ Tworzę Page Object dla strony rejestracji na żywo
4. ✅ Refaktoryzuję test z Kroku 4
5. ✅ Pokazuję różnicę w czytelności

### Wątki do poruszenia

#### Czym są Page Objects?

**Page Object Model (POM)** to wzorzec projektowy, który:

- Enkapsuluje logikę strony w klasie
- Oddziela strukturę strony od logiki testów
- Ułatwia utrzymanie testów
- Redukuje duplikację kodu

#### Struktura katalogów

```
tests/
├── pages/
│   ├── RegisterPage.ts
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── register.spec.ts
└── login.spec.ts
```

#### Tworzenie Page Object - Live Coding

```typescript
// tests/pages/RegisterPage.ts
import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly adminCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.confirmPasswordInput = page.getByLabel('Confirm Password');
    this.registerButton = page.getByRole('button', { name: 'Zarejestruj' });
    this.adminCheckbox = page.getByRole('checkbox', { name: 'Admin' });
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(email: string, password: string, isAdmin = false) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);

    if (isAdmin) {
      await this.adminCheckbox.check();
    }

    await this.registerButton.click();
  }
}
```

#### Użycie w teście - Przed vs Po

**PRZED (bez Page Object)**:

```typescript
test('register user', async ({ page }) => {
  await page.goto('/register');
  await page.getByLabel('Email').fill('user1@test.com');
  await page.getByLabel('Password').fill('password');
  await page.getByLabel('Confirm Password').fill('password');
  await page.getByRole('button', { name: 'Zarejestruj' }).click();
  await expect(page).toHaveURL('/dashboard');
});
```

**PO (z Page Object)**:

```typescript
test('register user', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.register('user1@test.com', 'password');
  await expect(page).toHaveURL('/dashboard');
});

test('register admin', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.register('admin@test.com', 'password', true);
  await expect(page).toHaveURL('/dashboard');
});
```

### Korzyści Page Objects

#### 1. Czytelność

Testy są bardziej czytelne - czytają się jak scenariusze:

```typescript
await registerPage.goto();
await registerPage.register('user@test.com', 'password');
```

#### 2. Maintainability

Zmiana w UI wymaga aktualizacji tylko w Page Object:

```typescript
// Jeśli zmieni się label z "Email" na "E-mail"
// Aktualizujemy tylko w RegisterPage.ts:
this.emailInput = page.getByLabel('E-mail'); // Jedna zmiana!

// Bez Page Object musielibyśmy zmienić w każdym teście!
```

#### 3. Reusability

Możemy używać tych samych metod w wielu testach:

```typescript
// W różnych testach:
await registerPage.register('user1@test.com', 'password');
await registerPage.register('user2@test.com', 'password');
await registerPage.register('admin@test.com', 'password', true);
```

#### 4. Type Safety

TypeScript pomaga unikać błędów:

```typescript
await registerPage.register('email', 'password', 'not-a-boolean'); // ❌ Błąd kompilacji!
await registerPage.register('email', 'password', true); // ✅ OK
```

### Czas: ~25 minut

---

## Krok 6 - Test doładowania konta

### Działania instruktora

1. ✅ Uczestniczki piszą z Recording + Page Object
2. ✅ Celowo prowokuję błędy (nie czekam na loading)
3. ✅ Pokazuję błąd: button submit nie zdążył się załadować
4. ✅ Pokazuję błąd: flaky test z walidacją kwoty
5. ✅ Debugujemy razem

### Wątki do poruszenia

#### Wątek 1: getByText = prawdopodobnie zła semantyka

Gdy Recording generuje dużo `getByText`, to znak że:

- Brakuje odpowiednich `role` w HTML
- Brakuje `label` dla inputów
- Brakuje `aria-label` lub `aria-labelledby`

**Przykład**:

```typescript
// Recording wygenerował:
await page.getByText('Wyślij').click();

// Lepiej byłoby:
await page.getByRole('button', { name: 'Wyślij' }).click();
```

**Rozwiązanie**: Dodaj `data-testid` lub popraw semantykę HTML.

#### Wątek 2: Wprowadzenie testId jako metodologia

Dodajemy `data-testid` do elementów:

```html
<button data-testid="submit-transaction">Wyślij</button> <input data-testid="amount-input" />
```

W teście:

```typescript
await page.getByTestId('amount-input').fill('100');
await page.getByTestId('submit-transaction').click();
```

**Zalety**:

- Bardzo stabilne
- Niezależne od zmian w UI
- Łatwe do znalezienia w Recording

**Wady**:

- Dodatkowy kod w HTML
- Mniej "naturalne" niż role locators

### Błąd 1: Button submit nie zdążył się załadować

**Objaw**:

```
Error: Timeout 30000ms exceeded.
waiting for getByRole('button', { name: 'Wyślij' })
```

**Przyczyna**: Przycisk ładuje się asynchronicznie (np. po pobraniu danych z API).

**Rozwiązanie 1: Delay w kliknięciu**

```typescript
await page.getByRole('button', { name: 'Wyślij' }).click({ delay: 4000 });
```

- ❌ **Zła praktyka**: Hardcoded delay
- ❌ Spowalnia testy
- ❌ Może być za krótki lub za długi

**Rozwiązanie 2: Czekaj na element (LEPSZE)**

```typescript
await page.getByRole('button', { name: 'Wyślij' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Wyślij' }).click();
```

- ✅ Czeka tylko tyle ile potrzeba
- ✅ Fail fast jeśli element się nie pojawi

**Rozwiązanie 3: Playwright czeka automatycznie**

```typescript
// Playwright automatycznie czeka aż element będzie:
// - visible
// - stable
// - enabled
await page.getByRole('button', { name: 'Wyślij' }).click();
```

- ✅ Najlepsze rozwiązanie w większości przypadków
- ✅ Auto-waiting jest wbudowane

**Dlaczego nie zadziałało?** Prawdopodobnie element był `disabled` lub miał `pointer-events: none`.

### Błąd 2: Flaky test - walidacja kwoty

**Objaw**: Test czasami przechodzi, czasami nie.

**Kod testu**:

```typescript
test('should add money', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();

  // Sprawdzamy początkową kwotę
  await expect(dashboardPage.balance).toHaveText('1000 PLN');

  // Doładowujemy
  await dashboardPage.addMoney(500);

  // Sprawdzamy nową kwotę
  await expect(dashboardPage.balance).toHaveText('1500 PLN'); // ❌ Czasami "loading..."
});
```

**Przyczyna**: Dashboard ładuje dane asynchronicznie. Czasami zdążymy sprawdzić przed załadowaniem.

**Rozwiązanie: Czekaj na zniknięcie "loading..."**

```typescript
// Page Object
export class DashboardPage {
  readonly balance: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.balance = page.getByTestId('balance');
    this.loadingIndicator = page.getByText('loading...');
  }

  async waitForDataLoaded() {
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }
}

// Test
test('should add money', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();
  await dashboardPage.waitForDataLoaded(); // ✅ Czekamy!

  await expect(dashboardPage.balance).toHaveText('1000 PLN');

  await dashboardPage.addMoney(500);
  await dashboardPage.waitForDataLoaded(); // ✅ Czekamy ponownie!

  await expect(dashboardPage.balance).toHaveText('1500 PLN');
});
```

### Wątek: Czym są Flaky Tests?

**Flaky test** = test który czasami przechodzi, czasami nie (bez zmian w kodzie).

**Przyczyny**:

1. **Race conditions**: Nie czekamy na załadowanie danych
2. **Timing issues**: Hardcoded delays
3. **Źle wybrane selektory**: Element się zmienia
4. **Współdzielony stan**: Testy wpływają na siebie nawzajem
5. **Zewnętrzne zależności**: API, baza danych

**Jak debugować**:

1. Uruchom test wiele razy: `npx playwright test --repeat-each=10`
2. Sprawdź Trace Viewer
3. Dodaj więcej logów: `console.log()`
4. Sprawdź Network tab w UI Mode

**Jak naprawić**:

1. Używaj auto-waiting Playwright
2. Czekaj na konkretne stany (loading hidden, element visible)
3. Nie używaj hardcoded delays
4. Izoluj testy (różne dane, czyszczenie stanu)

### Czas: ~30 minut

---

## Krok 7 - Aplikacja o kredyt (długie API)

### Działania instruktora

1. ✅ Pokazuję przygotowany kod testu
2. ✅ Uruchamiamy - timeout!
3. ✅ Debugujemy w UI Mode - widzimy długie API
4. ✅ Pokazuję 4 sposoby rozwiązania problemu
5. ✅ Omawiam kiedy który sposób stosować

### Wątki do poruszenia

#### Problem: Długie API

**Scenariusz**: Aplikacja o kredyt wymaga:

1. Weryfikacji tożsamości (API 15s)
2. Sprawdzenia historii kredytowej (API 20s)
3. Decyzji kredytowej (API 10s)

**Łącznie**: ~45 sekund

**Domyślny timeout Playwright**: 30 sekund

**Błąd**:

```
Error: Test timeout of 30000ms exceeded.
```

### Rozwiązanie 1: Globalny timeout

**Gdzie**: `playwright.config.ts`

```typescript
export default defineConfig({
  timeout: 60000, // 60 sekund dla całego testu
});
```

**Kiedy używać**:

- ✅ Wszystkie testy są wolne
- ✅ Aplikacja jest wolna z natury (np. heavy computations)

**Wady**:

- ❌ Wolne testy będą czekać dłużej zanim fail
- ❌ Wpływa na wszystkie testy

### Rozwiązanie 2: Action timeout dla wszystkich akcji

**Gdzie**: `playwright.config.ts`

```typescript
export default defineConfig({
  use: {
    actionTimeout: 45000, // 45 sekund dla każdej akcji
  },
});
```

**Kiedy używać**:

- ✅ Konkretne akcje są wolne (np. kliknięcia, wypełnianie)
- ✅ Chcemy dać więcej czasu na interakcje

**Wady**:

- ❌ Wpływa na wszystkie akcje we wszystkich testach

### Rozwiązanie 3: Timeout dla konkretnej akcji

**Gdzie**: W teście

```typescript
test('should apply for credit', async ({ page }) => {
  await page.goto('/credit');
  await page.getByRole('button', { name: 'Aplikuj' }).click();

  // Ta akcja może trwać długo
  await page.getByRole('button', { name: 'Potwierdź' }).click({ timeout: 45000 });

  await expect(page.getByText('Kredyt zatwierdzony')).toBeVisible();
});
```

**Kiedy używać**:

- ✅ Tylko jedna akcja jest wolna
- ✅ Nie chcemy spowalniać innych testów

**Zalety**:

- ✅ Precyzyjne
- ✅ Nie wpływa na inne testy
- ✅ Dokumentuje że ta akcja jest wolna

### Rozwiązanie 4: Mockowanie długiego API (NAJLEPSZE!)

**Gdzie**: W teście

```typescript
test('should apply for credit - mocked', async ({ page }) => {
  // Mockujemy długie API
  await page.route('**/api/credit/verify-identity', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ verified: true }),
    });
  });

  await page.route('**/api/credit/check-history', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ score: 750 }),
    });
  });

  await page.route('**/api/credit/decision', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ approved: true, amount: 50000 }),
    });
  });

  await page.goto('/credit');
  await page.getByRole('button', { name: 'Aplikuj' }).click();
  await page.getByRole('button', { name: 'Potwierdź' }).click();

  await expect(page.getByText('Kredyt zatwierdzony')).toBeVisible();
  await expect(page.getByText('50000 PLN')).toBeVisible();
});
```

**Kiedy używać**:

- ✅ API jest wolne i nie musimy go testować
- ✅ Chcemy szybkie testy
- ✅ API jest niestabilne (zewnętrzne)
- ✅ Testujemy tylko UI logic

**Zalety**:

- ✅ Bardzo szybkie testy
- ✅ Deterministyczne (zawsze ten sam wynik)
- ✅ Nie zależymy od zewnętrznych serwisów
- ✅ Możemy testować edge cases (błędy API)

**Wady**:

- ❌ Nie testujemy prawdziwego API
- ❌ Więcej kodu do utrzymania

### Kiedy mockować a kiedy nie?

**Mockuj gdy**:

- API jest wolne
- API jest niestabilne
- Testujesz tylko UI
- Chcesz testować edge cases (błędy, timeouty)

**Nie mockuj gdy**:

- Testujesz integrację z API
- API jest szybkie i stabilne
- Testujesz E2E flow
- Chcesz wykryć problemy z API

### Debugowanie długich testów

#### 1. UI Mode - Network tab

```bash
npx playwright test --ui
```

- Zobacz wszystkie requesty
- Sprawdź czasy odpowiedzi
- Zidentyfikuj wolne API

#### 2. Trace Viewer

```bash
npx playwright test --trace on
npx playwright show-report
```

- Szczegółowa timeline
- Zobacz co zajmuje najwięcej czasu
- Replay testu krok po kroku

#### 3. Logi w teście

```typescript
test('debug timing', async ({ page }) => {
  console.time('goto');
  await page.goto('/credit');
  console.timeEnd('goto');

  console.time('click');
  await page.getByRole('button', { name: 'Aplikuj' }).click();
  console.timeEnd('click');
});
```

### Czas: ~30 minut

---

## Bonus: Video Recording

### Działania instruktora

1. ✅ Pokazuję konfigurację video recording
2. ✅ Uruchamiam test z video
3. ✅ Pokazuję gdzie są zapisane video

### Konfiguracja

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    video: 'on', // Zawsze nagrywaj
    // video: 'retain-on-failure', // Tylko gdy test fail
    // video: 'on-first-retry', // Tylko przy retry
  },
});
```

### Uruchomienie

```bash
npx playwright test
```

### Gdzie są video?

```
test-results/
└── example-test-chromium/
    └── video.webm
```

### Kiedy używać?

- ✅ Debugowanie flaky tests
- ✅ CI/CD - zobacz co się stało
- ✅ Dokumentacja - pokaż jak działa feature

### Czas: ~10 minut

---

## Bonus: Playwright MCP

### Działania instruktora

1. ✅ Krótkie wprowadzenie do MCP
2. ✅ Pokazuję jak używać (jeśli jest czas)

### Czym jest MCP?

**Model Context Protocol** - protokół do komunikacji z AI.

### Playwright MCP

- Integracja Playwright z AI asystentami
- Automatyczne generowanie testów
- Analiza wyników testów

### Przykład użycia

```typescript
// AI może wygenerować test na podstawie opisu:
// "Napisz test który loguje użytkownika i sprawdza dashboard"
```

### Czas: ~5 minut (opcjonalnie)

---

## Podsumowanie warsztatu

### Działania instruktora

1. ✅ Rekapituluję poznane koncepty
2. ✅ Pytam o feedback
3. ✅ Podaję linki do materiałów
4. ✅ Zachęcam do dalszej nauki

### Poznane koncepty - Checklist

- ✅ Setup i konfiguracja Playwright
- ✅ Podstawy: page, locator, expect
- ✅ Różne typy locatorów (role, label, text, testId)
- ✅ Recording testów (Record at Cursor)
- ✅ Page Object Models
- ✅ Debugowanie (UI Mode, Trace Viewer)
- ✅ Obsługa timeoutów
- ✅ Flaky tests i jak ich unikać
- ✅ Mockowanie API
- ✅ Video recording

### Dobre praktyki - Przypomnienie

1. **Priorytetyzuj role locators** - najbliższe użytkownikowi
2. **Izoluj testy** - różne dane, niezależne testy
3. **Używaj Page Objects** - łatwiejsze utrzymanie
4. **Debuguj z UI Mode** - zobacz co się dzieje
5. **Unikaj hardcoded delays** - używaj auto-waiting
6. **Mockuj wolne API** - szybsze i stabilniejsze testy
7. **Czekaj na loading states** - unikaj flaky tests

### Materiały do dalszej nauki

- 📚 Dokumentacja: https://playwright.dev
- 🎥 YouTube: Playwright official channel
- 💬 Discord: Playwright community
- 📖 Best practices: https://playwright.dev/docs/best-practices

### Czas: ~10 minut

---

## Całkowity czas warsztatu: ~3.5 godziny

### Rozkład czasu:

- Krok 0 (Setup): 10 min
- Krok 1 (Intro): 15 min
- Krok 2 (Pierwszy test): 20 min
- Krok 3 (Login): 30 min
- Krok 4 (Register): 25 min
- Krok 5 (Page Objects): 25 min
- Krok 6 (Doładowanie): 30 min
- Krok 7 (Długie API): 30 min
- Bonus (Video): 10 min
- Bonus (MCP): 5 min
- Podsumowanie: 10 min
- **Buffor na pytania**: 20 min

---

## Wskazówki dla instruktora

### Przed warsztatem

- ✅ Sprawdź czy wszystko działa na Twoim komputerze
- ✅ Przygotuj przykładowe dane testowe
- ✅ Upewnij się że masz stabilne WiFi
- ✅ Przygotuj backup plan (offline docs)

### Podczas warsztatu

- 🎯 Zachęcaj do zadawania pytań
- 🎯 Rób przerwy co ~60 minut
- 🎯 Sprawdzaj czy wszystkie nadążają
- 🎯 Bądź cierpliwa - to może być ich pierwszy raz z Playwright
- 🎯 Pokazuj błędy - to najlepsza nauka!

### Po warsztacie

- 📧 Wyślij materiały (slajdy, kod)
- 📧 Poproś o feedback
- 📧 Podaj kontakt do dalszych pytań

---

## Często zadawane pytania (FAQ)

### Q: Czym różni się Playwright od Selenium?

**A**: Playwright jest nowszy, szybszy, ma wbudowane auto-waiting i retry-ability. Selenium wymaga więcej konfiguracji.

### Q: Czy Playwright działa z React/Vue/Angular?

**A**: Tak! Playwright jest framework-agnostic - działa z każdym frameworkiem.

### Q: Czy mogę używać Playwright do testów API?

**A**: Tak! Playwright ma wbudowane wsparcie dla API testing.

### Q: Jak uruchomić testy w CI/CD?

**A**: `npx playwright test` w pipeline. Playwright ma oficjalne GitHub Actions.

### Q: Czy Playwright jest darmowy?

**A**: Tak! Open source, licencja Apache 2.0.

### Q: Jak testować na różnych przeglądarkach?

**A**: Playwright wspiera Chromium, Firefox i WebKit out of the box.

### Q: Co zrobić gdy test jest flaky?

**A**:

1. Sprawdź czy czekasz na loading states
2. Użyj UI Mode do debugowania
3. Sprawdź czy locatory są stabilne
4. Upewnij się że testy są izolowane
