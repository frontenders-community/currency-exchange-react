# Frontenders Community

## Challenge #11 - Currency Exchange
L'obiettivo è quello di realizzare una web app in cui l'utente ha la possibilità di convertire il valore di una valuta in un'altra tramite i due box in basso. Ogni box ha:
- una select tramite cui è possibile selezionare una valuta (nella select di destra deve scomparire la valuta selezionata nella select di sinistra)
- un input numerico dove è possibile inserire un valore monetario

La lista di valute viene fornita dall'API [Frankfurter](https://www.frankfurter.app/docs/). Anche la conversione da una valuta all'altra viene fatta tramite API. Sempre tramite API viene generato un grafico (box sopra) che mostra il rapporto tra la valuta di origine (selezionata nel box a sinistra) e la valuta di destinazione (selezionata nel box di destra).

L'aspetto grafico mostrato nell'immagine è solo di ispirazione. Per il design ci siamo ispirati a [questo lavoro](https://dribbble.com/shots/8171294-Currency-Converter-Animation-Concept) di Eugeniusz Eudokimov. Voi siete liberi di gestire il layout (e soprattutto il grafico) come preferite.

### API Endpoints
- */currencies*
ritorna l'elenco delle valute
- */latest?amount=10&from=EUR&to=USD*
ritorna l'ultimo valore registrato del cambio euro-dollaro, in questo caso la conversione è fatta su un amount di 10 euro
- */2023-03-15..2023-04-15?base=EUR&to=USD*
ritorna i valori dell'ultimo mese del cambio euro-dollaro (occhio al formato delle date e ai puntini sospensivi)

### Tecnologie
E' consigliato svolgere la challenge con un framework (React, Vue o altro). Il grafico è realizzato con chart-js, che presenta dei wrapper anche per i principali framework. Si può comunque scegliere un'altra libreria. Lo stile del grafico è solo d'ispirazione.
