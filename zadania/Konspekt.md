# Konspekt Instruktora - Playwright Workshop

## Zadanie 0 - Poznajemy aplikację i narzędzie Playwright

### Działania

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

## Zadanie 1 - Pierwszy test smoke

### Działania

1. ✅ **Metoda ręczna**: Sama piszę test na żywo
2. ✅ Pokazuję składnię: `page` + `locator` + `metoda` + `expect`
3. ✅ Wyjaśniam koncepty
4. ✅ Uruchamiam test

### Wątki do poruszenia

**Page - Fixture**

- Fixture: Automatycznie dostarczona przez Playwright
- Nowa instancja: Każdy test ma świeżą przeglądarkę
- Izolacja: Testy nie wpływają na siebie nawzajem
- Context isolation: Każdy test ma własny context (cookies, localStorage, etc.)

**Locator - Kluczowy element**

- Auto-waiting: Czeka aż element będzie dostępny
- Retry-ability: Automatycznie ponawia próby
- Lazy evaluation: Nie szuka elementu od razu, tylko gdy jest potrzebny
- Reprezentacja: Sposób na znalezienie elementu w dowolnym momencie

**Expect - Walidacja**

- Asercje: Sprawdzają prawdziwość warunków
- Auto-waiting: Czekają aż warunek będzie spełniony
- Różne matchers: toBeVisible, toHaveText, toHaveValue, etc.

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

---

## Zadanie 2 - Test rejestracja i logowania użytkownika

### Działania

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

### Wątki do poruszenia

**Celowy błąd: /dashboard nie znaleziony**

- Po uruchomieniu testu pojawia się błąd - strona `/dashboard` nie ładuje się prawidłowo.
- moze `await page.toHaveURL('/dashboard')` zamiast `await page.waitForURL('/dashboard')`

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

---

## Zadanie 3 - Test rejestracji i logowania użytkownika

### Działania

1. ✅ Uczestniczki piszą same używając **Record at Cursor**
2. ✅ Chodzę i pomagam indywidualnie
3. ✅ Po 10-15 minutach pokazuję swoje rozwiązanie
4. ✅ Omawiam kluczowe uwagi

### Wątki do poruszenia przy rozwiązaniu

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

## Zadanie 4 - Page Object Models

### Działania

1. ✅ Wyjaśniam czym są Page Objects
2. ✅ Pokazuję strukturę katalogów
3. ✅ Tworzę Page Object dla strony rejestracji na żywo
4. ✅ Refaktoryzuję test z Kroku 3
5. ✅ Pokazuję różnicę w czytelności

### Wątki do poruszenia

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

## Zadanie 5 - Test doładowania konta

### Działania

1. ✅ Uczestniczki piszą z Recording + Page Object
2. ✅ Mogą natrafić
3. ✅ Pokazuję błąd: button submit nie zdążył się załadować => `delay: 4000` na submit button.
4. ✅ Debugujemy razem

### Wątki do poruszenia

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

**Przyczyny flaky testów:**

1. Race conditions => Nie czekamy na załadowanie danych
2. Timing issues => Hardcoded delays
3. Źle wybrane selektory => Element się zmienia
4. Współdzielony stan => Testy wpływają na siebie nawzajem
5. Zewnętrzne zależności => API, baza danych

**Jak naprawić:**

1. Używaj auto-waiting Playwright
2. Czekaj na konkretne stany (loading hidden, element visible)
3. Nie używaj hardcoded delays
4. Izoluj testy (różne dane, czyszczenie stanu)

---

## Zadanie 6 - Aplikacja o kredyt (długo przetwarzane API)

### Działania

1. ✅ Pokazuję przygotowany kod testu
2. ✅ Uruchamiamy - timeout!
3. ✅ Debugujemy w UI Mode - widzimy długie API
4. ✅ Pokazuję 3 sposoby rozwiązania problemu
5. ✅ Omawiam kiedy który sposób stosować

### Rozwiązania problemu timeoutu

#### Rozwiązanie 1: Globalny Action timeout

Ustawienie w `playwright.config.js`

#### Rozwiązanie 2: Action timeout dla konkretnej akcji

Przekazanie timeout jako parametr do akcji

#### Rozwiązanie 3: Globalny timeout

Ustawienie w `playwright.config.js`

#### Rozwiązanie 4: Timeout dla konkretnego testu

Użycie `test.setTimeout()`

#### Rozwiązanie 5: Mockowanie długiego API

```typescript
await page.route('**/api/send-money/**', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true }),
  });
});
```

- Zalety: Bardzo szybkie testy, deterministyczne, nie zależymy od zewnętrznych serwisów
- Wady: Nie testujemy prawdziwego API

### Debugowanie długich testów

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
6. Staraj się unikać funkcji sztucznie zatrzymujacych testy np. `waitforTimeout` i `delay`
