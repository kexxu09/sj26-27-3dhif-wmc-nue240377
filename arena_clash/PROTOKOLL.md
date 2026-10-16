# Protokoll

## Schritt 1

Die Kills sind `012212` statt `35`, weil bei `reduce` der Startwert `"0"` ein Text ist.
Bei der KDA kommt `NaN`, weil im Code `assist` statt `assists` steht.
In Zeile 22 stürzt das Programm ab, weil `404brain` keinen Clan hat.

## Schritt 2

Interfaces für die JSON-Daten erstellt. `realName`, `clan` und `mvp` können fehlen. `score` kann `null` sein.

## Schritt 3

1. Der Compiler hat 17 Meldungen ausgegeben. Mehrere gehören zum gleichen Fehler, insgesamt sind es 10 Probleme.
2. JavaScript meldet z. B. die falsche Kill-Summe, die Rolle `healer` und den Status `done` nicht als Fehler. Auch `NaN` und ein fehlendes `return` führen allein nicht zum Absturz.
3. `findTeam` könnte kein Team finden. Der Compiler prüft diesen Fall auch, wenn die Teams in unseren Daten vorhanden sind.

## Schritt 4

Fehler behoben. `npm run check` geht ohne Fehler und `npm run start` läuft.
Bei `segfault` steht `[AURA]`, weil dieser Clan schon in meiner JSON-Datei steht.
