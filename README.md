# MongoDB Solutions

This folder contains complete `mongosh` solutions for the two scenarios in the provided assignment.

## Files

1. `cafe-sales.js` - aggregation, filtering, projection, sorting, and top-customer report.
2. `library.js` - inserts, `$inc`, `$set`, upserts, and deletes.
3. `expected-results.txt` - key expected results.

Run the scripts in order from `mongosh`:

```bash
mongosh < cafe-sales.js
mongosh < library.js
```

Each script recreates its own collection before inserting the assignment data, so repeated runs produce the same results.

Alternatively, from this directory:

```bash
./run.sh
```
