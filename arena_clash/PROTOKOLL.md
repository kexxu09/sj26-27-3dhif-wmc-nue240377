# Protokoll: Bug-Jagd

## Schritt 1: JavaScript ausführen

Ausgeführt mit `node src/app.js`.

- Die Kills von 5AAIF werden als `012212` statt `35` ausgegeben. Der Startwert `"0"` in `reduce` ist ein String, deshalb werden die Zahlen aneinandergehängt.
- Die KDA ist `NaN`, weil `stats.assist` nicht existiert. Das Feld heißt `assists`; Rechnen mit `undefined` ergibt `NaN`.
- Das Programm stürzt in `src/app.js`, Zeile 22, beim Zugriff auf `player.clan.tag` ab. Bei `404brain` fehlt der Clan.

## Schritt 2: Interfaces

In `src/app.ts` stehen die acht Interfaces `Tournament`, `Venue`, `Team`, `Player`, `Stats`, `Clan`, `Match` und `Score`.

- `realName`, `clan` und `mvp` sind optional, weil sie nicht überall vorhanden sind.
- `score` hat den Typ `Score | null`, weil ein geplantes Match noch keinen Spielstand hat.
- `Role` erlaubt `"tank"`, `"damage"` und `"support"`.
- `MatchStatus` erlaubt `"scheduled"`, `"live"` und `"finished"`.

Die Turnierdaten wurden vorübergehend als `const check: Tournament = ...` eingefügt. `tsc --noEmit` meldete dabei keinen Fehler. Der Check wurde danach wieder entfernt.

## Schritt 3: Compilerfehler

Nach dem Ergänzen der Typen meldete TypeScript 6.0.3 insgesamt **17 Fehlermeldungen**. Mehrere Meldungen betreffen dasselbe Problem. Zusammen sind es **10 Ursachen**:

| Problem | Lösung |
| --- | --- |
| `stats.assist` existiert nicht. | `stats.assists` verwenden. |
| `totalKills` liefert wegen `"0"` einen String. | Mit der Zahl `0` beginnen. |
| `player.clan` kann fehlen. | `player.clan?.tag ?? "-"` verwenden. |
| `winner` hat bei einem Unentschieden keinen Rückgabewert. | `"draw"` zurückgeben. |
| `match.score` kann `null` sein. | Vor dem Zugriff prüfen und bei der Ausgabe `vs` verwenden. |
| `findTeam` kann `undefined` liefern. | Bei unbekanntem Team einen Fehler werfen. |
| Der Status `"done"` ist ungültig. | Mit `"finished"` vergleichen. |
| Die Rolle `"healer"` ist ungültig. | `"support"` verwenden. |
| Beim neuen Spieler fehlt `assists`. | `assists: 0` ergänzen. |
| `mvp` ist ein optionaler Gamertag und kein Spielerobjekt. | Mit `findPlayer` suchen und das Ergebnis prüfen. |

JavaScript würde die falsche Kill-Summe, die ungültige Rolle und den Vergleich mit `"done"` ohne Fehlermeldung akzeptieren. Auch `NaN` durch `assist` oder fehlende `assists` und ein fehlendes `return` lösen allein keinen Absturz aus.

Der Compiler prüft alle erlaubten Fälle, nicht nur die aktuellen Daten. `find` kann grundsätzlich kein passendes Team finden und dann `undefined` liefern. Deshalb muss dieser Fall behandelt werden, auch wenn beide Teams in dieser Datei vorhanden sind.

## Schritt 4: Ergebnis

Alle Fehler sind behoben, ohne `any`, Type Assertions, Non-Null Assertions oder `@ts-ignore` zu verwenden. Die Interfaces bleiben unverändert.

Die Kill-Summen sind `35` und `26`, Spieler ohne Clan erhalten `[-]`, Runde 3 zeigt `vs`, und der MVP wird als Spieler ausgegeben. Null Todesfälle werden bei der KDA als ein Todesfall behandelt.

In den bereits vorhandenen Turnierdaten hat `segfault` den Clan `AURA`. Deshalb steht bei diesem Spieler und beim MVP `[AURA]` statt `[-]` wie im Beispiel der Aufgabe.

Prüfen mit `npm run check`, starten mit `npm run start`. Das ursprüngliche JavaScript bleibt für Schritt 1 erhalten.
