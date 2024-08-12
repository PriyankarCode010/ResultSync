import { pgTable, serial, varchar, integer, boolean,} from "drizzle-orm/pg-core";

export const Students = pgTable("Students", {
    id: serial("id"),
    name: varchar("name").notNull(),
    uucms: varchar("uucms").notNull().primaryKey(),
    gender: varchar("gender").notNull(),
    section: varchar("section").notNull(),
    sem: varchar("sem").notNull(),
    batch: varchar("batch").notNull(),
    caste: varchar("caste").notNull().default("general"),
    verified: boolean("verified").notNull().default(false),
});

export const Teachers = pgTable("Teachers", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    U_ID: varchar("U_ID").notNull(),
    gender: varchar("gender").notNull(),
});

export const Sem1 = pgTable("Sem1", {
    id: serial("id").primaryKey(),
    uucms: varchar("uucms").references(() => Students.uucms),
    batch: varchar("batch").notNull().default("0"),
    sub1: integer("sub1").notNull().default(0),
    sub2: integer("sub2").notNull().default(0),
    sub3: integer("sub3").notNull().default(0),
    sub4: integer("sub4").notNull().default(0),
    sub5: integer("sub5").notNull().default(0),
    sub6: integer("sub6").notNull().default(0), // Assuming this includes 8 subjects - 2 labs
    sub7: integer("sub7").notNull().default(0),
    sub8: integer("sub8").notNull().default(0),
    lab1: integer("lab1").notNull().default(0),
    lab2: integer("lab2").notNull().default(0),
    total: integer("total").notNull().default(0),
    per: varchar("per", { length: 20 }).notNull().default("0"),
    status: boolean("status").notNull().default(false),
});


export const Sem2 = pgTable("Sem2", {
    id: serial("id").primaryKey(),
    uucms: varchar("uucms").references(()=>Students.uucms),
    batch: varchar("batch").notNull().default("0"),
    sub1: integer("sub1").notNull().default(0),
    sub2: integer("sub2").notNull().default(0),
    sub3: integer("sub3").notNull().default(0),
    sub4: integer("sub4").notNull().default(0),
    sub5: integer("sub5").notNull().default(0),
    sub6: integer("sub6").notNull().default(0), // Assuming this includes 8 subjects - 2 labs
    sub7: integer("sub7").notNull().default(0),
    sub8: integer("sub8").notNull().default(0),
    lab1: integer("lab1").notNull().default(0),
    lab2: integer("lab2").notNull().default(0),
    total: integer("total").notNull().default(0),
    per: varchar("per", { length: 20 }).notNull().default("0"),
    status: boolean("status").notNull().default(false),
});

export const Sem3 = pgTable("Sem3", {
    id: serial("id").primaryKey(),
    uucms: varchar("uucms").references(()=>Students.uucms),
    batch: varchar("batch").notNull().default("0"),
    sub1: integer("sub1").notNull().default(0),
    sub2: integer("sub2").notNull().default(0),
    sub3: integer("sub3").notNull().default(0),
    sub4: integer("sub4").notNull().default(0),
    sub5: integer("sub5").notNull().default(0), //5 subject - 2 labs
    lab1: integer("lab1").notNull().default(0),
    lab2: integer("lab2").notNull().default(0),
    total: integer("total").notNull().default(0),
    per: varchar("per", { length: 20 }).notNull().default("0"),
    status:boolean("status").notNull(false),
});

export const Sem4 = pgTable("Sem4", {
    id: serial("id").primaryKey(),
    uucms: varchar("uucms").references(()=>Students.uucms),
    batch: varchar("batch").notNull().default("0"),
    sub1: integer("sub1").notNull().default(0),
    sub2: integer("sub2").notNull().default(0),
    sub3: integer("sub3").notNull().default(0),
    sub4: integer("sub4").notNull().default(0),
    sub5: integer("sub5").notNull().default(0), //5 subject - 2 labs
    lab1: integer("lab1").notNull().default(0),
    lab2: integer("lab2").notNull().default(0),
    total: integer("total").notNull().default(0),
    per: varchar("per", { length: 20 }).notNull().default("0"),
    status:boolean("status").notNull(false),
});

export const Sem5 = pgTable("Sem5", {
    id: serial("id").primaryKey(),
    uucms: varchar("uucms").references(()=>Students.uucms),
    batch: varchar("batch").notNull().default("0"),
    sub1: integer("sub1").notNull().default(0),
    sub2: integer("sub2").notNull().default(0),
    sub3: integer("sub3").notNull().default(0),
    sub4: integer("sub4").notNull().default(0),
    sub5: integer("sub5").notNull().default(0), //5 subject - 2 labs
    lab1: integer("lab1").notNull().default(0),
    lab2: integer("lab2").notNull().default(0),
    total: integer("total").notNull().default(0),
    per: varchar("per", { length: 20 }).notNull().default("0"),
    status:boolean("status").notNull(false),
});

export const Sem6 = pgTable("Sem6", {
    id: serial("id").primaryKey(),
    uucms: varchar("uucms").references(()=>Students.uucms),
    batch: varchar("batch").notNull().default("0"),
    sub1: integer("sub1").notNull().default("0"),
    sub2: integer("sub2").notNull().default("0"),
    sub3: integer("sub3").notNull().default("0"),
    sub4: integer("sub4").notNull().default("0"), //4 subject - 2 labs
    lab1: integer("lab1").notNull().default("0"),
    lab2: integer("lab2").notNull().default("0"),
    total:integer("total").notNull().default("0"),
    per: varchar("per", { length: 20 }).notNull().default("0"),
    status:boolean("status").notNull(false),
});


export const Subject = pgTable("Subjects", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    sem: varchar("sem").notNull(),
});
