import type * as React from "react"
import { Badge } from "@/components/ui/badges/badge"
import { cn } from "@/utils/cn"

export type KanbanColumnConfig = { id: string; title: string }
export type KanbanBoardProps<T> = {
  columns: KanbanColumnConfig[]
  value: Record<string, T[]>
  getItemValue: (item: T) => string
  renderItem: (item: T) => React.ReactNode
  renderColumnHeader?: (column: KanbanColumnConfig, count: number) => React.ReactNode
  className?: string
  columnClassName?: string
}

export function KanbanBoard<T>({ columns, value, getItemValue, renderItem, renderColumnHeader, className, columnClassName }: KanbanBoardProps<T>) {
  return <div data-slot="kanban-board" className={cn("grid min-w-0 gap-3 lg:grid-cols-3", className)}>
    {columns.map((column) => {
      const items = value[column.id] ?? []
      return <section key={column.id} data-slot="kanban-column" className={cn("min-w-0 rounded-xl border border-border bg-muted/30 p-3", columnClassName)}>
        <header className="mb-3 flex min-h-9 items-center justify-between gap-2">
          {renderColumnHeader ? renderColumnHeader(column, items.length) : <><h3 className="truncate text-sm font-semibold">{column.title}</h3><Badge variant="outline">{items.length}</Badge></>}
        </header>
        <div role="list" aria-label={`${column.title} tasks`} className="grid min-h-20 content-start gap-2">
          {items.map((item) => <div key={getItemValue(item)} role="listitem" data-slot="kanban-item" className="min-w-0">{renderItem(item)}</div>)}
        </div>
      </section>
    })}
  </div>
}
