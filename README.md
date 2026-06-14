# European cities T-shirts shop

Demo statycznego sklepu internetowego z koszulkami inspirowanymi europejskimi miastami. Projekt został przygotowany jako prosta strona HTML/CSS/JavaScript do testowania funkcjonalności e-commerce oraz integracji z agentem AI obsługującym klientów sklepu.

Strona działa jako demonstracyjny sklep z listą produktów, szczegółami produktu w oknie modalnym, koszykiem zakupowym oraz osadzonym widgetem konwersacyjnym ElevenLabs.

## Adres strony

Strona została przygotowana do działania na GitHub Pages:

```text
https://lukasrozwora.github.io/DemoE-COM/
```

Bezpośrednie linki do produktów działają w schemacie:

```text
https://lukasrozwora.github.io/DemoE-COM/?product=nazwa-produktu
```

Przykład:

```text
https://lukasrozwora.github.io/DemoE-COM/?product=liverpool
```

Po wejściu w taki link strona ładuje główny plik `index.html`, a JavaScript automatycznie otwiera okno szczegółów wybranego produktu.

## Funkcjonalności

Projekt zawiera:

* listę produktów generowaną dynamicznie z pliku `script.js`,
* karty produktów z nazwą, ceną, zdjęciem, wyborem rozmiaru i przyciskami akcji,
* szczegóły produktu otwierane w oknie modalnym,
* indywidualne adresy URL produktów w formacie `?product=slug`,
* obsługę koszyka zakupowego,
* licznik produktów w koszyku,
* możliwość dodania produktu do koszyka,
* możliwość usuwania produktów z koszyka,
* podsumowanie wartości koszyka,
* symulację zakupu,
* możliwość porzucenia koszyka,
* osobne podstrony informacyjne:

  * `regulamin.html`,
  * `dostawa.html`,
  * `zwroty.html`,
* osadzony widget agenta AI ElevenLabs.

## Struktura projektu

Przykładowa struktura plików:

```text
DemoE-COM/
│
├── index.html
├── styles.css
├── script.js
├── regulamin.html
├── dostawa.html
├── zwroty.html
├── README.md
│
├── Gemini_Generated_Image_...
```

## Opis plików

### `index.html`

Główny plik strony sklepu.

Zawiera:

* nagłówek sklepu z nazwą `European cities T-shirts shop`,
* hasło przewodnie `Your journey with the perfect t-shirt`,
* menu ikon prowadzące do regulaminu, zasad dostawy, zasad zwrotów oraz koszyka,
* kontener na listę produktów,
* modal szczegółów produktu,
* modal koszyka,
* modal komunikatów,
* podpięcie plików `styles.css` i `script.js`,
* integrację z widgetem ElevenLabs ConvAI.

### `styles.css`

Plik odpowiada za wygląd strony.

Zawiera między innymi:

* reset podstawowych stylów,
* układ responsywnej siatki produktów,
* wygląd nagłówka,
* style ikon w prawym górnym rogu,
* wygląd kart produktów,
* style wyboru rozmiaru,
* wygląd przycisków,
* style okna szczegółów produktu,
* style koszyka,
* style komunikatów,
* style podstron informacyjnych.

Motyw wizualny opiera się na nowoczesnej, sportowej estetyce z dominującą głęboką zielenią, jasnym tłem oraz miętowym kolorem akcentowym.

### `script.js`

Plik odpowiada za logikę sklepu.

Najważniejsze elementy:

* tablica `products` zawierająca produkty, ceny i adresy grafik,
* dynamiczne generowanie kart produktów,
* obsługa slugów produktów,
* obsługa linków produktowych w formacie `?product=nazwa-produktu`,
* otwieranie szczegółów produktu w modalu,
* wybór rozmiaru,
* dodawanie produktów do koszyka,
* aktualizacja licznika koszyka,
* wyświetlanie zawartości koszyka,
* usuwanie produktów z koszyka,
* symulacja zakupu,
* obsługa porzucenia koszyka,
* zamykanie modali kliknięciem poza oknem lub klawiszem `Escape`.

## Produkty

Sklep zawiera 26 produktów inspirowanych europejskimi miastami:

```text
Manchester
Liverpool
London
Newcastle
Edinburgh
Barcelona
Madrid
Alicante
Sevilla
Valencia
Turyn
Milan
Rimini
Roma
Napoli
Munich
Dortmund
Paris
Amsterdam
Porto
Lizbone
Warsaw
Wroclove
Prague
Athens
Budapest
```

Każdy produkt ma:

* ID,
* nazwę,
* cenę,
* opcjonalny adres grafiki,
* wygenerowany slug wykorzystywany w linku produktu.

Przykład linku do produktu:

```text
https://lukasrozwora.github.io/DemoE-COM/?product=barcelona
```

## Linkowanie produktów

Projekt wykorzystuje linki z parametrem URL zamiast ścieżek typu `/product/liverpool`.

Poprawny format:

```text
?product=liverpool
```

Pełny przykład:

```text
https://lukasrozwora.github.io/DemoE-COM/?product=liverpool
```

Takie rozwiązanie jest zgodne z GitHub Pages, ponieważ GitHub Pages dla statycznych stron nie obsługuje dynamicznych ścieżek typu:

```text
/product/liverpool
```

bez dodatkowej konfiguracji lub pliku `404.html`.

## Koszyk

Koszyk działa po stronie przeglądarki. Jest to funkcjonalność demonstracyjna, bez zapisu danych w bazie i bez integracji z systemem płatności.

Użytkownik może:

* wybrać rozmiar produktu,
* dodać produkt do koszyka,
* otworzyć koszyk,
* usunąć produkt z koszyka,
* kontynuować zakupy,
* zasymulować zakup,
* porzucić koszyk.

Koszyk przechowuje dane tylko tymczasowo w aktualnej sesji strony.

## Integracja z agentem AI

Na stronie osadzony jest widget ElevenLabs ConvAI:

```html
<elevenlabs-convai agent-id="agent_5001kv0vpv6ff95rc2hap33cq5g9"></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
```

Agent może służyć jako doradca klienta w sklepie. Może pomagać użytkownikom w wyborze koszulki, rekomendować miasta oraz kierować klienta do konkretnego produktu za pomocą indywidualnych linków.

Przykład linku, który agent może przekazać klientowi:

```text
https://lukasrozwora.github.io/DemoE-COM/?product=liverpool
```

## Podstrony informacyjne

Projekt zawiera osobne strony informacyjne:

### `regulamin.html`

Strona z regulaminem sklepu.

### `dostawa.html`

Strona opisująca zasady dostawy.

### `zwroty.html`

Strona opisująca zasady zwrotów i reklamacji.

Każda z tych stron korzysta z tego samego pliku stylów `styles.css`, aby zachować spójny wygląd całego demo sklepu.

## Technologie

Projekt wykorzystuje:

* HTML,
* CSS,
* JavaScript,
* GitHub Pages,
* ElevenLabs ConvAI widget.

Nie wymaga backendu, bazy danych ani systemu CMS.

## Charakter projektu

To jest projekt demonstracyjny. Strona nie realizuje prawdziwych płatności, nie zapisuje zamówień i nie przechowuje danych klientów. Głównym celem projektu jest pokazanie działania prostego sklepu internetowego oraz sprawdzenie, jak agent AI może wspierać klienta w wyborze produktu i kierowaniu go do właściwego miejsca na stronie.

## Możliwe dalsze rozwinięcia

Projekt można rozbudować o:

* prawdziwy backend,
* trwały koszyk użytkownika,
* logowanie klientów,
* integrację z CMS lub platformą e-commerce,
* webhook do dodawania produktów do koszyka,
* panel administracyjny produktów,
* obsługę stanów magazynowych,
* integrację z płatnościami,
* lepsze opisy produktów,
* lokalne przechowywanie grafik w katalogu `images`,
* obsługę SEO i Open Graph dla produktów.
