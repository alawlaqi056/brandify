import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const createdAt = () => integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull();
const updatedAt = () => integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull();

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  unionId: text("union_id").notNull().unique(),
  name: text("name"), email: text("email"), avatar: text("avatar"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: createdAt(), updatedAt: updatedAt(), lastSignInAt: integer("last_sign_in_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});
export type User = typeof users.$inferSelect;

export const customers = sqliteTable("customers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(), email: text("email").notNull(), phone: text("phone").notNull(), country: text("country").notNull(),
  city: text("city"), address: text("address"), companyName: text("company_name"), brandName: text("brand_name"), website: text("website"), instagram: text("instagram"),
  preferredContact: text("preferred_contact", { enum: ["email", "phone", "whatsapp"] }).default("email"),
  createdAt: createdAt(),
});
export type Customer = typeof customers.$inferSelect;

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }), orderId: text("order_id").notNull().unique(), customerId: integer("customer_id").notNull(),
  category: text("category").notNull(), categoryAr: text("category_ar"),
  status: text("status", { enum: ["submitted","under_review","quotation_preparing","quotation_sent","waiting_approval","payment_pending","production_started","packaging","quality_check","ready_for_delivery","completed","cancelled"] }).default("submitted").notNull(),
  productSelections: text("product_selections", { mode: "json" }).$type<Record<string, unknown>>(),
  packagingSelections: text("packaging_selections", { mode: "json" }).$type<Record<string, unknown>>(),
  quantity: integer("quantity").default(0).notNull(), estimatedBudget: integer("estimated_budget"), estimatedPrice: integer("estimated_price"),
  logoUrl: text("logo_url"), referenceImageUrl: text("reference_image_url"), projectDescription: text("project_description"),
  aiRecommendation: text("ai_recommendation", { mode: "json" }).$type<Record<string, unknown>>(),
  adminNotes: text("admin_notes"), customerNotes: text("customer_notes"), createdAt: createdAt(), updatedAt: updatedAt(),
});
export type Order = typeof orders.$inferSelect;

export const orderStatusHistory = sqliteTable("order_status_history", {
  id: integer("id").primaryKey({ autoIncrement: true }), orderId: integer("order_id").notNull(), status: text("status").notNull(),
  notes: text("notes"), visibleToCustomer: integer("visible_to_customer", { mode: "boolean" }).default(false), createdAt: createdAt(),
});

export const quotations = sqliteTable("quotations", {
  id: integer("id").primaryKey({ autoIncrement: true }), orderId: integer("order_id").notNull(),
  manufacturingCost: integer("manufacturing_cost").default(0), packagingCost: integer("packaging_cost").default(0), brandingCost: integer("branding_cost").default(0),
  websiteCost: integer("website_cost").default(0), photographyCost: integer("photography_cost").default(0), marketingCost: integer("marketing_cost").default(0),
  shippingCost: integer("shipping_cost").default(0), profitMargin: integer("profit_margin").default(35), subtotal: integer("subtotal").default(0), totalPrice: integer("total_price").default(0),
  status: text("status", { enum: ["draft","sent","accepted","rejected","revised"] }).default("draft"), createdAt: createdAt(), updatedAt: updatedAt(),
});
export type Quotation = typeof quotations.$inferSelect;

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }), categoryId: text("category_id").notNull(), name: text("name").notNull(), nameAr: text("name_ar"),
  description: text("description"), descriptionAr: text("description_ar"), image: text("image"), priceMin: integer("price_min").default(0), priceMax: integer("price_max").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true), createdAt: createdAt(),
});
export type Product = typeof products.$inferSelect;

export const factories = sqliteTable("factories", {
  id: integer("id").primaryKey({ autoIncrement: true }), name: text("name").notNull(), country: text("country").notNull(), countryAr: text("country_ar"),
  specialty: text("specialty"), specialtyAr: text("specialty_ar"), moq: integer("moq").default(100), unitCost: integer("unit_cost").default(0),
  packagingCost: integer("packaging_cost").default(0), productionDays: integer("production_days").default(14), isActive: integer("is_active", { mode: "boolean" }).default(true), createdAt: createdAt(),
});
export type Factory = typeof factories.$inferSelect;

export const pricingRules = sqliteTable("pricing_rules", {
  id: integer("id").primaryKey({ autoIncrement: true }), categoryId: text("category_id").notNull(), basePrice: integer("base_price").default(0),
  packagingMultiplier: integer("packaging_multiplier").default(25), marginPercent: integer("margin_percent").default(35), minQuantity: integer("min_quantity").default(100), createdAt: createdAt(),
});
export const mediaAssets = sqliteTable("media_assets", {
  id: integer("id").primaryKey({ autoIncrement: true }), name: text("name").notNull(), url: text("url").notNull(), type: text("type", { enum: ["image","video"] }).default("image"),
  folder: text("folder").default("general"), size: text("size"), createdAt: createdAt(),
});
export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }), key: text("key").notNull().unique(), value: text("value"), updatedAt: updatedAt(),
});
