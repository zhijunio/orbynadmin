import { IssueTrackingKanban } from "@/components/blocks/application/kanban/kanban-board";
import { WorkflowKanban } from "@/components/blocks/application/kanban/workflow-kanban";
import { SalesPipelineKanban } from "@/components/blocks/application/kanban/sales-pipeline-kanban";
import { FeatureRoadmapKanban } from "@/components/blocks/application/kanban/feature-roadmap-kanban";
import { ProgressRingWorkflowKanban } from "@/components/blocks/application/kanban/progress-ring-workflow-kanban";
import { SupportEscalationsKanban } from "@/components/blocks/application/kanban/support-escalations-kanban";
import { RenewalsRiskKanban } from "@/components/blocks/application/kanban/renewals-risk-kanban";
import { ReleaseReadinessKanban } from "@/components/blocks/application/kanban/release-readiness-kanban";
import { RecruitingPipelineKanban } from "@/components/blocks/application/kanban/recruiting-pipeline-kanban";
import { AccessReviewKanban } from "@/components/blocks/application/kanban/access-review-kanban";

export function KanbanGallery() {
  return (
    <div className="min-w-0 space-y-8">
      <IssueTrackingKanban />
      <WorkflowKanban />
      <SalesPipelineKanban />
      <FeatureRoadmapKanban />
      <ProgressRingWorkflowKanban />
      <SupportEscalationsKanban />
      <RenewalsRiskKanban />
      <ReleaseReadinessKanban />
      <RecruitingPipelineKanban />
      <AccessReviewKanban />
    </div>
  );
}
