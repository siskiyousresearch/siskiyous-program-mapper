import { db } from "./db";
import { programs, conversations, messages, type InsertProgram, type SelectProgram, type Conversation, type Message } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getAllPrograms(): Promise<SelectProgram[]>;
  getProgramBySlug(slug: string): Promise<SelectProgram | undefined>;
  createProgram(program: InsertProgram): Promise<SelectProgram>;
  upsertProgram(program: InsertProgram): Promise<SelectProgram>;

  getAllConversations(): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  createConversation(title: string): Promise<Conversation>;
  deleteConversation(id: number): Promise<void>;
  getMessagesByConversation(conversationId: number): Promise<Message[]>;
  createMessage(conversationId: number, role: string, content: string): Promise<Message>;
}

export const storage: IStorage = {
  async getAllPrograms() {
    return db.select().from(programs);
  },

  async getProgramBySlug(slug: string) {
    const [program] = await db.select().from(programs).where(eq(programs.slug, slug));
    return program;
  },

  async createProgram(program: InsertProgram) {
    const [created] = await db.insert(programs).values(program).returning();
    return created;
  },

  async upsertProgram(program: InsertProgram) {
    const existing = await storage.getProgramBySlug(program.slug);
    if (existing) {
      const [updated] = await db.update(programs).set(program).where(eq(programs.slug, program.slug)).returning();
      return updated;
    }
    return storage.createProgram(program);
  },

  async getAllConversations() {
    return db.select().from(conversations).orderBy(desc(conversations.createdAt));
  },

  async getConversation(id: number) {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id));
    return conversation;
  },

  async createConversation(title: string) {
    const [conversation] = await db.insert(conversations).values({ title }).returning();
    return conversation;
  },

  async deleteConversation(id: number) {
    await db.delete(messages).where(eq(messages.conversationId, id));
    await db.delete(conversations).where(eq(conversations.id, id));
  },

  async getMessagesByConversation(conversationId: number) {
    return db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(messages.createdAt);
  },

  async createMessage(conversationId: number, role: string, content: string) {
    const [message] = await db.insert(messages).values({ conversationId, role, content }).returning();
    return message;
  },
};
