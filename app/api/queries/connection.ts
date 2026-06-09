import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "node:path";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };
const sqlite = new Database(path.resolve("brandify-local.db"));
sqlite.pragma("journal_mode = WAL");
sqlite.exec(`
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, union_id TEXT UNIQUE NOT NULL, name TEXT, email TEXT, avatar TEXT, role TEXT NOT NULL DEFAULT 'user', created_at INTEGER NOT NULL DEFAULT (unixepoch()), updated_at INTEGER NOT NULL DEFAULT (unixepoch()), last_sign_in_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, full_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, country TEXT NOT NULL, city TEXT, address TEXT, company_name TEXT, brand_name TEXT, website TEXT, instagram TEXT, preferred_contact TEXT DEFAULT 'email', created_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id TEXT UNIQUE NOT NULL, customer_id INTEGER NOT NULL, category TEXT NOT NULL, category_ar TEXT, status TEXT NOT NULL DEFAULT 'submitted', product_selections TEXT, packaging_selections TEXT, quantity INTEGER NOT NULL DEFAULT 0, estimated_budget INTEGER, estimated_price INTEGER, logo_url TEXT, reference_image_url TEXT, project_description TEXT, ai_recommendation TEXT, admin_notes TEXT, customer_notes TEXT, created_at INTEGER NOT NULL DEFAULT (unixepoch()), updated_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS order_status_history (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL, status TEXT NOT NULL, notes TEXT, visible_to_customer INTEGER DEFAULT 0, created_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS quotations (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL, manufacturing_cost INTEGER DEFAULT 0, packaging_cost INTEGER DEFAULT 0, branding_cost INTEGER DEFAULT 0, website_cost INTEGER DEFAULT 0, photography_cost INTEGER DEFAULT 0, marketing_cost INTEGER DEFAULT 0, shipping_cost INTEGER DEFAULT 0, profit_margin INTEGER DEFAULT 35, subtotal INTEGER DEFAULT 0, total_price INTEGER DEFAULT 0, status TEXT DEFAULT 'draft', created_at INTEGER NOT NULL DEFAULT (unixepoch()), updated_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id TEXT NOT NULL, name TEXT NOT NULL, name_ar TEXT, description TEXT, description_ar TEXT, image TEXT, price_min INTEGER DEFAULT 0, price_max INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1, created_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS factories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, country TEXT NOT NULL, country_ar TEXT, specialty TEXT, specialty_ar TEXT, moq INTEGER DEFAULT 100, unit_cost INTEGER DEFAULT 0, packaging_cost INTEGER DEFAULT 0, production_days INTEGER DEFAULT 14, is_active INTEGER DEFAULT 1, created_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS pricing_rules (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id TEXT NOT NULL, base_price INTEGER DEFAULT 0, packaging_multiplier INTEGER DEFAULT 25, margin_percent INTEGER DEFAULT 35, min_quantity INTEGER DEFAULT 100, created_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS media_assets (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, url TEXT NOT NULL, type TEXT DEFAULT 'image', folder TEXT DEFAULT 'general', size TEXT, created_at INTEGER NOT NULL DEFAULT (unixepoch()));
CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT UNIQUE NOT NULL, value TEXT, updated_at INTEGER NOT NULL DEFAULT (unixepoch()));
`);

const instance = drizzle(sqlite, { schema: fullSchema });
export function getDb() { return instance; }
