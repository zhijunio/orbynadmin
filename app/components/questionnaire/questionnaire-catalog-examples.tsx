"use client";

import * as React from "react";
import { ComponentPreview } from "@/components/custom/docs/component-preview";
import { Badge } from "@/components/ui/badge/badge";
import { Questionnaire, type QuestionnaireAnswers, type QuestionnaireQuestion } from "@/components/ui/questionnaire/questionnaire";

const usageOptions = [
  { value: "product", label: "Shipping product work", description: "Roadmap, sprint board and release notes", shortcut: "A" },
  { value: "clients", label: "Running client projects", description: "Separate spaces, budgets and approvals", shortcut: "B" },
  { value: "research", label: "Tracking research", description: "Interview notes, findings and shared tags", shortcut: "C" },
];
const flowQuestions: QuestionnaireQuestion[] = [
  { id: "usage", title: "What will you use the workspace for?", description: "This picks a useful starting layout. You can change it later.", options: usageOptions },
  {
    id: "team",
    title: "How many people will join you?",
    description: "Seats stay flexible as your team grows.",
    options: [
      { value: "solo", label: "Just me", description: "A private space" },
      { value: "small", label: "2 to 10", description: "A shared space with light roles" },
      { value: "large", label: "11 to 50", description: "Teams and per-team defaults" },
    ],
  },
  {
    id: "first",
    title: "What should we set up first?",
    description: "Choose the first workspace item to prepare.",
    options: [
      { value: "board", label: "A project board" },
      { value: "report", label: "A weekly report" },
      { value: "import", label: "Import from another tool" },
    ],
  },
];

const showcase = [
  { title: "Workspace Onboarding", index: 0 },
  { title: "Multi-Select Answers", index: 1 },
  { title: "Other Text Option", index: 2 },
  { title: "Segment Progress", index: 3, description: "Step labels with a segmented progress bar." },
  { title: "Optional Step", index: 4, description: "Skip optional questions without blocking completion." },
  { title: "Cross-Field Validation", index: 5, description: "Managed region cannot pair with the Starter plan." },
  { title: "Conditional Questions", index: 6, description: "Later steps appear based on earlier answers." },
];

function QuestionnaireDemo({ index }: { index: number }) {
  const [optionalState, setOptionalState] = React.useState("Not answered");
  const questions: QuestionnaireQuestion[] =
    index === 0
      ? flowQuestions
      : index === 1
        ? [
            {
              id: "tools",
              title: "Which tools does your team use?",
              description: "Select every tool that should be connected.",
              multiple: true,
              options: [
                { value: "slack", label: "Slack" },
                { value: "github", label: "GitHub" },
                { value: "linear", label: "Linear" },
                { value: "drive", label: "Google Drive" },
                { value: "figma", label: "Figma" },
                { value: "other", label: "Another tool" },
              ],
            },
          ]
        : index === 2
          ? [
              {
                id: "region",
                title: "Where do you work from?",
                description: "Pick a region or write in a location.",
                options: [
                  { value: "americas", label: "Americas" },
                  { value: "europe", label: "Europe" },
                  { value: "asia", label: "Asia Pacific" },
                ],
                allowOther: true,
              },
            ]
          : index === 3
            ? [
                { id: "goal", title: "What is your main goal?", options: [{ value: "ship", label: "Ship a product release" }, { value: "coordinate", label: "Coordinate teams" }, { value: "report", label: "Improve reporting" }] },
                { id: "cadence", title: "How often do you review progress?", options: [{ value: "daily", label: "Every day" }, { value: "weekly", label: "Every week" }, { value: "monthly", label: "Every month" }] },
                { id: "digest", title: "Who should receive updates?", options: [{ value: "owners", label: "Project owners" }, { value: "team", label: "The entire team" }] },
              ]
            : index === 4
              ? [
                  { id: "workspace", title: "Choose a workspace type", description: "This first answer is required.", options: [{ value: "team", label: "Team workspace" }, { value: "personal", label: "Personal workspace" }] },
                  { id: "avatar", title: "Add a profile photo", description: "You can skip this and add one later.", optional: true, placeholder: "Image URL or asset name" },
                  { id: "invite", title: "Invite a teammate", description: "Choose one person to invite.", options: [{ value: "jamie", label: "Jamie Chen" }, { value: "riley", label: "Riley Park" }, { value: "amara", label: "Amara Boateng" }] },
                ]
              : index === 5
                ? [
                    { id: "region", title: "Where will data be stored?", options: [{ value: "us", label: "United States" }, { value: "eu", label: "European Union" }, { value: "managed", label: "A region you manage" }] },
                    { id: "plan", title: "Which plan should we prepare?", options: [{ value: "starter", label: "Starter" }, { value: "growth", label: "Growth" }, { value: "enterprise", label: "Enterprise" }] },
                    { id: "owner", title: "Who will approve the agreement?", options: [{ value: "me", label: "I will approve it" }, { value: "legal", label: "Legal team" }] },
                  ]
                : [
                    { id: "usage", title: "How will your team use the workspace?", description: "Your answer determines which setup questions follow.", options: [{ value: "solo", label: "A personal workspace" }, { value: "team", label: "A team inside one company" }, { value: "agency", label: "Client work across several companies" }] },
                    { id: "owner", title: "Who will own the workspace?", options: [{ value: "amara", label: "Amara Boateng · Operations" }, { value: "riley", label: "Riley Park · Engineering" }, { value: "jamie", label: "Jamie Chen · Product" }], visibleWhen: (answers) => answers.usage === "team" || answers.usage === "agency" },
                    { id: "import", title: "What should we import first?", options: [{ value: "projects", label: "Projects and tasks" }, { value: "people", label: "People and roles" }, { value: "files", label: "Files and attachments" }] },
                    { id: "start", title: "When should the workspace open?", options: [{ value: "now", label: "Right away" }, { value: "week", label: "Later this week" }, { value: "later", label: "After the team is briefed" }] },
                  ];

  const validate =
    index === 5
      ? (answers: QuestionnaireAnswers) =>
          answers.region === "managed" && answers.plan === "starter"
            ? { message: "A managed region is available on Growth or Enterprise. Change the region or plan.", questionId: "plan" }
            : undefined
      : undefined;

  if (index === 4)
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Profile photo</span>
          <Badge variant={optionalState === "Skipped" ? "outline" : optionalState === "Answered" ? "secondary" : "outline"}>{optionalState}</Badge>
        </div>
        <Questionnaire
          questions={questions}
          onSkip={() => setOptionalState("Skipped")}
          onAnswersChange={(answers) => setOptionalState(answers.avatar ? "Answered" : "Not answered")}
          completeTitle="Workspace ready"
          completeDescription="Your workspace preferences have been saved."
        />
      </div>
    );

  return (
    <Questionnaire
      questions={questions}
      variant={index === 1 || index === 3 ? "plain" : "card"}
      progressStyle={index === 3 ? "segments" : "bar"}
      showStepLabels={index === 3}
      validate={validate}
      completeTitle={index === 1 ? "Connections saved" : "Setup complete"}
      completeDescription={index === 1 ? "The selected tools are ready to connect." : "Your workspace choices have been saved."}
    />
  );
}

export function QuestionnaireCatalogExamples() {
  return (
    <>
      {showcase.map((item) => (
        <ComponentPreview key={item.title} title={item.title} description={item.description} layout="panel">
          <QuestionnaireDemo index={item.index} />
        </ComponentPreview>
      ))}
    </>
  );
}
