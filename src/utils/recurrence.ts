import { RecurrenceRule } from '../types';

/**
 * Calculates the next due date based on the current due date and recurrence rule.
 *
 * @param dueDate - ISO date string (YYYY-MM-DD)
 * @param rule - The recurrence rule to apply
 * @returns The next due date as an ISO date string (YYYY-MM-DD)
 */
export function getNextDueDate(dueDate: string, rule: RecurrenceRule): string {
  const date = new Date(dueDate + 'T00:00:00');

  switch (rule.type) {
    case 'none':
      return dueDate;

    case 'daily':
      date.setDate(date.getDate() + 1);
      break;

    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;

    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;

    case 'custom': {
      const days = rule.intervalDays ?? 1;
      date.setDate(date.getDate() + days);
      break;
    }
  }

  return date.toISOString().split('T')[0];
}
