'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Trash2Icon, Plus, ArrowLeft } from 'lucide-react'
import UseBoard from '@/hooks/useBoard'
import TaskModal from '@/components/TaskModal'
import { Column } from '@/hooks/types'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import BoardSkeletonLoader from '@/components/BoardSkeleton'


const Board = () => {
  const {
    currentBoard,
    columns,
    loading,
    addTask,
    deleteTask,
    addColumn,
    deleteColumns,
    updateColumn,
  } = UseBoard()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null)
  const [tempName, setTempName] = useState<string>('')
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColName, setNewColName] = useState<string>('')

  const addTaskToColumn = (column: Column) => {
    setActiveColumn(column)
    setIsModalOpen(true)
  }

  const handleAddTask = ({
    title,
    description,
    assignee,
    due_date,
  }: {
    title: string
    description: string
    assignee: string
    due_date: string
  }) => {
    if (activeColumn && activeColumn.id && title?.trim()) {
      addTask(activeColumn.id, title.trim(), description ?? '', assignee ?? '', due_date ?? '')
    }
  }

  const handleSaveNewColumn = async () => {
    if (columns.length >= 4) {
      setIsAddingColumn(false)
      return
    }
    if (newColName.trim()) {
      await addColumn(newColName)
      setNewColName('')
      setIsAddingColumn(false)
    } else {
      setIsAddingColumn(false)
    }
  }

  const getDueDateColor = (due_date: string) => {
    if (!due_date) return ''
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(due_date) < today
      ? 'text-red-400 font-semibold'
      : 'text-[#c8f0a0]/70 font-semibold'
  }

  const isTaskExpired = (due_date: string) => {
    if (!due_date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(due_date) < today
  }

  const dotColors = ['bg-[#95d5b2]', 'bg-[#74c8a4]', 'bg-[#7ec8e3]', 'bg-[#d4aaff]', 'bg-[#ffd6a5]']

  return (
    <div className="relative min-h-screen bg-[#080d0b] overflow-hidden font-[Inter,sans-serif]">

      {/* ── Grain noise overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-1 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Mesh blobs ── */}
      <div
        className="pointer-events-none fixed -top-20 -right-16 w-105 h-105 z-0"
        style={{ background: 'radial-gradient(circle, #1a3d2b 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none fixed -bottom-24 -left-20 w-95 h-95 z-0"
        style={{ background: 'radial-gradient(circle, #0f2d1c 0%, transparent 70%)' }}
      />

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b border-white/6 bg-[#080d0b]/70 backdrop-blur-xl">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <Link
            href="/boards"
            className="flex items-center gap-1.5 text-white/40 hover:text-[#c8f0a0] transition-colors text-xs border border-white/10 px-2 md:px-2.5 py-1.5 rounded-md bg-white/4 hover:bg-white/8 shrink-0"
          >
            <ArrowLeft size={12} />
            <span className="hidden xs:inline">Boards</span>
          </Link>
          <span className="text-white/15 shrink-0">·</span>
          {loading ? (
            <Skeleton className="h-4 w-24 md:w-32 rounded bg-white/10" />
          ) : (
            <h1
              className="text-sm md:text-base font-bold text-[#e8f5e0] tracking-tight truncate max-w-35 sm:max-w-55 md:max-w-none"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {currentBoard?.name || 'Untitled Board'}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40 shrink-0">
          <span>{columns.length} {columns.length === 1 ? 'col' : 'cols'}</span>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="relative z-2 px-4 md:px-8 py-4 md:py-8">

        {/* ── Page heading ── */}
        <div className="mb-4 md:mb-8">
          {loading ? (
            <>
              <Skeleton className="h-3 w-40 rounded bg-white/5 mb-2" />
              <Skeleton className="h-8 w-56 rounded-lg bg-white/10" />
            </>
          ) : (
            <>
              <div className="text-[10px] tracking-[0.12em] uppercase text-[#c8f0a0]/40 mb-1.5">
                {currentBoard?.name || 'Board'} · columns
              </div>
              <h2
                className="text-xl md:text-3xl font-bold text-[#e8f5e0] leading-tight tracking-tight"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {currentBoard?.name || 'Untitled'}{' '}
                <span className="text-[#c8f0a0]" style={{ fontStyle: 'italic' }}>
                  Board
                </span>
              </h2>
            </>
          )}
        </div>

        {/* ── Columns ── */}
        {loading ? (
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <BoardSkeletonLoader key={i} />
            ))}
          </div>
        ) : (
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-8 items-start snap-x snap-mandatory">

            {/* Empty hint when no columns */}
            {columns.length === 0 && !isAddingColumn && (
              <div className="flex flex-col items-center justify-center w-[calc(100vw-2rem)] sm:w-70 h-55 gap-2 text-center shrink-0 select-none">
                <p className="text-white/20 text-xs">No columns yet</p>
                <p className="text-white/12 text-[10px]">Use the card → to add one</p>
              </div>
            )}

            {/* ── Column cards ── */}
            {columns.map((column, ci) => {
              const dot = dotColors[ci % dotColors.length]
              const activeTasks = column.task?.filter((t) => !isTaskExpired(t.due_date)) ?? []

              return (
                <div
                  key={column.id}
                  className="relative shrink-0 w-[calc(100vw-2rem)] sm:w-72 md:w-75 flex flex-col min-h-55 max-h-[75vh] md:max-h-[78vh] rounded-2xl border border-white/8 backdrop-blur-md snap-center"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    boxShadow:
                      '0 1px 0 inset rgba(255,255,255,0.04), 0 8px 24px -8px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Tactile top highlight */}
                  <div
                    className="absolute top-0 left-[10%] right-[10%] h-px rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                    }}
                  />

                  {/* Column Header */}
                  <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/6">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
                      {editingColumnId === column.id ? (
                        <input
                          autoFocus
                          className="bg-white/10 border border-[#c8f0a0]/40 text-white text-xs rounded-md px-2 py-1 outline-none w-full font-semibold uppercase tracking-widest focus:border-[#c8f0a0]"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onBlur={() => {
                            if (tempName.trim() && tempName !== column.column_name) {
                              updateColumn(column.id, tempName)
                            }
                            setEditingColumnId(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
                            if (e.key === 'Escape') setEditingColumnId(null)
                          }}
                        />
                      ) : (
                        <h3
                          className="font-semibold text-white/80 uppercase text-[10px] tracking-widest cursor-pointer hover:text-[#c8f0a0] transition-colors truncate"
                          onClick={() => {
                            setEditingColumnId(column.id)
                            setTempName(column.column_name)
                          }}
                        >
                          {column.column_name}
                        </h3>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="bg-white/10 text-white/50 text-[9px] px-2 py-0.5 rounded-full font-bold">
                        {activeTasks.length}
                      </span>
                      <button
                        onClick={() => deleteColumns(column.id)}
                        className="p-1 rounded hover:bg-red-500/15 transition-colors"
                      >
                        <Trash2Icon className="text-white/30 hover:text-red-400" size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div
                    className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {activeTasks.length === 0 ? (
                      <div className="flex items-center justify-center h-16 text-white/20 text-xs">
                        No tasks yet
                      </div>
                    ) : (
                      activeTasks.map((task) => (
                        <Card
                          key={task.id}
                          className="group/task bg-white/5 border border-white/8 rounded-xl hover:border-[#c8f0a0]/20 hover:bg-white/8 transition-all"
                        >
                          <CardContent className="p-3 pb-3">
                            <div className="flex justify-between items-start gap-2 mb-1">
                              <h4 className="font-semibold text-[#e8f5e0] text-sm leading-tight flex-1">
                                {task.title}
                              </h4>
                              {/* Delete always visible on mobile, hover on desktop */}
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="opacity-100 md:opacity-0 md:group-hover/task:opacity-100 transition-opacity p-0.5 rounded hover:bg-red-500/15 shrink-0"
                              >
                                <Trash2Icon size={12} className="text-white/40 hover:text-red-400" />
                              </button>
                            </div>
                            {task.description && (
                              <p className="text-[11px] text-white/40 line-clamp-2 mb-2">
                                {task.description}
                              </p>
                            )}
                            {task.due_date && (
                              <div className="flex items-center gap-1 pt-2 border-t border-white/6">
                                <span className={`text-[10px] tracking-wide ${getDueDateColor(task.due_date)}`}>
                                  {isTaskExpired(task.due_date) ? '⚠️ Overdue: ' : '📅 '}
                                  {task.due_date}
                                </span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>

                  {/* Add Task Button */}
                  <div className="px-3 pb-3 pt-1">
                    <button
                      onClick={() => addTaskToColumn(column)}
                      className="w-full py-2 border border-dashed border-white/15 rounded-xl text-white/30 hover:text-[#c8f0a0]/70 hover:border-[#c8f0a0]/30 hover:bg-[#c8f0a0]/4 transition-all text-xs flex items-center justify-center gap-1.5"
                    >
                      <Plus size={12} /> Add Task
                    </button>
                  </div>
                </div>
              )
            })}

            {/* ── Add Column dotted card — always visible ── */}
            {columns.length < 4 && (
              <div className="shrink-0 w-[calc(100vw-2rem)] sm:w-72 md:w-75 snap-center self-stretch">
                <div
                  className={`h-full min-h-55 rounded-2xl border cursor-pointer transition-all flex flex-col items-center justify-center gap-2 px-4 py-6
                    ${
                      isAddingColumn
                        ? 'border-[#c8f0a0]/25 bg-[#c8f0a0]/4'
                        : 'border-white/6 bg-black/25 hover:bg-[#c8f0a0]/4 hover:border-[#c8f0a0]/15'
                    }`}
                  style={{
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                  }}
                  onClick={() => !isAddingColumn && setIsAddingColumn(true)}
                >
                  {isAddingColumn ? (
                    <div
                      className="flex flex-col gap-3 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-[#c8f0a0] text-xs font-semibold text-center tracking-wide uppercase">
                        Name your column
                      </p>
                      <input
                        autoFocus
                        placeholder="e.g. In Progress..."
                        value={newColName}
                        onChange={(e) => setNewColName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveNewColumn()
                          if (e.key === 'Escape') {
                            setIsAddingColumn(false)
                            setNewColName('')
                          }
                        }}
                        className="w-full px-3 py-2 bg-white/6 border border-[#c8f0a0]/30 rounded-lg text-white text-sm outline-none focus:border-[#c8f0a0] placeholder:text-white/30"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveNewColumn}
                          className="flex-1 bg-[#c8f0a0] text-[#080d0b] py-1.5 rounded-lg font-bold text-xs hover:bg-[#b8e580] transition-colors"
                        >
                          Add Column
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingColumn(false)
                            setNewColName('')
                          }}
                          className="flex-1 text-white/50 py-1.5 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 select-none">
                      <div className="w-9 h-9 rounded-xl border border-dashed border-white/15 flex items-center justify-center hover:border-[#c8f0a0]/40 transition-colors">
                        <Plus className="w-4 h-4 text-white/25 hover:text-[#c8f0a0]/60 transition-colors" />
                      </div>
                      <p className="text-xs text-white/25 hover:text-white/50 transition-colors">
                        Add column
                      </p>
                      <p className="text-[10px] text-white/12">Click to create</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
        columnName={activeColumn?.column_name || ''}
      />
    </div>
  )
}

export default Board