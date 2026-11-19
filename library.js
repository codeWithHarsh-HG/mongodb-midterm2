// Scenario B2: Library updates and deletes
// Run with: mongosh < library.js

use libraryDB;

db.books.drop();

db.books.insertMany([
  { _id: 1, title: "Database Systems", author: "Elmasri", copies: 5, status: "available" },
  { _id: 2, title: "Operating Systems", author: "Galvin", copies: 3, status: "available" },
  { _id: 3, title: "Computer Networks", author: "Tanenbaum", copies: 0, status: "unavailable" },
  { _id: 4, title: "Old Almanac 1990", author: "Unknown", copies: 0, status: "unavailable" },
  { _id: 5, title: "Torn Notes", author: "Unknown", copies: 0, status: "damaged" },
  { _id: 6, title: "Water-damaged Atlas", author: "Unknown", copies: 1, status: "damaged" }
]);

print("\nTask 1: Add copies with $inc");
printjson(db.books.updateMany(
  { title: "Operating Systems" },
  { $inc: { copies: 2 } }
));

print("\nTask 2: Reduce copies when a book is borrowed");
printjson(db.books.updateOne(
  { title: "Database Systems" },
  { $inc: { copies: -1 } }
));

print("\nTask 3: Upsert Artificial Intelligence");
const bookFilter = { title: "Artificial Intelligence", author: "Russell" };
const bookUpdate = { $set: { copies: 4, status: "available" } };
print("First run:");
printjson(db.books.updateOne(bookFilter, bookUpdate, { upsert: true }));
print("Second run:");
printjson(db.books.updateOne(bookFilter, bookUpdate, { upsert: true }));

print("\nTask 4: Update with $set and $inc together");
printjson(db.books.updateOne(
  { title: "Computer Networks" },
  { $set: { status: "available" }, $inc: { copies: 3 } }
));

print("\nTask 5: Delete one matching document");
printjson(db.books.deleteOne({ title: "Old Almanac 1990" }));

print("\nTask 6: Delete all damaged or lost books");
printjson(db.books.deleteMany({ status: { $in: ["damaged", "lost"] } }));

print("\nTask 7: Verify final data");
printjson(db.books.find(
  {},
  { _id: 0, title: 1, copies: 1 }
).sort({ title: 1 }).toArray());
