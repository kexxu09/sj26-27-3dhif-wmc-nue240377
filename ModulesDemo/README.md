# Module in TypeScript

Lösung zur [Modulübung](https://github.com/Die-Spengergasse/course-wmc-5sem/blob/main/20_Typescript/22_Modules.adoc#übungen) auf Basis des dort verlinkten Projekts `ModulesDemo`.

## Starten

Im Projektordner ausführen:

```sh
npm ci
npm start
```

Das Programm berechnet die Flächen von Kreisen, Rechtecken und einem Dreieck mit Grundlinie 6 und Höhe 4. Für das Dreieck erscheint:

```text
triangle: area 12
```

## Bericht und Prüfungen

```sh
npm run report
npm run check
npm test
```

Der Bericht wird über einen dynamischen Import geladen. Die Tests prüfen das Dreieck über die öffentliche Schnittstelle `shapes/index.js`, Randfälle, die bisherigen Formen und die Summe im Bericht.

Die Antworten zu den Aufgaben stehen in [PROTOKOLL.md](PROTOKOLL.md). Der unverändert übernommene Ordner `legacy` enthält das CommonJS-Vergleichsbeispiel aus den Kursunterlagen; das Hauptprogramm verwendet ES Modules.
