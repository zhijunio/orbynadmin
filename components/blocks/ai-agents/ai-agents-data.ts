export type AiAgentCategory = "ai-chat" | "agent-activity" | "ai-usage";

export type AiAgentExample = {
  slug: string;
  title: string;
  category: AiAgentCategory;
  description: string;
};

export const aiAgentCategories: { slug: AiAgentCategory; title: string }[] = [
  { slug: "ai-chat", title: "AI Chat" },
  { slug: "agent-activity", title: "Agent Activity" },
  { slug: "ai-usage", title: "AI Usage" },
];

export const aiAgentExamples: AiAgentExample[] = [
  { slug: "copilot-shell", title: "Copilot Shell", category: "ai-chat", description: "Full page copilot with a streaming transcript and recent chats." },
  { slug: "docked-assistant", title: "Docked Assistant", category: "ai-chat", description: "Assistant panel alongside a document with insert into draft." },
  { slug: "prompt-starter-welcome", title: "Prompt Starter Welcome", category: "ai-chat", description: "Welcome screen with context-aware prompt starters." },
  { slug: "quote-reply-sidebar", title: "Quote Reply Sidebar", category: "ai-chat", description: "A right sidebar that answers a selected passage." },
  { slug: "connected-apps-chat", title: "Connected Apps Chat", category: "ai-chat", description: "Connected work apps control the answer scope." },
  { slug: "agentic-task-panel", title: "Agentic Task Panel", category: "ai-chat", description: "Agent responses with visible plan and run controls." },
  { slug: "model-comparison", title: "Model Comparison", category: "ai-chat", description: "Run one prompt against two models and compare results." },
  { slug: "voice-assistant-panel", title: "Voice Assistant Panel", category: "ai-chat", description: "Voice-first assistant with a scrubbable conversation turn." },
  { slug: "branching-thread", title: "Branching Thread", category: "ai-chat", description: "Keep alternate answer versions on a branching thread." },
  { slug: "structured-answers", title: "Structured Answers", category: "ai-chat", description: "Scoped sources and answers rendered as useful structures." },
  { slug: "answer-receipts", title: "Answer Receipts", category: "ai-chat", description: "Answer provenance shown as a compact source receipt." },
  { slug: "docs-support-assistant", title: "Docs Support Assistant", category: "ai-chat", description: "Knowledge base lookup that escalates unanswered questions." },
  { slug: "corner-chat-popup", title: "Corner Chat Popup", category: "ai-chat", description: "Corner-launched chat with history and page context." },
  { slug: "approval-run-console", title: "Approval Run Console", category: "agent-activity", description: "Run steps pause for inline approval, revision, or denial." },
  { slug: "live-run-feed", title: "Live Run Feed", category: "agent-activity", description: "Run events in summary, detailed, or raw log views." },
  { slug: "research-timeline", title: "Research Timeline", category: "agent-activity", description: "Research query, sources, files, and confidence in sequence." },
  { slug: "mcp-call-audit", title: "MCP Call Audit", category: "agent-activity", description: "Tool calls attributed to servers, including refused scopes." },
  { slug: "run-outcome-report", title: "Run Outcome Report", category: "agent-activity", description: "Completed run report with item statuses and scoped retry." },
  { slug: "usage-planner", title: "Usage Planner", category: "ai-usage", description: "Estimate token spend by volume, model, and add-ons." },
  { slug: "spend-map", title: "Spend Map", category: "ai-usage", description: "Explore monthly spend by model, team, agent, and key." },
  { slug: "edge-nodes", title: "Edge Nodes", category: "ai-usage", description: "Inspect local inference nodes and power budgets." },
  { slug: "local-models", title: "Local Models", category: "ai-usage", description: "Size open models for a GPU server and apply changes." },
];

export function getAiAgentExample(slug: string) {
  return aiAgentExamples.find((example) => example.slug === slug);
}
