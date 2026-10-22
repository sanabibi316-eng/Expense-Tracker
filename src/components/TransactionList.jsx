import TransactionItem from './TransactionItem';
import EmptyState from './EmptyState';
import { Receipt } from 'lucide-react';

const TransactionList = ({
  expenses,
  emptyAction,
  emptyTitle,
  emptyDescription,
  secondaryAction,
  secondaryActionLabel,
}) => {
  if (expenses.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title={emptyTitle || 'No transactions found'}
        description={emptyDescription || 'Your recorded expenses will appear here'}
        action={emptyAction}
        actionLabel="Add Expense"
        secondaryAction={secondaryAction}
        secondaryActionLabel={secondaryActionLabel}
      />
    );
  }

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
      {expenses.map((expense, i) => (
        <TransactionItem key={expense.id} expense={expense} index={i} />
      ))}
    </div>
  );
};

export default TransactionList;
