import {
  Layers3,
  MessagesSquare,
  ChartNoAxesCombined,
  Workflow,
  ScanLine,
  ShieldCheck,
} from 'lucide-react'

export const features = [
  {
    icon: Layers3,
    name: 'A place for every project.',
    text: 'Bring tasks, timelines, and the little details together. Give every good idea a clear next step.',
    label: 'PROJECTS, WITH PERSPECTIVE',
  },
  {
    icon: MessagesSquare,
    name: 'Keep the context close.',
    text: 'Conversations live alongside the work. Less searching through threads. More moving things forward.',
    label: 'CONVERSATIONS THAT CONNECT',
  },
  {
    icon: ChartNoAxesCombined,
    name: 'See the bigger picture.',
    text: 'Know what’s moving, what needs a hand, and what’s ready to celebrate. All at a glance.',
    label: 'CLARITY, BUILT IN',
  },
]
export const smallFeatures = [
  {
    icon: Workflow,
    title: 'Your flow, your way',
    text: 'Switch between a board and a list to make your work feel like you.',
  },
  {
    icon: ScanLine,
    title: 'Less looking. More finding.',
    text: 'Find the right task with a quick search, right where you’re working.',
  },
  {
    icon: ShieldCheck,
    title: 'Room to focus',
    text: 'A considered, uncluttered space that lets the important things stand out.',
  },
]
export const plans = [
  {
    name: 'Free',
    note: 'For your next big idea.',
    monthly: 0,
    yearly: 0,
    cta: 'Start creating',
    features: [
      'Up to 3 projects',
      'Board and list views',
      'Personal task management',
      'A little room to experiment',
    ],
  },
  {
    name: 'Team',
    note: 'For doing great work, together.',
    monthly: 16,
    yearly: 12,
    cta: 'Try Team for free',
    features: [
      'Unlimited projects',
      'Shared team workspace',
      'Project insights and activity',
      'Custom workflows',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Studio',
    note: 'For teams with bigger plans.',
    monthly: 28,
    yearly: 22,
    cta: 'Explore Studio',
    features: [
      'Everything in Team',
      'Multiple workspaces',
      'Advanced permissions',
      'Workspace insights',
      'Dedicated onboarding',
    ],
  },
]
export const faqs = [
  {
    q: 'What is Forma?',
    a: 'Forma is an original fictional SaaS brand, created as a web development portfolio demo. It imagines a calmer project workspace for creative teams. The product preview is interactive, but there is no live SaaS service behind it.',
  },
  {
    q: 'Can I try it without creating an account?',
    a: 'Absolutely. Explore the product preview above: switch projects, search tasks, change views, add a task, or mark one complete. It all runs in your browser. Changes reset when you refresh.',
  },
  {
    q: 'How does the pricing work?',
    a: 'These are illustrative plans for this fictional product. Team and Studio prices are per person, per month. Yearly pricing assumes a single annual payment. No subscription or payment is created through this demo.',
  },
  {
    q: 'Can I bring my existing tools?',
    a: 'This concept is designed around a focused workspace. External integrations and imports are not connected in this demo. All projects, tasks, and activity shown are sample data.',
  },
  {
    q: 'What happens when I submit a form?',
    a: 'You’ll see a simulated confirmation. Your information is not sent to a server, stored, or emailed. Please use sample information to explore the forms.',
  },
]
