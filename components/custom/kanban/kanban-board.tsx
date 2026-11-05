"use client"

import * as React from "react"
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCorners, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { IconGripVertical } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge/badge"
import { cn } from "@/utils/cn"
import { moveKanbanItem } from "@/components/custom/kanban/kanban-move"

export type KanbanColumnConfig = { id: string; title: string }
export type KanbanBoardProps<T> = {
  columns: KanbanColumnConfig[]
  value: Record<string, T[]>
  getItemValue: (item: T) => string
  renderItem: (item: T) => React.ReactNode
  renderColumnHeader?: (column: KanbanColumnConfig, count: number) => React.ReactNode
  onValueChange?: (value: Record<string, T[]>) => void
  itemLabel?: (item: T) => string
  className?: string
  columnClassName?: string
}

export function KanbanBoard<T>({ columns, value, getItemValue, renderItem, renderColumnHeader, onValueChange, itemLabel, className, columnClassName }: KanbanBoardProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const contextId = `kanban-${React.useId()}`
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )
  const activeItem = activeId ? columns.flatMap((column) => value[column.id] ?? []).find((item) => getItemValue(item) === activeId) : undefined
  const onDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    if (!onValueChange || !event.over) return
    const next = moveKanbanItem(value, String(event.active.id), String(event.over.id), getItemValue)
    if (next) onValueChange(next)
  }
  const board = <div data-slot="kanban-board" className={cn("grid min-w-0 gap-3 lg:grid-cols-3", className)}>
    {columns.map((column) => {
      const items = value[column.id] ?? []
      return <section key={column.id} data-slot="kanban-column" className={cn("min-w-0 rounded-xl border border-border bg-muted/30 p-3", columnClassName)}>
        <header className="mb-3 flex min-h-9 items-center justify-between gap-2">
          {renderColumnHeader ? renderColumnHeader(column, items.length) : <><h3 className="truncate text-sm font-semibold">{column.title}</h3><Badge variant="outline">{items.length}</Badge></>}
        </header>
        <ColumnList id={column.id} label={`${column.title} tasks`} itemIds={items.map(getItemValue)} draggable={Boolean(onValueChange)}>
          {items.map((item) => {
            const id = getItemValue(item)
            const card = renderItem(item)
            return onValueChange
              ? <SortableKanbanItem key={id} id={id} label={itemLabel?.(item) ?? `Move ${column.title} item`}>{card}</SortableKanbanItem>
              : <div key={id} role="listitem" data-slot="kanban-item" className="min-w-0">{card}</div>
          })}
        </ColumnList>
      </section>
    })}
  </div>
  if (!onValueChange) return board
  return <DndContext id={contextId} sensors={sensors} collisionDetection={closestCorners} onDragStart={(event) => setActiveId(String(event.active.id))} onDragCancel={() => setActiveId(null)} onDragEnd={onDragEnd}>
    {board}
    <DragOverlay dropAnimation={null}>{activeItem ? <div className="rounded-xl opacity-90 shadow-lg">{renderItem(activeItem)}</div> : null}</DragOverlay>
  </DndContext>
}

function ColumnList({ id, label, itemIds, draggable, children }: { id: string; label: string; itemIds: string[]; draggable: boolean; children: React.ReactNode }) {
  if (!draggable) return <div role="list" aria-label={label} className="grid min-h-20 content-start gap-2">{children}</div>
  return <DroppableColumn id={id} label={label} itemIds={itemIds}>{children}</DroppableColumn>
}

function DroppableColumn({ id, label, itemIds, children }: { id: string; label: string; itemIds: string[]; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: `column:${id}` })
  return <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
    <div ref={setNodeRef} role="list" aria-label={label} className="grid min-h-20 content-start gap-2">{children}</div>
  </SortableContext>
}

function SortableKanbanItem({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return <div ref={setNodeRef} role="listitem" data-slot="kanban-item" style={{ transform: CSS.Transform.toString(transform), transition }} className={cn("flex min-w-0 items-start gap-1", isDragging && "opacity-40")}>
    <button type="button" aria-label={label} className="mt-2 grid size-7 shrink-0 touch-none place-items-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring cursor-grab active:cursor-grabbing" {...attributes} {...listeners}><IconGripVertical className="size-4" /></button>
    <div className="min-w-0 flex-1">{children}</div>
  </div>
}
