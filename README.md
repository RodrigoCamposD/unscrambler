# Unscrambler

This project intends to be as simple as possible running in the browser using DOM elements and language dictionaries in objects to avoid the use of fetch for example and with that the need to run on a server, which is also possible if desired.

The idea of this simple project is to find a "real" word with a given other scrambled word, to do this I use the solution to turn the scrambled word into an array, then that is sorted, then turned back into a string by going through the dictionary looking for matches with the same done for list of words.

eye => EYE => ["E", "Y", "E"] => ["E", "E", "Y"] => EEY

[https://arraythis.com/](https://arraythis.com/) to transform text list in array
[https://kittxt.com/](https://kittxt.com/) tools like uppercase, trim, remove duplicates, etc

You can add your own dict, just update to object "dicts" in words.js

```
const dicts = { language1: ["word1", "word2"], language2: ["word3", "word4"], };
```

No need to be upper case, just remember to use languages name like "enUS"
