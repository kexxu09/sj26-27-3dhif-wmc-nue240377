# Protokoll: Module in TypeScript

Name: Hubertus Nützel-Freudenthal

Klasse: 3DHIF

Datum: 06.11.2026

Grundlage sind das [Kapitel über Module](https://github.com/Die-Spengergasse/course-wmc-5sem/blob/main/20_Typescript/22_Modules.adoc) und das dort verlinkte Beispielprojekt `ModulesDemo`. Die interaktive Präsentation behandelt eigene Modulbereiche, named und default exports, `.js`-Importpfade, `import type`, Re-exports, dynamische Importe und den Vergleich mit CommonJS. Das Quiz wurde im Browser mit 12 von 12 gelösten Runden abgeschlossen.

## 1. Welche Dateien wurden geändert?

Das Kursprojekt wurde als eigener Ordner `ModulesDemo` in das WMC-Repo übernommen. Gegenüber der Vorlage wurden folgende Dateien angepasst oder ergänzt:

| Datei | Änderung |
| --- | --- |
| `src/shapes/shape.ts` | Interface `Triangle` mit `kind: "triangle"`, `base` und `height` ergänzt; `Shape` um `Triangle` erweitert. |
| `src/shapes/triangle.ts` | Neu: `createTriangle()` und `triangleArea()` mit der Formel `base * height / 2`. Negative Abmessungen werden abgelehnt. |
| `src/shapes/area.ts` | `triangleArea` importiert und den Fall `"triangle"` im `switch` ergänzt. |
| `src/shapes/index.ts` | Typ `Triangle` und Funktion `createTriangle` weiterexportiert. |
| `src/app.ts` | `createTriangle` über `shapes/index.js` importiert und `createTriangle(6, 4)` zur Liste der Formen hinzugefügt; Begrüßung auf 3DHIF angepasst. |
| `package.json` | Befehle `check` und `test` ergänzt. |
| `tsconfig.json` | `noEmitOnError` aktiviert, damit bei Compilerfehlern keine JavaScript-Dateien erzeugt werden. |
| `test/shapes.test.js` | Neu: Tests für Dreiecke, Randfälle, die bisherigen Formen und den Bericht. |
| `README.md`, `PROTOKOLL.md` | Startanleitung und Antworten zur Übung ergänzt. |

`app.ts` importiert sämtliche Formen ausschließlich aus `shapes/index.js`. Die interne Funktion `triangleArea()` wird nicht über diese öffentliche Schnittstelle weitergegeben.

## 2. Wann meldete der Compiler einen Fehler in area.ts?

Nach dem Ergänzen des Interfaces `Triangle` und der Erweiterung von `Shape` auf `Circle | Rectangle | Triangle`, aber noch vor dem neuen `case "triangle"`, wurde der Compiler mit `tsc --noEmit` gestartet. Er meldete:

```text
src/shapes/area.ts(6,37): error TS2366: Function lacks ending return statement and return type does not include 'undefined'.
```

`area(shape: Shape): number` verspricht für jede erlaubte Form eine Zahl. Der `switch` behandelte zunächst nur `"circle"` und `"rectangle"`. Ein Dreieck hätte den `switch` ohne Rückgabewert verlassen; das Ergebnis wäre `undefined` gewesen. Durch `strict: true` erkennt der Compiler diesen Widerspruch schon vor der Ausführung.

Das ist hilfreich, weil die Erweiterung des Typs automatisch auf eine Stelle aufmerksam macht, die ebenfalls angepasst werden muss. Nach dem Import von `triangleArea()` und dem neuen `case "triangle"` kompiliert das Programm wieder.

## 3. Ergebnis

Für Grundlinie 6 und Höhe 4 gilt `6 * 4 / 2 = 12`. `npm start` gibt `triangle: area 12` aus. `npm run report` enthält zusätzlich `4. triangle: 12`; die Gesamtfläche aller vier Formen beträgt gerundet `186.94`.

`npm run check` prüft die Typen. `npm test` verwendet den eingebauten Node.js-Testläufer und prüft fünf Fälle: Dreieck über die öffentliche Schnittstelle, gebrochene und nullgroße Abmessungen, negative Abmessungen, bisherige Formen und den Bericht mit Dreieck.

Alle fünf Tests und die Typprüfung waren erfolgreich; Programmstart und Bericht wurden ebenfalls ausgeführt.

## 4. Codeumfang

Das Projekt enthält 185 Zeilen TypeScript-Quelltext in zehn Dateien, einschließlich Kommentaren und Leerzeilen. Die größte Datei ist `src/app.ts` mit 32 Zeilen; `src/shapes/triangle.ts` umfasst 18 Zeilen. Die Tests enthalten zusätzlich 35 JavaScript-Zeilen. Abhängigkeiten und erzeugte Dateien sind nicht mitgezählt.
