import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import type { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/data/transform";
import type { FontFamilyValues } from "@excalidraw/excalidraw/element/types";

export type BoardTemplate = { id: string; name: string; description: string; elements: ExcalidrawElementSkeleton[] };
export type SprintLaneId = "express-pay" | "receipts" | "offline-research" | "parked";
export type SprintTask = { id: string; title: string; points: number; owner: string; initials: string; lane: SprintLaneId; votes: number[]; tone: string };
export type SprintLane = { id: SprintLaneId; title: string; capacity: number };

export const sprintLanes: SprintLane[] = [
  { id: "express-pay", title: "Express Pay", capacity: 13 },
  { id: "receipts", title: "Receipts", capacity: 10 },
  { id: "offline-research", title: "Offline Research", capacity: 8 },
  { id: "parked", title: "Parked", capacity: 0 },
];

export const initialSprintTasks: SprintTask[] = [
  { id: "SP-241", title: "Apple Pay sheet", points: 5, owner: "Omar Farouk", initials: "OF", lane: "express-pay", votes: [5, 5, 3], tone: "#dbeafe" },
  { id: "SP-242", title: "Card fallback", points: 3, owner: "Omar Farouk", initials: "OF", lane: "express-pay", votes: [3, 3, 2], tone: "#dbeafe" },
  { id: "SP-243", title: "Rollout flag 10%", points: 2, owner: "Omar Farouk", initials: "OF", lane: "express-pay", votes: [2, 2, 3], tone: "#dbeafe" },
  { id: "SP-244", title: "Refund path", points: 3, owner: "Omar Farouk", initials: "OF", lane: "express-pay", votes: [3, 3, 5], tone: "#dbeafe" },
  { id: "SP-245", title: "Email receipt", points: 3, owner: "Sofia Marino", initials: "SM", lane: "receipts", votes: [3, 3, 2], tone: "#dcfce7" },
  { id: "SP-246", title: "Reprint receipt", points: 2, owner: "Sofia Marino", initials: "SM", lane: "receipts", votes: [2, 2, 1], tone: "#dcfce7" },
  { id: "SP-247", title: "Receipt QR code", points: 3, owner: "Sofia Marino", initials: "SM", lane: "receipts", votes: [3, 3, 3], tone: "#dcfce7" },
  { id: "SP-248", title: "Merchant calls", points: 3, owner: "Emma Lindgren", initials: "EL", lane: "offline-research", votes: [3, 3, 5], tone: "#ede9fe" },
  { id: "SP-249", title: "Sync conflicts", points: 2, owner: "Emma Lindgren", initials: "EL", lane: "offline-research", votes: [2, 2, 3], tone: "#ede9fe" },
  { id: "SP-250", title: "Split tender", points: 8, owner: "Unassigned", initials: "—", lane: "parked", votes: [8, 8, 5], tone: "#f8fafc" },
  { id: "SP-251", title: "Tip presets", points: 3, owner: "Unassigned", initials: "—", lane: "parked", votes: [3, 3, 5], tone: "#f8fafc" },
];

const note = (id: string, text: string, x: number, y: number, width: number, height: number, backgroundColor = "transparent", fontSize = 16, textAlign: "left" | "center" = "left", fontFamily: FontFamilyValues = 1): ExcalidrawElementSkeleton => ({
  type: "text", id, text, x, y, width, height, fontSize, fontFamily, strokeColor: "#202124", backgroundColor, textAlign, verticalAlign: "top", roughness: 0,
});
const frame = (id: string, name: string, x: number, y: number, width: number, height: number, metadata: Record<string, string | number> = {}): ExcalidrawElementSkeleton => ({
  type: "frame", id, name, children: [], x, y, width, height, strokeColor: "#a3a3a3", strokeWidth: 1, roughness: 0, customData: { boardFrameId: id, ...metadata },
});
const cardElements = (id: string, text: string, x: number, y: number, width: number, height: number, fill: string, fontSize = 14, outline = false, fontFamily: FontFamilyValues = 1): ExcalidrawElementSkeleton[] => [
  {
    type: "rectangle", id: `shape-${id}`, x, y, width, height, strokeColor: outline ? "#202124" : fill,
    backgroundColor: fill, fillStyle: "solid", strokeWidth: outline ? 1 : 0, roughness: 0, roundness: { type: 3 },
    customData: { boardItemId: id },
  },
    { ...note(`label-${id}`, text, x + 6, y + 8, width - 12, height - 16, "transparent", fontSize, "left", fontFamily), customData: { boardItemId: id } },
];

export const reviewTemplates: BoardTemplate[] = [
  {
    id: "design-review", name: "Design review", description: "Goals, user flow, open questions and decisions",
    elements: createReviewElements(),
  },
  {
    id: "user-flow", name: "User flow", description: "Map the checkout path from cart to completion",
    elements: [
      frame("template-entry", "Entry", 50, 180, 220, 180),
      ...cardElements("template-entry-note", "Cart", 90, 240, 140, 54, "#ffffff", 18, true),
      frame("template-decision", "Decision", 350, 180, 260, 180),
      ...cardElements("template-decision-note", "Saved card?", 395, 240, 170, 54, "#ffffff", 18, true),
      frame("template-outcome", "Outcome", 690, 180, 220, 180),
      ...cardElements("template-outcome-note", "Payment complete", 720, 240, 160, 54, "#ffffff", 16, true),
      { type: "arrow", id: "template-entry-link", x: 230, y: 267, width: 165, height: 0, endArrowhead: "arrow" },
      { type: "arrow", id: "template-outcome-link", x: 565, y: 267, width: 125, height: 0, endArrowhead: "arrow" },
    ],
  },
  {
    id: "retro", name: "Team retro", description: "Keep, improve and try next",
    elements: [
      frame("template-keep", "Keep", 50, 180, 260, 220),
      ...cardElements("template-keep-note", "What worked well?", 85, 240, 190, 80, "#bbf7d0", 16),
      frame("template-improve", "Improve", 350, 180, 260, 220),
      ...cardElements("template-improve-note", "What slowed us down?", 385, 240, 190, 80, "#bfdbfe", 16),
      frame("template-try", "Try next", 650, 180, 260, 220),
      ...cardElements("template-try-note", "One action to test", 685, 240, 190, 80, "#ddd6fe", 16),
    ],
  },
  {
    id: "brainstorm", name: "Brainstorm", description: "Collect ideas and pick the next experiment",
    elements: [
      frame("template-ideas", "Ideas", 50, 180, 300, 220),
      ...cardElements("template-idea-1", "What if checkout\nworked offline?", 75, 230, 120, 66, "#fef08a", 12),
      ...cardElements("template-idea-2", "One-tap repeat\npurchase", 205, 260, 120, 66, "#bfdbfe", 12),
      frame("template-experiment", "Next experiment", 390, 180, 300, 220),
      ...cardElements("template-experiment-note", "Test with 5 customers", 430, 245, 220, 72, "#bbf7d0", 16),
    ],
  },
];

export function createReviewElements(): ExcalidrawElementSkeleton[] {
  const elements: ExcalidrawElementSkeleton[] = [];
  const goals = [
    ["goal-quit", "Mobile: 38% quit\nat the payment step", "#fef08a"],
    ["goal-dropoff", "Goal: 30%\npayment drop-off\nby Q4", "#bbf7d0"],
    ["goal-scope", "No new PCI scope\nMetric owner: Priya", "#bfdbfe"],
  ] as const;
  const questions = [
    ["question-wallets", "Express wallets\non web in scope?\nKenji", "#fef08a"],
    ["question-guest", "Keep guest\ncheckout?\nPriya", "#fef08a"],
    ["question-android", "Card scan on\nAndroid only?\nOmar", "#bfdbfe"],
    ["question-saved", "Which saved\ncard is the\ndefault? Emma", "#ddd6fe"],
  ] as const;
  const decisions = [
    ["decision-wallet", "Wallet buttons\nship first\nKenji · Oct 8", "#bbf7d0"],
    ["decision-pay", "exp_express_pay\nstays at 10%\nPriya", "#bbf7d0"],
    ["decision-review", "One-page review\nstays one page\nSofia · Oct 2", "#bbf7d0"],
  ] as const;
  const checkout = [
    ["checkout-wallet", "Wallet buttons\nabove the card\nform", "#fef08a"],
    ["checkout-billing", "Billing copies\nshipping", "#bfdbfe"],
    ["checkout-errors", "Card errors are\neasy to miss", "#fecaca"],
  ] as const;
  elements.push(frame("frame-goals", "Goals", 40, 160, 190, 245));
  goals.forEach(([id, text, fill], index) => elements.push(...cardElements(id, text, 58, 190 + index * 67, 154, 62, fill, index === 1 ? 11 : 13)));

  elements.push(frame("frame-user-flow", "User Flow", 265, 160, 665, 245));
  elements.push(
    ...cardElements("flow-cart", "Cart", 290, 210, 80, 38, "#ffffff", 15, true),
    ...cardElements("flow-shipping", "Shipping", 390, 210, 85, 38, "#ffffff", 15, true),
    { type: "diamond", id: "flow-saved", x: 505, y: 198, width: 80, height: 58, strokeColor: "#202124", backgroundColor: "#ffffff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
    note("flow-saved-label", "Saved card?", 513, 219, 64, 18, "transparent", 12, "center"),
    ...cardElements("flow-review", "Review", 625, 210, 80, 38, "#ffffff", 15, true),
    ...cardElements("flow-done", "Done", 750, 210, 80, 38, "#ffffff", 15, true),
    ...cardElements("flow-add", "Add Card", 480, 300, 100, 38, "#ffffff", 15, true),
    ...cardElements("flow-note", "Most exits happen\non the card form", 285, 325, 150, 52, "#fecaca", 13),
    { type: "arrow", id: "flow-a1", x: 370, y: 229, width: 20, height: 0, endArrowhead: "arrow" },
    { type: "arrow", id: "flow-a2", x: 475, y: 229, width: 25, height: 0, endArrowhead: "arrow" },
    { type: "arrow", id: "flow-a3", x: 585, y: 229, width: 35, height: 0, endArrowhead: "arrow" },
    { type: "arrow", id: "flow-a4", x: 705, y: 229, width: 45, height: 0, endArrowhead: "arrow" },
    { type: "arrow", id: "flow-a5", x: 544, y: 257, width: 1, height: 35, endArrowhead: "arrow" },
    { type: "arrow", id: "flow-a6", x: 580, y: 319, width: 85, height: 0 },
    { type: "arrow", id: "flow-a7", x: 665, y: 319, width: 1, height: -71, endArrowhead: "arrow" },
    { ...note("flow-yes", "Yes", 588, 207, 30, 18, "transparent", 11) },
    { ...note("flow-no", "No", 550, 265, 25, 18, "transparent", 11) },
    { ...note("flow-pay", "Pay", 710, 207, 28, 18, "transparent", 11) },
    { ...note("flow-context", "Mobile web, signed-in shoppers", 285, 380, 220, 16, "transparent", 11), customData: { boardItemId: "flow-context" } },
  );

  elements.push(frame("frame-checkout", "Checkout v2", 40, 460, 335, 235));
  elements.push(
    ...cardElements("checkout-phone", "Checkout", 58, 490, 106, 185, "#ffffff", 11, true),
    ...cardElements("checkout-wallet-apple", "Apple Pay", 66, 514, 90, 20, "#202124", 9),
    ...cardElements("checkout-wallet-google", "Google Pay", 66, 540, 90, 20, "#202124", 9),
    ...cardElements("checkout-email", "Email address", 66, 569, 90, 23, "#ffffff", 8, true),
    ...cardElements("checkout-card-number", "Card number", 66, 597, 90, 23, "#fff1f2", 8, true),
    ...cardElements("checkout-expiry", "MM / YY", 66, 635, 42, 21, "#ffffff", 8, true),
    ...cardElements("checkout-cvc", "CVC", 114, 635, 42, 21, "#ffffff", 8, true),
    ...cardElements("checkout-continue", "Continue", 66, 660, 90, 18, "#202124", 9),
    { ...note("checkout-error", "Check card details", 66, 622, 90, 10, "transparent", 7), strokeColor: "#b91c1c" },
  );
  checkout.forEach(([id, text, fill], index) => elements.push(...cardElements(id, text, 178, 490 + index * 58, 178, 48, fill, id === "checkout-wallet" ? 10 : 12)));
  elements.push(...cardElements("checkout-more", "+3", 178, 668, 36, 22, "#ddd6fe", 10));

  elements.push(frame("frame-open-questions", "Open Questions", 410, 460, 335, 205));
  questions.forEach(([id, text, fill], index) => elements.push(...cardElements(id, text, 430 + (index % 2) * 150, 490 + Math.floor(index / 2) * 78, 138, 65, fill, 11)));
  elements.push(frame("frame-decisions", "Decisions", 780, 460, 180, 235));
  decisions.forEach(([id, text, fill], index) => elements.push(...cardElements(id, text, 795, 490 + index * 62, 150, 60, fill, 10)));
  return elements;
}

export function createSprintElements(tasks: SprintTask[] = initialSprintTasks): ExcalidrawElementSkeleton[] {
  const elements: ExcalidrawElementSkeleton[] = [];
  elements.push(frame("frame-sprint-goal", "Sprint Goal", 40, 130, 340, 125));
    elements.push(...cardElements("sprint-goal-1", "Express Pay live for\n10% of web merchants", 60, 160, 175, 62, "#fef9c3", 14, false, 2));
    elements.push(...cardElements("sprint-goal-2", "Demo on Oct 9", 245, 160, 115, 62, "#fef9c3", 14, false, 2));
  elements.push(frame("frame-risks", "Risks", 415, 130, 545, 125));
    elements.push(...cardElements("risk-domain", "Apple Pay domain\nnot verified", 435, 160, 158, 62, "#fee2e2", 13, false, 2));
    elements.push(...cardElements("risk-legal", "Legal review on\nreceipt copy", 605, 160, 158, 62, "#fee2e2", 13, false, 2));
    elements.push(...cardElements("risk-emma", "Emma away Oct 5\nand 6", 775, 160, 158, 62, "#fee2e2", 13, false, 2));

  const positions: Record<SprintLaneId, { x: number; y: number; width: number; height: number }> = {
    "express-pay": { x: 40, y: 335, width: 215, height: 340 },
    receipts: { x: 280, y: 335, width: 215, height: 340 },
    "offline-research": { x: 520, y: 335, width: 215, height: 340 },
    parked: { x: 760, y: 335, width: 200, height: 340 },
  };
  for (const lane of sprintLanes) {
    const laneTasks = tasks.filter((task) => task.lane === lane.id);
    const laneOwner = laneTasks.length ? [...new Set(laneTasks.map((task) => task.owner.split(" ")[0]))].join(", ") : "Unassigned";
    elements.push(frame(`frame-${lane.id}`, lane.title, positions[lane.id].x, positions[lane.id].y, positions[lane.id].width, positions[lane.id].height, { laneId: lane.id, capacity: lane.capacity, owner: laneOwner }));
    laneTasks.forEach((task, index) => {
      const taskId = `task-${task.id}`;
      const x = positions[lane.id].x + 15;
      const y = positions[lane.id].y + 28 + index * 70;
      elements.push(
        { type: "rectangle", id: `shape-${taskId}`, x, y, width: positions[lane.id].width - 30, height: 64, strokeColor: task.tone, backgroundColor: task.tone, fillStyle: "solid", strokeWidth: 0, roughness: 0, roundness: { type: 3 }, groupIds: [`task-${task.id}`], customData: { boardItemId: taskId, boardItemPart: "card" } },
        { ...note(`label-${taskId}`, `${task.title}\n${task.points} pts`, x + (positions[lane.id].width - 30) / 2, y + 8, positions[lane.id].width - 42, 44, "transparent", 14, "center", 2), groupIds: [`task-${task.id}`], customData: { boardItemId: taskId, boardItemPart: "label" } },
      );
      if (task.id === "SP-245") {
        elements.push(
          { type: "rectangle", id: `presence-${taskId}`, x: x - 4, y: y - 4, width: positions[lane.id].width - 22, height: 72, strokeColor: "#a855f7", backgroundColor: "transparent", fillStyle: "solid", strokeWidth: 2, strokeStyle: "dashed", roughness: 0, roundness: { type: 3 }, groupIds: [`task-${task.id}`], customData: { boardItemId: taskId, boardItemPart: "presence-outline" } },
          { type: "rectangle", id: `presence-tag-${taskId}`, x: x + 105, y: y - 16, width: 88, height: 17, strokeColor: "#7e22ce", backgroundColor: "#7e22ce", fillStyle: "solid", strokeWidth: 0, roughness: 0, roundness: { type: 3 }, groupIds: [`task-${task.id}`], customData: { boardItemId: taskId, boardItemPart: "presence-tag" } },
          { ...note(`presence-label-${taskId}`, "Sofia Marino", x + 109, y - 13, 80, 12, "transparent", 9), strokeColor: "#ffffff", groupIds: [`task-${task.id}`], customData: { boardItemId: taskId, boardItemPart: "presence-label" } },
        );
      }
    });
  }
  return elements;
}

export function createReviewScene() {
  return convertToExcalidrawElements(createReviewElements());
}

export function createSprintScene(tasks: SprintTask[] = initialSprintTasks) {
  return convertToExcalidrawElements(createSprintElements(tasks));
}

