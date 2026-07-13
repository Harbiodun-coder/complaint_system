import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Missing MONGODB_URI. Copy .env.local.example to .env.local and set it."
  );
}

// Next.js reloads API routes in dev, which can create many DB connections.
// Caching the connection on the global object prevents that.
let cached = global._mongooseConn;

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
