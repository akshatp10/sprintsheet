interface StageStyle {
  container: string;
  chip: string;
  dot: string;
  gradient: string;
  borderGradient: string;
}

export enum StageName {
  BACKLOG = 'Backlog',
  TODO = 'Todo',
  IN_PROGRESS = 'In progress',
  IN_QA = 'In QA',
  DONE = 'Done',
  BLOCKED = 'Blocked',
}

const gradient = {
  backlog: 'bg-gradient-to-b from-stage-backlog-bg from-0% to-surface/50 to-9%',

  todo: 'bg-gradient-to-b from-stage-todo-bg from-0% to-surface/50 to-9%',

  progress: 'bg-gradient-to-b from-stage-progress-bg from-0% to-surface/50 to-9%',

  qa: 'bg-gradient-to-b from-stage-qa-bg from-0% to-surface/50 to-9%',

  done: 'bg-gradient-to-b from-stage-done-bg from-0% to-surface/50 to-9%',

  blocked: 'bg-gradient-to-b from-stage-blocked-bg from-0% to-surface/50 to-9%',
};

const borderGradient = {
  backlog: 'bg-gradient-to-b from-stage-backlog-border from-0% to-lines-hairline/40 to-50%',

  todo: 'bg-gradient-to-b from-stage-todo-border from-0% to-lines-hairline/40 to-50%',

  progress: 'bg-gradient-to-b from-stage-progress-border from-0% to-lines-hairline/40 to-50%',

  qa: 'bg-gradient-to-b from-stage-qa-border from-0% to-lines-hairline/40 to-50%',

  done: 'bg-gradient-to-b from-stage-done-border from-0% to-lines-hairline/40 to-50%',

  blocked: 'bg-gradient-to-b from-stage-blocked-border from-0% to-lines-hairline/40 to-50%',
};

export const stageConfig: Record<StageName, StageStyle> = {
  [StageName.BACKLOG]: {
    container: 'bg-stage-backlog-bg border-stage-backlog-border text-stage-backlog-text',
    chip: 'bg-stage-backlog-chip border-stage-backlog-dot text-stage-backlog-text',
    dot: 'bg-stage-backlog-dot',
    gradient: gradient.backlog,
    borderGradient: borderGradient.backlog,
  },

  [StageName.TODO]: {
    container: 'bg-stage-todo-bg border-stage-todo-border text-stage-todo-text',
    chip: 'bg-stage-todo-chip border-stage-todo-dot text-stage-todo-text',
    dot: 'bg-stage-todo-dot',
    gradient: gradient.todo,
    borderGradient: borderGradient.todo,
  },

  [StageName.IN_PROGRESS]: {
    container: 'bg-stage-progress-bg border-stage-progress-border text-stage-progress-text',
    chip: 'bg-stage-progress-chip border-stage-progress-dot text-stage-progress-text',
    dot: 'bg-stage-progress-dot',
    gradient: gradient.progress,
    borderGradient: borderGradient.progress,
  },

  [StageName.IN_QA]: {
    container: 'bg-stage-qa-bg border-stage-qa-border text-stage-qa-text',
    chip: 'bg-stage-qa-chip border-stage-qa-dot text-stage-qa-text',
    dot: 'bg-stage-qa-dot',
    gradient: gradient.qa,
    borderGradient: borderGradient.qa,
  },

  [StageName.DONE]: {
    container: 'bg-stage-done-bg border-stage-done-border text-stage-done-text',
    chip: 'bg-stage-done-chip border-stage-done-dot text-stage-done-text',
    dot: 'bg-stage-done-dot',
    gradient: gradient.done,
    borderGradient: borderGradient.done,
  },

  [StageName.BLOCKED]: {
    container: 'bg-stage-blocked-bg border-stage-blocked-border text-stage-blocked-text',
    chip: 'bg-stage-blocked-bg border-stage-blocked-dot text-stage-blocked-text',
    dot: 'bg-stage-blocked-dot',
    gradient: gradient.blocked,
    borderGradient: borderGradient.blocked,
  },
};
