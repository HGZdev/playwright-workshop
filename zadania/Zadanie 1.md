## Zadanie 1 - Test logowania użytkownika do konta bankowego

Piszemy testy logowania do konta bankowego klienta.

### Opis

1. Utwórz plik `tests/login.spec.ts`
2. Napisz test logowania
3. Napisz test nieprawidłowego wypełnienia formularza logowania
4. Uruchommy testy na cztery sposoby:
   - Headless: `npx playwright test`
   - Z przeglądarką: `npx playwright test --headed`
   - Z UI: `npx playwright test --ui`
   - Z panelu Test Explorer w VS Code
5. Zdebugujmy ewentulane błędy
6. Przetestuj też metodę "Record at Cursor"

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
