import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  programContext: z.object({
    title: z.string(),
    degreeType: z.string(),
    description: z.string(),
    years: z.any(),
  }).nullable().optional(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ── Programs ──
  app.get("/api/programs", async (_req, res) => {
    try {
      const allPrograms = await storage.getAllPrograms();
      res.json(allPrograms);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ error: "Failed to fetch programs" });
    }
  });

  app.get("/api/programs/:slug", async (req, res) => {
    try {
      const program = await storage.getProgramBySlug(req.params.slug);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      console.error("Error fetching program:", error);
      res.status(500).json({ error: "Failed to fetch program" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const parsed = chatRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
      }
      const { message, programContext } = parsed.data;

      const contextJson = programContext ? JSON.stringify(programContext.years).slice(0, 4000) : "";
      const systemPrompt = `You are MapperGPT, an AI academic advisor for College of the Siskiyous. You help students plan their coursework, understand prerequisites, and navigate their degree pathways.

${programContext ? `The student is currently viewing the following program:
Program: ${programContext.title} (${programContext.degreeType})
Description: ${programContext.description}
Course data: ${contextJson}` : "The student hasn't selected a specific program yet."}

Guidelines:
- Be friendly, encouraging, and supportive
- Give specific course recommendations when possible
- Warn about prerequisite chains
- Suggest semester load balancing
- Reference actual course codes and titles from the program data
- Keep responses concise but helpful (2-4 paragraphs max)
- If asked about something outside your knowledge, acknowledge it honestly`;

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        stream: true,
        max_completion_tokens: 1024,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error in chat:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Failed to get response" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to process chat message" });
      }
    }
  });

  return httpServer;
}
