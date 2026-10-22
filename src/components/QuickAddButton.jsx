import { Plus } from 'lucide-react';

const QuickAddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed right-4 bottom-20 z-30 w-13 h-13 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl shadow-xl shadow-purple-600/30 flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105"
      aria-label="Add expense"
    >
      <Plus size={24} strokeWidth={2.5} />
    </button>
  );
};

export default QuickAddButton;
