"use client";

import {
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { IconChevronRight as ChevronRight, IconFile as File, IconFolder as Folder, IconFolderOpen as FolderOpen } from "@tabler/icons-react";

import { cn } from "@/utils/cn";

export type TreeViewNode = {
  id: string;
  label: string;
  children?: TreeViewNode[];
  disabled?: boolean;
  trailingContent?: ReactNode;
  icon?: ReactNode;
};

export type TreeViewProps = Omit<
  ComponentProps<"div">,
  "children" | "onSelect"
> & {
  items: TreeViewNode[];
  "aria-label": string;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  selectionMode?: "single" | "multiple" | "none";
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  size?: "default" | "sm";
  showGuides?: boolean;
  emptyState?: ReactNode;
};

function flattenVisibleNodes(
  nodes: TreeViewNode[],
  expandedIds: Set<string>,
  depth = 0,
  parentId: string | null = null,
): Array<{ node: TreeViewNode; parentId: string | null; depth: number }> {
  return nodes.flatMap((node) => {
    const current = [{ node, parentId, depth }];
    return node.children?.length && expandedIds.has(node.id)
      ? [...current, ...flattenVisibleNodes(node.children, expandedIds, depth + 1, node.id)]
      : current;
  });
}

export function TreeView({
  items,
  "aria-label": ariaLabel,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  selectionMode = "single",
  selectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  size = "default",
  showGuides = true,
  emptyState = "No items.",
  className,
  ...props
}: TreeViewProps) {
  const [internalExpandedIds, setInternalExpandedIds] =
    useState(defaultExpandedIds);
  const [internalSelectedIds, setInternalSelectedIds] =
    useState(defaultSelectedIds);
  const [focusedId, setFocusedId] = useState(
    defaultSelectedIds[0] ?? items[0]?.id ?? "",
  );
  const anchorIdRef = useRef(defaultSelectedIds[0] ?? null);
  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const expanded = expandedIds ?? internalExpandedIds;
  const selected = selectedIds ?? internalSelectedIds;
  const selectedSet = new Set(selected);
  const expandedSet = new Set(expanded);
  const visibleNodes = flattenVisibleNodes(items, expandedSet);
  const focusableNodes = visibleNodes.filter(({ node }) => !node.disabled);
  const currentFocusId = focusableNodes.some(({ node }) => node.id === focusedId)
    ? focusedId
    : (focusableNodes[0]?.node.id ?? "");

  function updateExpanded(next: string[]) {
    if (expandedIds === undefined) setInternalExpandedIds(next);
    onExpandedChange?.(next);
  }

  function updateSelected(id: string, extendRange = false) {
    if (selectionMode === "none") return;

    let next: string[];
    if (selectionMode === "single") {
      next = [id];
      anchorIdRef.current = id;
    } else if (extendRange) {
      const anchorId = anchorIdRef.current ?? selected[0] ?? id;
      const startIndex = focusableNodes.findIndex(({ node }) => node.id === anchorId);
      const endIndex = focusableNodes.findIndex(({ node }) => node.id === id);
      if (startIndex < 0 || endIndex < 0) {
        anchorIdRef.current = id;
        next = [id];
      } else {
        const first = Math.min(startIndex, endIndex);
        const last = Math.max(startIndex, endIndex);
        next = focusableNodes
          .slice(first, last + 1)
          .map(({ node }) => node.id);
      }
    } else {
      next = selectedSet.has(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id];
      anchorIdRef.current = id;
    }

    if (selectedIds === undefined) setInternalSelectedIds(next);
    onSelectionChange?.(next);
  }

  function focusNode(id: string | undefined) {
    if (!id) return;
    setFocusedId(id);
    itemRefs.current.get(id)?.focus();
  }

  function toggleExpanded(id: string) {
    updateExpanded(
      expandedSet.has(id)
        ? expanded.filter((expandedId) => expandedId !== id)
        : [...expanded, id],
    );
  }

  function focusRelativeNode(id: string, offset: number) {
    const currentIndex = focusableNodes.findIndex(({ node }) => node.id === id);
    focusNode(focusableNodes[currentIndex + offset]?.node.id);
  }

  function handleKeyDown(
    id: string,
    parentId: string | null,
    node: TreeViewNode,
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    event.stopPropagation();
    const hasChildren = Boolean(node.children?.length);
    const isExpanded = expandedSet.has(id);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (event.shiftKey && selectionMode === "multiple") {
          const nextId = focusableNodes[
            focusableNodes.findIndex(({ node: visibleNode }) => visibleNode.id === id) + 1
          ]?.node.id;
          if (nextId) updateSelected(nextId, true);
          focusNode(nextId);
        } else {
          focusRelativeNode(id, 1);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (event.shiftKey && selectionMode === "multiple") {
          const previousId = focusableNodes[
            focusableNodes.findIndex(({ node: visibleNode }) => visibleNode.id === id) - 1
          ]?.node.id;
          if (previousId) updateSelected(previousId, true);
          focusNode(previousId);
        } else {
          focusRelativeNode(id, -1);
        }
        break;
      case "Home":
        event.preventDefault();
        if (event.shiftKey && selectionMode === "multiple") {
          const firstId = focusableNodes[0]?.node.id;
          if (firstId) updateSelected(firstId, true);
          focusNode(firstId);
        } else {
          focusNode(focusableNodes[0]?.node.id);
        }
        break;
      case "End":
        event.preventDefault();
        if (event.shiftKey && selectionMode === "multiple") {
          const lastId = focusableNodes.at(-1)?.node.id;
          if (lastId) updateSelected(lastId, true);
          focusNode(lastId);
        } else {
          focusNode(focusableNodes.at(-1)?.node.id);
        }
        break;
      case "ArrowRight":
        if (!hasChildren) return;
        event.preventDefault();
        if (!isExpanded) toggleExpanded(id);
        else focusNode(node.children?.find((child) => !child.disabled)?.id);
        break;
      case "ArrowLeft":
        if (hasChildren && isExpanded) {
          event.preventDefault();
          toggleExpanded(id);
        } else if (parentId) {
          event.preventDefault();
          focusNode(parentId);
        }
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        updateSelected(id, event.shiftKey);
        break;
    }
  }

  function renderNodes(nodes: TreeViewNode[], parentId: string | null = null) {
    return nodes.map((node, index) => {
      const hasChildren = Boolean(node.children?.length);
      const isExpanded = expandedSet.has(node.id);
      const depth = parentId
        ? (visibleNodes.find((entry) => entry.node.id === node.id)?.depth ?? 1)
        : 0;

      return (
        <div
          key={node.id}
          ref={(element) => {
            if (element) itemRefs.current.set(node.id, element);
            else itemRefs.current.delete(node.id);
          }}
          role="treeitem"
          aria-level={depth + 1}
          aria-posinset={index + 1}
          aria-setsize={nodes.length}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={selectionMode === "none" ? undefined : selectedSet.has(node.id)}
          aria-disabled={node.disabled || undefined}
          tabIndex={currentFocusId === node.id ? 0 : -1}
          onFocus={() => setFocusedId(node.id)}
          onClick={(event) => {
            event.stopPropagation();
            if (node.disabled) return;
            updateSelected(node.id, event.shiftKey);
            if (hasChildren) toggleExpanded(node.id);
          }}
          onKeyDown={(event) =>
            handleKeyDown(node.id, parentId, node, event)
          }
          className="outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <div
            style={{ paddingInlineStart: `${8 + depth * 16}px` }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md pr-2 text-left transition-colors hover:bg-muted",
              size === "sm" ? "h-7 text-xs" : "h-8 text-sm",
              selectedSet.has(node.id) && "bg-primary/10 text-foreground",
              node.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {hasChildren ? (
              <ChevronRight
                aria-hidden="true"
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  isExpanded && "rotate-90",
                )}
              />
            ) : (
              <span aria-hidden="true" className="size-4 shrink-0" />
            )}
            <span className="flex size-4 shrink-0 items-center justify-center text-muted-foreground">
              {node.icon ??
                (hasChildren ? (
                  isExpanded ? <FolderOpen className="size-4" /> : <Folder className="size-4" />
                ) : (
                  <File className="size-4" />
                ))}
            </span>
            <span className="min-w-0 flex-1 truncate">{node.label}</span>
            {node.trailingContent && (
              <span className="shrink-0 text-xs text-muted-foreground">
                {node.trailingContent}
              </span>
            )}
          </div>
          {hasChildren && isExpanded && (
            <div
              role="group"
              className={showGuides ? "ms-2 border-s ps-1" : undefined}
            >
              {renderNodes(node.children ?? [], node.id)}
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <div
      {...props}
      role="tree"
      aria-label={ariaLabel}
      aria-multiselectable={selectionMode === "multiple" || undefined}
      className={cn("min-w-0 space-y-0.5", className)}
    >
      {items.length > 0 ? (
        renderNodes(items)
      ) : (
        <div
          role="treeitem"
          aria-selected="false"
          aria-disabled="true"
          tabIndex={-1}
          className="px-2 py-3 text-sm text-muted-foreground"
        >
          {emptyState}
        </div>
      )}
    </div>
  );
}
