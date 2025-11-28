# Playwright Workshop - Zadania

## Krok 0 - Poznajemy aplikację i narzędzie Playwright

Zapoznaj się z interfejsem VS Code, strukturą projektu oraz konfiguracją Playwright.

### Opis

1. Przejrzyj strukturę katalogów projektu w VS Code
2. Otwórz aplikację Mini Bank w przeglądarce
3. Sprawdź, czy widzisz rozszerzenie Test Explorer w lewym panelu VS Code
4. Otwórz plik `playwright.config.js` i zapoznaj się z konfiguracją:
   - Opcje raportowania (list, html)
   - Domyślne ustawienia testów
   - Projekty
   - Ustawienia serwera deweloperskiego

### Konspekt dla instruktora

#### Działania

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

---

## Krok 1 - Pierwszy test smoke

### Zadanie

Napiszmy pierwszy test sprawdzający, czy strona główna się ładuje (smoke test).

### Opis

1. Utwórz nowy plik `tests/smoke.spec.ts`
2. Napisz test sprawdzający, czy na stronie głównej wyświetla się nagłówek `<h1>`
3. Poznaj podstawową składnię Playwright:
   - `page` - fixture reprezentujący instancję przeglądarki
   - `locator` - sposób na znalezienie elementu na stronie
   - `expect` - metoda walidacji
4. Uruchom test `npx playwright test`

### Przykład

```typescript
import { test, expect } from '@playwright/test';

test('should display main heading', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/login');
  // Tutaj napisz kod sprawdzający nagłówek h1
});
```

### Dodatkowe informacje

<!-- Metody globalne -->

- `page` - fixture reprezentujący instancję przeglądarki
- `locator` - sposób na znalezienie elementu na stronie
- `expect` - metoda walidacji

<!-- Metody na locatorze -->

- `goto()` - metoda przechodzenia do strony
- `toHaveURL()` - metoda sprawdzająca, czy jesteśmy na odpowiedniej stronie

### Konspekt dla instruktora

#### Działania

1. ✅ **Metoda ręczna**: Sama piszę test na żywo
2. ✅ Pokazuję składnię: `page` + `locator` + `metoda` + `expect`
3. ✅ Wyjaśniam koncepty
4. ✅ Uruchamiam test

#### Wątki do poruszenia

**Page - Fixture**

- Fixture: Automatycznie dostarczona przez Playwright
- Nowa instancja: Każdy test ma świeżą przeglądarkę
- Izolacja: Testy nie wpływają na siebie nawzajem
- Context isolation: Każdy test ma własny context (cookies, localStorage, etc.)
- **Locator - Kluczowy element**

- Auto-waiting: Czeka aż element będzie dostępny
- Retry-ability: Automatycznie ponawia próby
- Lazy evaluation: Nie szuka elementu od razu, tylko gdy jest potrzebny
- Reprezentacja: Sposób na znalezienie elementu w dowolnym momencie

**Expect - Walidacja**

- Asercje: Sprawdzają prawdziwość warunków
- Auto-waiting: Czekają aż warunek będzie spełniony
- Różne matchers: toBeVisible, toHaveText, toHaveValue, etc.

---

**getByRole - Rekomendowane przez Playwright**

- Najbliższe użytkownikowi: Tak jak użytkownik widzi stronę
- Accessibility: Wymusza dobre praktyki dostępności
- Stabilne: Mniej wrażliwe na zmiany w strukturze HTML
- Popularne role: `button`, `link`, `textbox`, `heading`, `checkbox`, `radio`

**getByLabel - Dla inputów**

- Znajduje input przez `<label>`, `aria-labelledby` lub `aria-label`
- Idealne dla formularzy

**getByPlaceholder - Gdy nie ma label**

- Używaj gdy nie ma label (ale lepiej dodać label!)
- Mniej stabilne niż getByLabel

**getByText - W ostateczności**

- Znajduje elementy po tekście
- Może być niejednoznaczne
- Użyj `exact: true` dla dokładnego dopasowania

**getByTestId - Metodologia test-id**

- Wymaga dodania `data-testid` w HTML
- Bardzo stabilne, niezależne od zmian w UI
- Ale: dodatkowy narzut w kodzie produkcyjnym

## Krok 2 - Test logowania użytkownika

### Zadanie

Napiszmy serię testów logowania na stronę

### Opis

1. Utwórzmy plik `tests/login.spec.ts`
2. Napiszmy test logowania
3. Napiszmy test nieprawidlowego wypełnienia formularza logowania
4. Uruchommy test na cztery sposoby:
   - Headless: `npx playwright test`
   - Z przeglądarką: `npx playwright test --headed`
   - Z UI: `npx playwright test --ui`
   - Z panelu Test Explorer w VS Code
5. Zdebuggujemy ewentulane błędy
6. Przetestujemy też metodę "Record at Cursor"

### Przykład

```typescript
test('should login successfully', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveURL('/login');

  // Wypełnij formularz logowania
  // ... kontynuuj
});
```

### Dodatkowe informacje

Dane usera:

- email: client@gmail.com
- password: client@gmail.com

Dane admina:

- email: admin@gmail.com
- password: admin@gmail.com

<!-- metody na locatorze -->

- `getByTitle` - metoda znajdująca element poprzez atrybut `title`
- `getByRole` - metoda znajdująca element poprzez role
  - https://playwright.dev/docs/locators#locate-by-role # dokumentacja Playwright
  - https://www.w3.org/TR/wai-aria-1.2/#roles # definicje roli WAI-ARIA
- `getByLabel` - metoda znajdująca element poprzez: `<Label>`, atrybut `aria-label` , atrybut `aria-labelledby` i tekst wewnątrz elementu
- `getByPlaceholder` - metoda znajdująca element poprzez atrybut `placeholder`
- `getByText` - metoda znajdująca element poprzez tekst wewnątrz elementu
- `getByTestId` - metoda znajdująca element poprzez atrybut `data-testid`

<!-- filtrowanie locatorów -->

- Zawęża wyniki locatora
- `hasText`: Filtruje po tekście
- `has`: Filtruje po zawartym locatorze

<!-- akcje na locatorze -->

- `fill` - wypełnianie pola formularza
- `filter` - filtrowanie locatorów po tekście lub innych locatorach
- `evaluateAll()` - wykonywanie funkcji na wszystkich elementach

### Konspekt dla instruktora

#### Działania

1. ✅ Uczestniczki piszą samodzielnie (z moją pomocą)
2. ✅ Pokazuję różne sposoby dotarcia do elementów
3. ✅ Demonstruję `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`
4. ✅ Demonstruję 3 różne sposoby znalezienia `<h1>`
   - CSS Selector: `page.locator('h1')`
   - Role Locator (ZALECANY): `page.getByRole('heading', { level: 1 })`
   - Text Locator: `page.getByText('minibank')`
5. ✅ Wprowadzam `getByTestId` jako metodologię
6. ✅ Pokazuję `filter` dla złożonych przypadków
7. ✅ Pokazuję `fill` dla wypełnienia formularza
8. ✅ Uruchamiamy test - pojawia się błąd (celowo!)
9. ✅ Pokazuję 3 sposoby uruchomienia testu
10. ✅ Otwieram UI Mode do debugowania: `npx playwright test --ui`
11. ✅ Pokazuję `waitForURL`, jako locator asertion odpala się, gdy trzeba.
12. ✅ Pokazuję metodę "Record at Cursor"

#### Wątki do poruszenia

**Celowy błąd: /dashboard nie znaleziony**

- Po uruchomieniu testu pojawia się błąd - strona `/dashboard` nie ładuje się prawidłowo.
- moze `await page.toHaveURL('/dashboard')` zamiast `await page.waitForURL('/dashboard')`

---

**Debugowanie w UI Mode:**

- Screenshots: before, action, after każdej akcji
- Console logs: Wszystkie logi z przeglądarki
- Network: Requesty HTTP, statusy, czasy odpowiedzi
- Source: Kod testu z podświetleniem aktualnej linii
- Errors: Szczegółowe informacje o błędach

**Record at Cursor:**

Na koniec pokazuję funkcję Record at Cursor:

- Zalety: Szybkie prototypowanie, nie trzeba znać wszystkich locatorów
- Wady: Generuje więcej kodu niż potrzeba, często używa `getByText` zamiast `getByRole`

## Krok 3 - Test rejestracji i logowania użytkownika

### Zadanie

Samodzielne napisanie testu rejestracji z wykorzystaniem narzędzia Record at Cursor.

### Opis

1. Utwórzymy plik `tests/register.spec.ts`
2. Użyjemy funkcji **Record at Cursor** w Playwright Extension do nagrania ścieżki rejestracji nowego użytkownika i logowania się
3. Przeanalizujmy i poprawmy wygenerowany kod
4. Następnie utworzymy test próby rejestracji zduplikowanego użytkownika

### Konspekt dla instruktora

#### Działania

1. ✅ Uczestniczki piszą same używając **Record at Cursor**
2. ✅ Chodzę i pomagam indywidualnie
3. ✅ Po 10-15 minutach pokazuję swoje rozwiązanie
4. ✅ Omawiam kluczowe uwagi

#### Wątki do poruszenia przy rozwiązaniu

**Uwaga 0: Izolacja testów - Różne dane!**

- Testy mogą być uruchamiane równolegle
- Testy muszą być niezależne od siebie
- Baza danych może być współdzielona
- Dlatego każdy test powinien używać unikalnych danych (np. `user1@test.com`, `user2@test.com`)

**Uwaga 1: Recording robi więcej kliknięć**

- Recording generuje kod dla każdego kliknięcia
- W praktyce możemy użyć Tab lub Playwright automatycznie kliknie przed wypełnieniem
- Można uprościć wygenerowany kod, ale nie trzeba

**Uwaga 2: Record at Cursor ujawnia typy elementów**

- Recording może pokazać, że element który myśleliśmy że jest linkiem, to button
- Lekcja: Nie zakładaj typu elementu - sprawdź w DevTools lub użyj Record!

**Uwaga 3: Kod jest długi i powtarzalny**

- Dużo powtórzeń, trudne w utrzymaniu
- Rozwiązanie: Page Object Models! (następny krok)

---

## Krok 4 - Page Object Models

### Zadanie

Refaktoryzacja testów z wykorzystaniem wzorca Page Object Model.

### Opis

1. Utwórz katalog `tests/pages/`
2. Stwórz Page Object dla strony rejestracji
3. Przepisz test z Kroku 3 używając Page Object

### Przykład struktury

```typescript
// tests/pages/RegisterPage.ts
export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/register');
  }

  async register(email: string, password: string) {
    // Implementacja
  }
}
```

### Korzyści

- Kod jest bardziej czytelny i łatwiejszy w utrzymaniu
- Zmiany w UI wymagają aktualizacji tylko w jednym miejscu
- Łatwiejsze ponowne użycie kodu

### Konspekt dla instruktora

#### Działania

1. ✅ Wyjaśniam czym są Page Objects
2. ✅ Pokazuję strukturę katalogów
3. ✅ Tworzę Page Object dla strony rejestracji na żywo
4. ✅ Refaktoryzuję test z Kroku 3
5. ✅ Pokazuję różnicę w czytelności

#### Wątki do poruszenia

**Czym są Page Objects?**

Page Object Model (POM) to wzorzec projektowy, który:

- Enkapsuluje logikę strony w klasie
- Oddziela strukturę strony od logiki testów
- Ułatwia utrzymanie testów
- Redukuje duplikację kodu

**Korzyści:**

1. **Czytelność**: Testy czytają się jak scenariusze
2. **Maintainability**: Zmiana w UI wymaga aktualizacji tylko w Page Object
3. **Reusability**: Możemy używać tych samych metod w wielu testach
4. **Type Safety**: TypeScript pomaga unikać błędów

---

## Krok 5 - Test doładowania konta

### Zadanie

Napisanie testu doładowania konta bankowego.

### Opis

1. Zarejestruj się na stronie
2. Zaloguj się do konta
3. Stwórz Page Object dla strony doładowania konta bankowego
4. Napisz test doładowania konta bankowego

### Konspekt dla instruktora

#### Działania

1. ✅ Uczestniczki piszą z Recording + Page Object
2. ✅ Mogą natrafić
3. ✅ Pokazuję błąd: button submit nie zdążył się załadować => `delay: 4000` na submit button.
4. ✅ Debugujemy razem

#### Wątki do poruszenia

**Wątek 1: getByText = prawdopodobnie zła semantyka**
Gdy Recording generuje dużo `getByText`, to znak że:

- Brakuje odpowiednich `role` w HTML
- Brakuje `label` dla inputów
- Brakuje `aria-label` lub `aria-labelledby`
- Rozwiązanie: Dodaj `data-testid` lub popraw semantykę HTML

**Wątek 2: Wprowadzenie testId jako metodologia**

- Dodajemy `data-testid` do elementów
- Zalety: Bardzo stabilne, niezależne od zmian w UI
- Wady: Dodatkowy kod w HTML, mniej "naturalne" niż role locators

**Błąd 1: Button submit nie zdążył się załadować**

- Objaw: Timeout 30000ms exceeded
- Przyczyna: Przycisk ładuje się asynchronicznie
- Rozwiązanie 1 (ZŁE): Hardcoded delay - `click({ delay: 4000 })`
- Rozwiązanie 2 (LEPSZE): Czekaj na element - `waitFor({ state: 'visible' })`
- Rozwiązanie 3 (NAJLEPSZE): Playwright czeka automatycznie (auto-waiting)

**Błąd 2: Flaky test - walidacja kwoty**

- Objaw: Test czasami przechodzi, czasami nie
- Przyczyna: Dashboard ładuje dane asynchronicznie
- Rozwiązanie: Czekaj na zniknięcie "loading..." - `waitFor({ state: 'hidden' })`

**Czym są Flaky Tests?**
Flaky test = test który czasami przechodzi, czasami nie (bez zmian w kodzie)

Przyczyny:

1. Race conditions: Nie czekamy na załadowanie danych
2. Timing issues: Hardcoded delays
3. Źle wybrane selektory: Element się zmienia
4. Współdzielony stan: Testy wpływają na siebie nawzajem
5. Zewnętrzne zależności: API, baza danych

Jak naprawić:

1. Używaj auto-waiting Playwright
2. Czekaj na konkretne stany (loading hidden, element visible)
3. Nie używaj hardcoded delays
4. Izoluj testy (różne dane, czyszczenie stanu)

---

## Krok 6 - Aplikacja o kredyt (długo przetwarzane API)

### Zadanie

Obsługa długich requestów API i różne strategie radzenia sobie z timeoutami.

### Opis

1. Przeanalizuj przygotowany test aplikacji o kredyt
2. Uruchom test i zaobserwuj timeout
3. Zastosuj różne rozwiązania problemu timeoutu

### Problem

Test wywala się z powodu długiego API (ponad 30 sekund).

### Rozwiązania

#### Rozwiązanie 1: Globalny timeout

```typescript
// playwright.config.ts
timeout: 60000;
```

#### Rozwiązanie 2: Action timeout dla wszystkich akcji

```typescript
// playwright.config.ts
use: {
  actionTimeout: 45000;
}
```

#### Rozwiązanie 3: Timeout dla konkretnej akcji

```typescript
await button.click({ timeout: 45000 });
```

#### Rozwiązanie 4: Mockowanie długiego API

```typescript
await page.route('**/api/credit/**', async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({ approved: true }),
  });
});
```

### Debugowanie

- Sprawdź logi w UI Mode
- Przeanalizuj requesty w zakładce Network
- Użyj Trace Viewer dla szczegółowej analizy

### Konspekt dla instruktora

#### Działania

1. ✅ Pokazuję przygotowany kod testu
2. ✅ Uruchamiamy - timeout!
3. ✅ Debugujemy w UI Mode - widzimy długie API
4. ✅ Pokazuję 4 sposoby rozwiązania problemu
5. ✅ Omawiam kiedy który sposób stosować

#### Wątki do poruszenia

**Problem: Długie API**
Scenariusz: Aplikacja o kredyt wymaga:

1. Weryfikacji tożsamości (API 15s)
2. Sprawdzenia historii kredytowej (API 20s)
3. Decyzji kredytowej (API 10s)

Łącznie: ~45 sekund
Domyślny timeout Playwright: 30 sekund
Błąd: Test timeout of 30000ms exceeded

**Rozwiązanie 1: Globalny timeout**

- Gdzie: `playwright.config.ts` - `timeout: 60000`
- Kiedy używać: Wszystkie testy są wolne, aplikacja jest wolna z natury
- Wady: Wolne testy będą czekać dłużej zanim fail, wpływa na wszystkie testy

**Rozwiązanie 2: Action timeout dla wszystkich akcji**

- Gdzie: `playwright.config.ts` - `use: { actionTimeout: 45000 }`
- Kiedy używać: Konkretne akcje są wolne
- Wady: Wpływa na wszystkie akcje we wszystkich testach

**Rozwiązanie 3: Timeout dla konkretnej akcji**

- Gdzie: W teście - `click({ timeout: 45000 })`
- Kiedy używać: Tylko jedna akcja jest wolna
- Zalety: Precyzyjne, nie wpływa na inne testy, dokumentuje że ta akcja jest wolna

**Rozwiązanie 4: Mockowanie długiego API (NAJLEPSZE!)**

- Gdzie: W teście - `page.route('**/api/credit/**', ...)`
- Kiedy używać: API jest wolne i nie musimy go testować, chcemy szybkie testy
- Zalety: Bardzo szybkie testy, deterministyczne, nie zależymy od zewnętrznych serwisów
- Wady: Nie testujemy prawdziwego API

**Kiedy mockować a kiedy nie?**
Mockuj gdy: API jest wolne, niestabilne, testujesz tylko UI, chcesz testować edge cases
Nie mockuj gdy: Testujesz integrację z API, API jest szybkie i stabilne, testujesz E2E flow

**Debugowanie długich testów:**

1. UI Mode - Network tab: Zobacz wszystkie requesty, sprawdź czasy odpowiedzi
2. Trace Viewer: Szczegółowa timeline, replay testu krok po kroku
3. Logi w teście: `console.time()` / `console.timeEnd()`

---

## Podsumowanie

### Poznane koncepty

- ✅ Podstawy Playwright i konfiguracja
- ✅ Różne typy locatorów (role, label, text, testId)
- ✅ Recording testów
- ✅ Page Object Models
- ✅ Debugowanie z UI Mode i Trace Viewer
- ✅ Obsługa timeoutów i flaky testów
- ✅ Mockowanie API

### Dodatkowe materiały

- 📹 Video recording testów
- 🤖 Playwright MCP (Model Context Protocol)

### Dobre praktyki

1. Priorytetyzuj **role locators**
2. Używaj różnych danych testowych dla izolacji testów
3. Stosuj Page Object Models dla lepszej maintainability
4. Debuguj z UI Mode i Trace Viewer
5. Obsługuj długie API przez mockowanie lub timeouty
