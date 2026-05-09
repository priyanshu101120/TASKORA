import React, { useState } from "react";

const TaskModal = ({ isOpen, onClose, onAdd, columnName }: { isOpen: boolean; onClose: () => void; onAdd: (task: { title: string; description: string; assignee: string; due_date: string }) => void; columnName: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [due_date, setDueDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, description: description, assignee, due_date: due_date });
      setTitle("");
      setDescription("");
      setAssignee("");
      setDueDate("");
      onClose();
    }
  };

  return (
    /* Modal Overlay - p-4 add kiya hai mobile margins ke liye */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      
      {/* Modal Container - max-h-full aur overflow-y-auto add kiya hai chhoti screens ke liye */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-5 md:p-6 rounded-2xl w-full max-w-md shadow-2xl my-auto max-h-[95vh] overflow-y-auto custom-scrollbar">
        
        <h2 className="text-lg md:text-xl font-bold text-white mb-1">Add New Task</h2>
        <p className="text-slate-400 text-xs md:text-sm mb-6">
          Adding to: <span className="text-[#cef19f]">{columnName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] md:text-xs text-slate-400 uppercase mb-1 ml-1">
              Task Title
            </label>
            <input
              autoFocus
              className="w-full px-4 py-2.5 md:py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#cef19f] text-sm md:text-base placeholder:text-slate-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] md:text-xs text-slate-400 uppercase mb-1 ml-1">
              Description (Optional)
            </label>
            <textarea
              className="w-full px-4 py-2.5 md:py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#cef19f] min-h-20 md:min-h-25 text-sm md:text-base placeholder:text-slate-500 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
            />
          </div>

          <div>
            <label className="block text-[10px] md:text-xs text-slate-400 uppercase mb-1 ml-1">
              Due Date
            </label>
            <input
              required
              type="date"
              /* appearance-none aur color-scheme add kiya hai taaki mobile date picker dark theme mein dikhe */
              className="w-full px-4 py-2.5 md:py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#cef19f] text-sm md:text-base scheme-dark"
              value={due_date}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Buttons Section - Mobile par tap target bada karne ke liye py-3 rakha hai */}
          <div className="flex gap-3 pt-4 md:pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 md:py-2 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 md:py-2 bg-[#cef19f] text-[#023020] rounded-xl font-bold hover:bg-[#bce68a] transition-colors text-sm uppercase tracking-wider"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;