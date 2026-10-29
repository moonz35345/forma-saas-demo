import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  Clock3,
  Folder,
  Grid2X2,
  LayoutGrid,
  List,
  MessageSquare,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { Dialog } from './Dialog'

type Task = {
  id: number
  title: string
  category: string
  status: 'To do' | 'In progress' | 'Done'
  initials: string
  color: string
  date: string
  comments: number
  project: string
}
const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Explore the visual direction',
    category: 'Design',
    status: 'To do',
    initials: 'JL',
    color: 'lavender',
    date: 'Oct 30',
    comments: 3,
    project: 'Website refresh',
  },
  {
    id: 2,
    title: 'Map out the customer journey',
    category: 'Strategy',
    status: 'To do',
    initials: 'AM',
    color: 'peach',
    date: 'Oct 31',
    comments: 2,
    project: 'Website refresh',
  },
  {
    id: 3,
    title: 'A homepage with a little more heart',
    category: 'Design',
    status: 'In progress',
    initials: 'SK',
    color: 'green',
    date: 'Nov 2',
    comments: 5,
    project: 'Website refresh',
  },
  {
    id: 4,
    title: 'Find the words that feel like us',
    category: 'Content',
    status: 'In progress',
    initials: 'JL',
    color: 'lavender',
    date: 'Nov 3',
    comments: 2,
    project: 'Website refresh',
  },
  {
    id: 5,
    title: 'Make space for the big ideas',
    category: 'Strategy',
    status: 'Done',
    initials: 'AM',
    color: 'peach',
    date: 'Oct 28',
    comments: 4,
    project: 'Website refresh',
  },
  {
    id: 6,
    title: 'Gather a little inspiration',
    category: 'Design',
    status: 'Done',
    initials: 'SK',
    color: 'green',
    date: 'Oct 29',
    comments: 1,
    project: 'Website refresh',
  },
  {
    id: 7,
    title: 'Define the brand personality',
    category: 'Strategy',
    status: 'To do',
    initials: 'AM',
    color: 'peach',
    date: 'Nov 4',
    comments: 2,
    project: 'Brand launch',
  },
  {
    id: 8,
    title: 'Create the identity system',
    category: 'Design',
    status: 'In progress',
    initials: 'JL',
    color: 'lavender',
    date: 'Nov 6',
    comments: 3,
    project: 'Brand launch',
  },
  {
    id: 9,
    title: 'Write the creative brief',
    category: 'Content',
    status: 'Done',
    initials: 'SK',
    color: 'green',
    date: 'Oct 29',
    comments: 1,
    project: 'Brand launch',
  },
]
const statuses = ['To do', 'In progress', 'Done'] as const

export function ProductPreview() {
  const [tasks, setTasks] = useState(initialTasks)
  const [project, setProject] = useState('Website refresh')
  const [view, setView] = useState<'Board' | 'List' | 'Activity'>('Board')
  const [query, setQuery] = useState('')
  const [mine, setMine] = useState(false)
  const [filter, setFilter] = useState('All types')
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState<Task | null>(null)
  const [notice, setNotice] = useState('')
  const [activity, setActivity] = useState([
    'Alex created the Website refresh project.',
    'Sam completed “Gather a little inspiration”.',
    'Jamie started exploring the visual direction.',
  ])
  const filtered = tasks.filter(
    (task) =>
      task.project === project &&
      task.title.toLowerCase().includes(query.toLowerCase()) &&
      (!mine || task.initials === 'JL') &&
      (filter === 'All types' || task.category === filter),
  )
  function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const title = String(data.get('title')).trim()
    if (!title) return
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        category: String(data.get('category')),
        status: 'To do',
        initials: 'JL',
        color: 'lavender',
        date: 'Just added',
        comments: 0,
        project,
      },
    ])
    setActivity([`You added “${title}”.`, ...activity])
    setAdding(false)
    setQuery('')
    setFilter('All types')
    setView('Board')
    setNotice('Task added to this demo. Changes reset on refresh.')
  }
  function completeTask(task: Task) {
    const status = task.status === 'Done' ? 'To do' : 'Done'
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status } : t)))
    setActivity([
      `You ${status === 'Done' ? 'completed' : 'reopened'} “${task.title}”.`,
      ...activity,
    ])
    setSelected(null)
    setNotice(`Task ${status === 'Done' ? 'completed' : 'reopened'}.`)
  }
  return (
    <div className="product-shell" id="product-demo">
      <div className="window-bar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>
          <span className="tiny-lock">◇</span> Your little corner of clarity
        </span>
        <span className="preview-badge">INTERACTIVE DEMO</span>
      </div>
      <div className="workspace">
        <aside className="workspace-sidebar" aria-label="Demo workspace navigation">
          <div className="workspace-name">
            <span className="workspace-symbol">
              s<span>✳</span>
            </span>
            <div>
              Studio workspace<small>Let’s make good things.</small>
            </div>
          </div>
          <div className="workspace-links">
            <button
              className={!mine && view !== 'Activity' ? 'active' : ''}
              onClick={() => {
                setView('Board')
                setMine(false)
              }}
            >
              <Grid2X2 size={15} /> Overview
            </button>
            <button
              className={mine ? 'active' : ''}
              onClick={() => {
                setMine(true)
                setView('List')
              }}
            >
              <CircleCheck size={15} /> My tasks{' '}
              <span>{tasks.filter((t) => t.initials === 'JL' && t.status !== 'Done').length}</span>
            </button>
            <button
              className={view === 'Activity' ? 'active' : ''}
              onClick={() => setView('Activity')}
            >
              <Bell size={15} /> Activity <span className="notification-dot" />
            </button>
          </div>
          <div className="sidebar-label">
            YOUR PROJECTS{' '}
            <button aria-label="Add a demo task" onClick={() => setAdding(true)}>
              <Plus size={14} />
            </button>
          </div>
          {['Website refresh', 'Brand launch'].map((name, i) => (
            <button
              key={name}
              className={`project-link ${project === name ? 'selected' : ''}`}
              onClick={() => {
                setProject(name)
                setMine(false)
                setView('Board')
                setQuery('')
              }}
            >
              <span className={`project-square square-${i}`} />
              {name}
              {project === name && <ChevronRight size={13} />}
            </button>
          ))}
          <div className="sidebar-note">
            <Sparkles size={18} />
            <strong>A little less chaos.</strong>
            <span>A little more possibility.</span>
            <a href="#pricing">
              Find your plan <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="workspace-profile">
            <span className="avatar lavender">JL</span>
            <div>
              Jamie Lee<small>Demo workspace</small>
            </div>
            <span className="online-dot" />
          </div>
        </aside>
        <div className="workspace-main">
          <div className="workspace-breadcrumb">
            <span>
              <Folder size={13} /> Projects <ChevronRight size={12} /> {project}
            </span>
            <span className="sample-tag">SAMPLE DATA</span>
          </div>
          <div className="project-heading">
            <div>
              <span className="project-eyebrow">A FRESH START, TOGETHER</span>
              <h3>
                {mine ? 'My tasks' : view === 'Activity' ? 'Team activity' : project}
                <span className="project-title-dot">.</span>
              </h3>
              <p>
                {mine
                  ? 'Your next steps, all in one place.'
                  : 'A thoughtful new home for our next chapter.'}
              </p>
            </div>
            <div className="collaborators" aria-label="Sample team members: Jamie, Alex, Sam">
              <span className="avatar lavender">JL</span>
              <span className="avatar peach">AM</span>
              <span className="avatar green">SK</span>
              <span className="team-count">3</span>
            </div>
          </div>
          <div className="board-toolbar">
            <div className="view-tabs" role="group" aria-label="Project view">
              {(['Board', 'List'] as const).map((v) => (
                <button
                  key={v}
                  className={view === v ? 'active' : ''}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                >
                  {v === 'Board' ? <LayoutGrid size={13} /> : <List size={14} />}
                  {v}
                </button>
              ))}
            </div>
            <div className="board-controls">
              <label className="task-search">
                <Search size={14} />
                <input
                  aria-label="Search demo tasks"
                  placeholder="Search tasks…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <label className="filter-select">
                <SlidersHorizontal size={13} />
                <select
                  aria-label="Filter task type"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {['All types', 'Design', 'Strategy', 'Content'].map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
                <ChevronDown size={10} />
              </label>
              <button className="add-task" onClick={() => setAdding(true)}>
                <Plus size={14} />
                <span>Add task</span>
              </button>
            </div>
          </div>
          <div className="board-content">
            {view === 'Activity' ? (
              <div className="activity-list">
                <h4>A little momentum.</h4>
                {activity.map((item, i) => (
                  <div key={`${item}-${i}`}>
                    <span className="activity-icon">
                      <Clock3 size={15} />
                    </span>
                    <p>
                      {item}
                      <small>{i === 0 ? 'Latest activity' : 'Sample workspace activity'}</small>
                    </p>
                  </div>
                ))}
              </div>
            ) : view === 'Board' ? (
              <div className="kanban">
                {statuses.map((status) => (
                  <section className="kanban-column" key={status}>
                    <h4>
                      <span className={`status-dot ${status.toLowerCase().replace(' ', '-')}`} />
                      {status}
                      <span className="task-count">
                        {filtered.filter((t) => t.status === status).length}
                      </span>
                    </h4>
                    <div className="task-stack">
                      {filtered
                        .filter((t) => t.status === status)
                        .map((task) => (
                          <button
                            className={`task-card ${task.status === 'Done' ? 'task-done' : ''}`}
                            key={task.id}
                            onClick={() => setSelected(task)}
                          >
                            <span className={`category category-${task.category.toLowerCase()}`}>
                              {task.category}
                            </span>
                            <strong>{task.title}</strong>
                            {task.id === 3 && (
                              <div className="task-art" aria-hidden="true">
                                <span />
                                <i />
                                <b>
                                  Make room
                                  <br />
                                  for better.
                                </b>
                                <em>↗</em>
                              </div>
                            )}
                            <div className="task-footer">
                              <span className={`avatar avatar-small ${task.color}`}>
                                {task.initials}
                              </span>
                              <span>
                                <Clock3 size={10} />
                                {task.date}
                              </span>
                              <span>
                                <MessageSquare size={10} />
                                {task.comments}
                              </span>
                            </div>
                          </button>
                        ))}
                      {!filtered.some((t) => t.status === status) && (
                        <p className="empty-column">A little space for what’s next.</p>
                      )}
                    </div>
                    <button className="column-add" onClick={() => setAdding(true)}>
                      <Plus size={13} /> Add a task
                    </button>
                  </section>
                ))}
              </div>
            ) : (
              <div className="task-list">
                {filtered.length ? (
                  filtered.map((task) => (
                    <button key={task.id} onClick={() => setSelected(task)}>
                      <span>
                        {task.status === 'Done' ? <CircleCheck size={17} /> : <Circle size={17} />}
                      </span>
                      <strong>{task.title}</strong>
                      <span className="list-status">{task.status}</span>
                      <span className={`avatar avatar-small ${task.color}`}>{task.initials}</span>
                    </button>
                  ))
                ) : (
                  <p>No tasks found. Try another search or add your own.</p>
                )}
              </div>
            )}
          </div>
          <div className="demo-status" role="status">
            {notice || 'Make yourself at home. Click a task, change the view, or add your own.'}
          </div>
        </div>
      </div>
      {adding && (
        <Dialog title="A little step forward." onClose={() => setAdding(false)}>
          <p className="modal-description">
            Add a task to your sample project. It stays in this browser session only.
          </p>
          <form onSubmit={addTask} className="form-stack">
            <label>
              Task name
              <input
                name="title"
                required
                maxLength={100}
                placeholder="What’s the next good thing?"
                autoFocus
              />
            </label>
            <label>
              Type
              <select name="category">
                <option>Design</option>
                <option>Strategy</option>
                <option>Content</option>
              </select>
            </label>
            <button className="button button-primary" type="submit">
              Create demo task <Plus size={16} />
            </button>
          </form>
        </Dialog>
      )}
      {selected && (
        <Dialog title={selected.title} onClose={() => setSelected(null)}>
          <div className="task-detail-meta">
            <span className={`category category-${selected.category.toLowerCase()}`}>
              {selected.category}
            </span>
            <span>{selected.status}</span>
          </div>
          <p className="modal-description">
            A little piece of the {selected.project.toLowerCase()} project. This is sample content
            in an interactive portfolio demo.
          </p>
          <div className="task-detail-owner">
            <span className={`avatar ${selected.color}`}>{selected.initials}</span>
            <span>Sample assignee · {selected.date}</span>
          </div>
          <button className="button button-primary" onClick={() => completeTask(selected)}>
            {selected.status === 'Done' ? 'Reopen task' : 'Mark as complete'}
            <Check size={16} />
          </button>
        </Dialog>
      )}
    </div>
  )
}
