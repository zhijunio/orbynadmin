"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, rectSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { IconGripVertical } from "@tabler/icons-react"
import { cn } from "@/utils/cn"

export type SortableStrategy = "vertical" | "grid" | "horizontal"
export type SortableListProps<T> = {
  items: T[]
  onItemsChange: (items: T[]) => void
  getItemValue: (item: T) => string
  renderItem: (item: T, index: number) => React.ReactNode
  strategy?: SortableStrategy
  onValueCommit?: (next: T[], previous: T[]) => void
  disabled?: boolean
  className?: string
  itemClassName?: string
  handleLabel?: (item: T, index: number) => string
}

export function SortableList<T>({ items, onItemsChange, getItemValue, renderItem, strategy = "vertical", onValueCommit, disabled, className, itemClassName, handleLabel }: SortableListProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const id = `sortable-${React.useId()}`
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )
  const activeIndex = items.findIndex((item) => getItemValue(item) === activeId)
  const onDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    if (!event.over || event.active.id === event.over.id) return
    const oldIndex = items.findIndex((item) => getItemValue(item) === event.active.id)
    const newIndex = items.findIndex((item) => getItemValue(item) === event.over?.id)
    if (oldIndex < 0 || newIndex < 0) return
    const next = arrayMove(items, oldIndex, newIndex)
    onItemsChange(next)
    onValueCommit?.(next, items)
  }
  const renderRow = (item: T, index: number, overlay = false) => <SortableRow key={getItemValue(item)} id={getItemValue(item)} disabled={disabled || overlay} label={handleLabel?.(item, index) ?? `Reorder item ${index + 1}`} itemClassName={itemClassName} strategy={strategy}>
    {renderItem(item, index)}
  </SortableRow>

  return <DndContext id={id} sensors={sensors} collisionDetection={closestCenter} onDragStart={(event) => setActiveId(String(event.active.id))} onDragCancel={() => setActiveId(null)} onDragEnd={onDragEnd}>
    <SortableContext items={items.map(getItemValue)} strategy={strategy === "vertical" ? verticalListSortingStrategy : rectSortingStrategy}>
      <div role="list" data-slot="sortable" data-strategy={strategy} className={cn("min-w-0", strategy === "vertical" && "flex flex-col gap-2", strategy === "horizontal" && "flex min-w-max gap-2", strategy === "grid" && "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {items.map((item, index) => renderRow(item, index))}
      </div>
    </SortableContext>
    <DragOverlay dropAnimation={null}>{activeIndex >= 0 ? <div className="rounded-lg opacity-90 shadow-lg">{renderItem(items[activeIndex], activeIndex)}</div> : null}</DragOverlay>
  </DndContext>
}

function SortableRow({ id, disabled, label, itemClassName, strategy, children }: { id: string; disabled?: boolean; label: string; itemClassName?: string; strategy: SortableStrategy; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled })
  const handle = <button type="button" {...attributes} {...listeners} aria-label={label} disabled={disabled} className={cn("grid size-8 shrink-0 touch-none place-items-center rounded-md text-muted-foreground opacity-70 outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring enabled:cursor-grab active:cursor-grabbing disabled:opacity-40", strategy === "grid" && "absolute right-1 top-1 z-10 opacity-0 transition-opacity group-hover/sortable-item:opacity-100 group-focus-within/sortable-item:opacity-100")}><IconGripVertical className="size-4" /></button>
  return <div ref={setNodeRef} role="listitem" style={{ transform: CSS.Transform.toString(transform), transition }} data-slot="sortable-item" data-dragging={isDragging || undefined} className={cn("group/sortable-item relative min-w-0", strategy === "horizontal" && "w-64 shrink-0", isDragging && "z-10 opacity-40", itemClassName)}>
    {strategy === "grid" ? <>{handle}<div className="min-w-0">{children}</div></> : <div className="flex min-w-0 items-center gap-2">{handle}<div className="min-w-0 flex-1">{children}</div></div>}
  </div>
}
