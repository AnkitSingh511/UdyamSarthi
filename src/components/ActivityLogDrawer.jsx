import React from 'react';
import { useApp } from '../context/AppContext';
import { X, History, Activity, Clock, FileSpreadsheet, ShieldAlert } from 'lucide-react';

export const ActivityLogDrawer = ({ isOpen, onClose }) => {
  const { activityLogs, t } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">{t.activityLog}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Activity List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <span>Total Session Events</span>
              <span className="font-bold text-emerald-400">{activityLogs.length} Logged</span>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-3 space-y-6">
              {activityLogs.map((log) => (
                <div key={log.id} className="relative pl-6">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{log.action}</span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{log.time}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      {log.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/90 text-center">
            <p className="text-[11px] text-slate-500">
              Audit trail logged locally for compliance & hyper-local advisory history.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
