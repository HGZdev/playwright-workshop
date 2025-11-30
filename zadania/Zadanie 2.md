## Zadanie 2 - Test logowania użytkownika do konta bankowego

Piszemy testy rejestracji i logowania do konta bankowego klienta.

### Opis

1. Utwórz plik `tests/userAuth.spec.ts`
2. Napisz test rejestracji i logowania
3. Uruchommy testy na cztery sposoby:
   - Headless: `npx playwright test`
   - Z przeglądarką: `npx playwright test --headed`
   - Z UI: `npx playwright test --ui`
   - Z panelu Test Explorer w VS Code
4. Zdebugujmy ewentulane błędy
5. Przetestuj też metodę "Record at Cursor"

### Dodatkowe informacje

Dane usera dostepnego w bazie:

- email: client@gmail.com
- password: client@gmail.com

Dane admina dostepnego w bazie:

- email: admin@gmail.com
- password: admin@gmail.com

#### Metody na locatorze

- `getByTitle` - metoda znajdująca element poprzez atrybut `title`
- `getByRole` - metoda znajdująca element poprzez role
  - https://playwright.dev/docs/locators#locate-by-role # dokumentacja Playwright
  - https://www.w3.org/TR/wai-aria-1.2/#roles # definicje roli WAI-ARIA
- `getByLabel` - metoda znajdująca element poprzez: `<Label>`, atrybut `aria-label` , atrybut `aria-labelledby` i tekst wewnątrz elementu
- `getByPlaceholder` - metoda znajdująca element poprzez atrybut `placeholder`
- `getByText` - metoda znajdująca element poprzez tekst wewnątrz elementu
- `getByTestId` - metoda znajdująca element poprzez atrybut `data-testid`

#### Filtrowanie locatorów

- Zawęża wyniki locatora
- `hasText`: Filtruje po tekście
- `has`: Filtruje po zawartym locatorze

#### Akcje na locatorze

- `fill` - wypełnianie pola formularza
- `filter` - filtrowanie locatorów po tekście lub innych locatorach
- `evaluateAll()` - wykonywanie funkcji na wszystkich elementach
