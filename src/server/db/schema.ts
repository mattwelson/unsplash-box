// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql, type SQL } from "drizzle-orm";
import {
  real,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const collections = pgTable(
  "collection",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
    userIdIndex: index("user_idx").on(example.userId),
  }),
);

export const collectionsRelations = relations(collections, ({ many }) => ({
  images: many(images),
}));

export const images = pgTable(
  "image",
  {
    id: text("id").primaryKey(),
    collectionId: text("collection_id")
      .references(() => collections.id, {
        onDelete: "cascade",
      })
      .notNull(),
    unsplashId: text("unsplash_id").notNull(),
    color: text("color").notNull(),
    height: real("height").notNull(),
    width: real("width").notNull(),
    aspectRatio: real("aspect_ratio").generatedAlwaysAs(
      (): SQL => sql`${images.height}::real / ${images.width}`,
    ),
    altDescription: text("alt_description").notNull(),
    url: text("url").notNull(),
  },
  (example) => ({
    unsplashIdIndex: index("unsplash_idx").on(example.unsplashId),
  }),
);

export const imagesRelations = relations(images, ({ one }) => ({
  collection: one(collections, {
    fields: [images.collectionId],
    references: [collections.id],
  }),
}));
