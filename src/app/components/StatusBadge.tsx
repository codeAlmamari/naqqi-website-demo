interface StatusBadgeProps {
  status: 'new' | 'in-progress' | 'completed' | 'cancelled';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const styles = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const labels = {
    new: 'New',
    'in-progress': 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${styles[status]} ${sizeStyles}`}
    >
      {labels[status]}
    </span>
  );
}
