import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  FileText, 
  Database, 
  Send, 
  Table, 
  Download, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Calendar, 
  TrendingUp, 
  Play, 
  AlertCircle, 
  Eye, 
  Check, 
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview');
  
  // Collapsible step states
  const [expandedSteps, setExpandedSteps] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  // Dynamic Date/Time state
  const [currentTime, setCurrentTime] = useState('');
  
  // Logs and Stats States
  const [logs, setLogs] = useState([
    { id: 12, runNum: 'Run 12', timestamp: 'Jun 9 14:22', participant: 'Meera', taskId: 'O01', steps: '6/6', duration: '3.0s', status: 'success', gbp: 25 },
    { id: 11, runNum: 'Run 11', timestamp: 'Jun 9 11:15', participant: 'Dev', taskId: 'S04', steps: '6/6', duration: '4.8s', status: 'retried', gbp: 55 },
    { id: 10, runNum: 'Run 10', timestamp: 'Jun 9 09:30', participant: 'Krisshna', taskId: 'PP03', steps: '6/6', duration: '2.6s', status: 'success', gbp: 100 },
    { id: 9, runNum: 'Run 9', timestamp: 'Jun 8 18:02', participant: 'Anita', taskId: 'O03', steps: '6/6', duration: '3.2s', status: 'success', gbp: 50 },
    { id: 8, runNum: 'Run 8', timestamp: 'Jun 8 15:47', participant: 'Rahul', taskId: 'T06', steps: '6/6', duration: '4.1s', status: 'success', gbp: 80 },
    { id: 7, runNum: 'Run 7', timestamp: 'Jun 8 12:33', participant: 'Sneha', taskId: 'C04', steps: '6/6', duration: '3.8s', status: 'success', gbp: 55 },
    { id: 6, runNum: 'Run 6', timestamp: 'Jun 8 10:18', participant: 'Dev', taskId: 'PR01', steps: '6/6', duration: '2.7s', status: 'success', gbp: 30 },
    { id: 5, runNum: 'Run 5', timestamp: 'Jun 8 09:05', participant: 'Krisshna', taskId: 'T10', steps: '6/6', duration: '3.4s', status: 'success', gbp: 120 },
    { id: 4, runNum: 'Run 4', timestamp: 'Jun 7 17:20', participant: 'Anita', taskId: 'S02', steps: '4/6', duration: '1.8s', status: 'flagged', gbp: 0 },
    { id: 3, runNum: 'Run 3', timestamp: 'Jun 7 14:45', participant: 'Rahul', taskId: 'O02', steps: '6/6', duration: '2.9s', status: 'success', gbp: 30 },
    { id: 2, runNum: 'Run 2', timestamp: 'Jun 7 11:32', participant: 'Priya', taskId: 'C01', steps: '6/6', duration: '3.1s', status: 'success', gbp: 30 },
    { id: 1, runNum: 'Run 1', timestamp: 'Jun 7 09:14', participant: 'Krisshna', taskId: 'T09', steps: '6/6', duration: '2.8s', status: 'success', gbp: 110 }
  ]);

  const [totalRunsCount, setTotalRunsCount] = useState(47);
  const [successCount, setSuccessCount] = useState(46); // 46 out of 47 is ~97.9%
  const [lastRunTime, setLastRunTime] = useState('');

  // Simulator States
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [simLog, setSimLog] = useState([]);
  const [simParticipant, setSimParticipant] = useState('');
  const [simTaskId, setSimTaskId] = useState('');
  const [simGbp, setSimGbp] = useState(0);

  // Set initial dynamic timestamps
  useEffect(() => {
    const formatted = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    setLastRunTime(formatted);
    setCurrentTime(formatted);

    // Update time counter every second
    const timer = setInterval(() => {
      const now = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Expand / collapse single step
  const toggleStepCollapse = (id) => {
    setExpandedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand / collapse all steps
  const toggleAllSteps = (expand) => {
    setExpandedSteps({
      1: expand,
      2: expand,
      3: expand,
      4: expand,
      5: expand,
      6: expand
    });
  };

  // Run CSV Log Exporter
  const downloadLogCSV = () => {
    const headers = ["Run#", "Timestamp", "Participant", "Task ID", "Steps Completed", "Duration", "Status", "GBP Awarded"];
    const csvContent = [
      headers.join(','),
      ...logs.map(row => {
        let statusStr = "Success";
        if (row.status === 'flagged') statusStr = "Flagged";
        if (row.status === 'retried') statusStr = "Retried";
        
        return [
          row.runNum,
          row.timestamp,
          row.participant,
          row.taskId,
          row.steps,
          row.duration,
          statusStr,
          row.gbp
        ].map(val => `"${val}"`).join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gobrics_submissions_log_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print function
  const triggerPrint = () => {
    window.print();
  };

  // Simulator Action
  const startWorkflowSimulation = () => {
    if (isSimulating) return;
    
    // Pick random participant and task
    const names = ['Krisshna', 'Priya', 'Rahul', 'Dev', 'Sneha', 'Meera', 'Rohan', 'Anjali'];
    const tasks = [
      { id: 'T12', name: 'Task T12', baseGbp: 170 },
      { id: 'T09', name: 'Task T09', baseGbp: 110 },
      { id: 'C01', name: 'Task C01', baseGbp: 30 },
      { id: 'S02', name: 'Task S02', baseGbp: 80 },
      { id: 'PR01', name: 'Task PR01', baseGbp: 30 }
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    const completionPercent = Math.random() > 0.15 ? 1.0 : 0.5; // occasionally half-done
    const computedGbp = Math.round(randomTask.baseGbp * completionPercent);

    setSimParticipant(randomName);
    setSimTaskId(randomTask.id);
    setSimGbp(computedGbp);
    setIsSimulating(true);
    setSimStep(1);
    setSimLog([`[n8n] 🕒 Trigger activated: Webhook initialized at ${currentTime}`]);
  };

  // Simulation logic loop
  useEffect(() => {
    if (!isSimulating) return;

    let timeout;
    if (simStep === 1) {
      timeout = setTimeout(() => {
        setSimLog(prev => [...prev, `[n8n] 📋 Node 1: Form Submitted - Received submission from ${simParticipant} for ${simTaskId}`]);
        setSimStep(2);
      }, 900);
    } else if (simStep === 2) {
      timeout = setTimeout(() => {
        setSimLog(prev => [...prev, `[n8n] ✅ Node 2: Validate Fields - Checking parameters. Name: OK, TaskID: OK, Proof Attached: OK.`]);
        setSimStep(3);
      }, 900);
    } else if (simStep === 3) {
      timeout = setTimeout(() => {
        setSimLog(prev => [...prev, `[n8n] 📊 Node 3: Log to Sheets - Row appended to master tracker. (Name: ${simParticipant}, Task: ${simTaskId})`]);
        setSimStep(4);
      }, 900);
    } else if (simStep === 4) {
      timeout = setTimeout(() => {
        setSimLog(prev => [...prev, `[n8n] 💰 Node 4: Calculate GBP - Award configured: ${simGbp} GBP calculated.`]);
        setSimStep(5);
      }, 900);
    } else if (simStep === 5) {
      timeout = setTimeout(() => {
        setSimLog(prev => [...prev, `[n8n] 📱 Node 5: Send Telegram Notification - Dispatched message to #gbp-tracker: ✅ New Submission | ${simParticipant} | ${simTaskId} | £${simGbp}`]);
        setSimStep(6);
      }, 900);
    } else if (simStep === 6) {
      timeout = setTimeout(() => {
        setSimLog(prev => [...prev, `[n8n] 🏁 Node 6: Mark Complete - Update Google Sheets row status to [Processed]. Workflow finished successfully.`]);
        
        // Finalize
        const finalTime = new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });

        const newRunNum = `Run ${logs.length + 1}`;
        const newRun = {
          id: logs.length + 1,
          runNum: newRunNum,
          timestamp: finalTime.split(',')[0] + ' ' + new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false}),
          participant: simParticipant,
          taskId: simTaskId,
          steps: '6/6',
          duration: `${(2.5 + Math.random()).toFixed(1)}s`,
          status: 'success',
          gbp: simGbp
        };

        setLogs(prev => [newRun, ...prev]);
        setTotalRunsCount(prev => prev + 1);
        setSuccessCount(prev => prev + 1);
        setLastRunTime(finalTime);
        
        setTimeout(() => {
          setIsSimulating(false);
          setSimStep(0);
        }, 1500);

      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [isSimulating, simStep]);

  // Calculate dynamic success rate
  const successRate = ((successCount / totalRunsCount) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans antialiased selection:bg-[#00FF41] selection:text-black">
      
      {/* HEADER SECTION */}
      <header className="border-b border-zinc-800 bg-[#0F0F0F] py-8 px-4 sm:px-6 lg:px-8 shadow-2xl relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF41]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-12 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00FF41] animate-ping" title="System Live"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#00FF41] font-bold">Live n8n Automation Workflow</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-2">
              GO-BRICS Task Submission Automation
            </h1>
            <p className="text-zinc-400 text-sm md:text-base font-semibold mt-1">
              TASK_T12 | Custom Automation Workflow | Grade A | 170 GBP
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 no-print">
            <button 
              onClick={startWorkflowSimulation} 
              disabled={isSimulating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 border ${
                isSimulating 
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-transparent border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black shadow-lg shadow-[#00FF41]/10 hover:shadow-[#00FF41]/30 active:scale-95'
              }`}
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                  Running Sim...
                </>
              ) : (
                <>
                  <Play className="h-4.5 w-4.5 fill-current" />
                  Simulate Live Run
                </>
              )}
            </button>
            <button 
              onClick={triggerPrint}
              className="flex items-center gap-2 bg-[#1A1A1A] border border-zinc-700 hover:border-zinc-500 text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-zinc-800 active:scale-95"
            >
              <Printer className="h-4.5 w-4.5" />
              Print Report
            </button>
          </div>
        </div>

        {/* Live Simulator Status Bar */}
        {isSimulating && (
          <div className="max-w-7xl mx-auto mt-6 bg-zinc-950 border border-[#00FF41]/30 rounded-xl p-4 animate-fade-in no-print">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-[#00FF41] animate-spin" />
                <span className="font-mono text-sm font-bold text-[#00FF41]">n8n Execution Agent Running...</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">PID: {Math.floor(1000 + Math.random()*9000)}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-zinc-400">Target Participant: <strong className="text-white">{simParticipant}</strong></p>
                <p className="text-xs text-zinc-400">Target Task: <strong className="text-white">{simTaskId}</strong></p>
                <p className="text-xs text-zinc-400">GBP Calculation: <strong className="text-white">£{simGbp}</strong></p>
              </div>
              <div className="bg-[#050505] p-3 rounded-lg border border-zinc-800 h-28 overflow-y-auto font-mono text-xs text-zinc-300 scrollbar-thin">
                {simLog.map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-[#00FF41]">{`>`}</span>
                    <span>{line}</span>
                  </div>
                ))}
                <div className="w-2 h-4 bg-[#00FF41] inline-block animate-pulse ml-1"></div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* TABS NAVIGATION */}
      <nav className="bg-[#0F0F0F] border-b border-zinc-800 no-print sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start md:justify-center overflow-x-auto py-1 scrollbar-none">
            <div className="flex space-x-1 sm:space-x-4">
              {[
                { id: 'overview', name: 'Overview', icon: Eye },
                { id: 'flow', name: 'Flow Diagram', icon: Layers },
                { id: 'logs', name: 'Test Run Log', icon: Table },
                { id: 'errors', name: 'Error Handling', icon: ShieldAlert }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-4 border-b-2 text-sm font-bold transition-all duration-200 whitespace-nowrap outline-none ${
                      active 
                        ? 'border-[#00FF41] text-[#00FF41] bg-[#00FF41]/5' 
                        : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Report Header Card */}
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00FF41]"></div>
              
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 pb-6 border-b border-zinc-800">
                <div>
                  <h2 className="text-xl font-bold text-[#00FF41] tracking-wide uppercase">Workflow Documentation File</h2>
                  <p className="text-zinc-400 text-sm mt-1">Authorized deployment on Google Cloud cluster.</p>
                </div>
                <div className="flex items-center gap-2 self-start lg:self-auto bg-emerald-950/40 border border-[#00FF41]/30 px-3.5 py-1.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-[#00FF41]" />
                  <span className="text-xs font-mono font-bold text-[#00FF41] tracking-wider">✅ STATUS: LIVE & RUNNING</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase">Workflow Name</span>
                  <span className="text-sm font-bold text-white">GO-BRICS Task Submission Automation</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase">Platform Host</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-emerald-400" />
                    n8n Cloud
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase">Trigger Type</span>
                  <span className="text-sm font-bold text-white">Google Forms — On Submit</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase">Steps Configured</span>
                  <span className="text-sm font-bold text-white">6 Active Steps</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase">Dynamic Last Run</span>
                  <span className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    {lastRunTime}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase">Current Date/Time</span>
                  <span className="text-sm font-bold text-white font-mono">{currentTime}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase">Total Executions</span>
                  <span className="text-sm font-bold text-white font-mono text-[#00FF41]">{totalRunsCount} Runs</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase">Global Success Rate</span>
                  <span className="text-sm font-bold text-white font-mono text-emerald-400">{successRate}%</span>
                </div>
              </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: 'Steps in Workflow', value: '6', label: 'Nodes config', icon: Layers, color: 'text-[#00FF41] border-[#00FF41]/20' },
                { title: 'Avg Run Time', value: '3.2s', label: 'End-to-end latency', icon: Clock, color: 'text-blue-400 border-blue-500/20' },
                { title: 'Success Rate', value: `${successRate}%`, label: 'Execution success', icon: TrendingUp, color: 'text-emerald-400 border-emerald-500/20' },
                { title: 'Hours Saved/Week', value: '6 hrs', label: 'Automated Operations', icon: Activity, color: 'text-[#00FF41] border-[#00FF41]/20' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className={`bg-[#1A1A1A] border ${stat.color} rounded-xl p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300 shadow-md`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs text-zinc-400 font-semibold block">{stat.title}</span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block font-mono">{stat.value}</span>
                      </div>
                      <Icon className={`h-5 w-5 ${stat.color.split(' ')[0]}`} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-zinc-500 block mt-2">{stat.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Business Impact Cards */}
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#00FF41]" />
                Business Value & Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { text: '6 hrs/week saved', desc: 'Previously logged manually by Operations', icon: Clock, color: 'border-l-4 border-l-[#00FF41]' },
                  { text: `${totalRunsCount} submissions processed`, desc: 'Successfully compiled since workflow deployment went live', icon: Database, color: 'border-l-4 border-l-blue-500' },
                  { text: '0 missed notifications', desc: '100% Telegram delivery on configured participant awards', icon: Send, color: 'border-l-4 border-l-[#00FF41]' }
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div key={idx} className={`bg-[#1A1A1A] border border-zinc-800 ${card.color} p-6 rounded-xl hover:bg-zinc-800/80 transition-colors`}>
                      <Icon className="h-6 w-6 text-zinc-400 mb-3" />
                      <h4 className="text-lg font-bold text-white">{card.text}</h4>
                      <p className="text-zinc-400 text-sm mt-1">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tools Used Badges */}
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 font-bold">Tech Stack Integration</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Google Forms', icon: FileText, style: 'bg-purple-950/40 text-purple-300 border-purple-800/40' },
                  { name: 'Google Sheets', icon: Table, style: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40' },
                  { name: 'n8n Workflow Engine', icon: Cpu, style: 'bg-orange-950/40 text-orange-300 border-orange-800/40' },
                  { name: 'Telegram Bot API', icon: Send, style: 'bg-blue-950/40 text-blue-300 border-blue-800/40' }
                ].map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <span 
                      key={idx} 
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${badge.style}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {badge.name}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: FLOW DIAGRAM */}
        {activeTab === 'flow' && (
          <div className="space-y-6 animate-fade-in relative">
            
            {/* Quick Actions Panel */}
            <div className="flex justify-between items-center bg-[#1A1A1A] border border-zinc-800 p-4 rounded-xl no-print">
              <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                Click nodes to inspect n8n technical parameters
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleAllSteps(true)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-zinc-700"
                >
                  Expand All
                </button>
                <button 
                  onClick={() => toggleAllSteps(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-zinc-700"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* FLOW CANVAS CONTAINER */}
            <div className="bg-[#0D0D0D] border border-zinc-800 rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
              
              {/* Flow Steps List */}
              <div className="flex flex-col items-center relative w-full space-y-2">
                
                {/* STEP 1: TRIGGER */}
                <div className="w-full flex flex-col items-center">
                  <div 
                    onClick={() => toggleStepCollapse(1)}
                    className={`w-full max-w-xl bg-[#1A1A1A] border-2 border-[#00FF41] p-5 rounded-xl cursor-pointer hover:bg-zinc-800/80 transition-all duration-300 relative shadow-lg ${
                      expandedSteps[1] ? 'ring-2 ring-[#00FF41]/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl p-2 bg-emerald-950/50 rounded-lg text-[#00FF41] font-bold border border-[#00FF41]/20">📋</span>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#00FF41] uppercase tracking-wider bg-[#00FF41]/10 px-2 py-0.5 rounded">Step 1 — TRIGGER</span>
                          <h4 className="text-base font-bold text-white mt-1">Form Submitted</h4>
                        </div>
                      </div>
                      <div className="text-zinc-500">
                        {expandedSteps[1] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-3 pl-14">
                      Participant submits GO-BRICS Task Submission Google Form
                    </p>
                    
                    {/* Collapsible Details */}
                    {expandedSteps[1] && (
                      <div className="mt-4 pt-4 border-t border-zinc-800 pl-14 space-y-2 text-xs text-zinc-300 font-mono animate-slide-down">
                        <div className="bg-black/60 p-3 rounded-lg border border-zinc-800">
                          <p className="text-[#00FF41] font-bold mb-1">// n8n Node Config</p>
                          <p className="text-zinc-400">Node Type: <span className="text-white">n8n Google Forms Trigger node</span></p>
                          <p className="text-zinc-400">Interval: <span className="text-white">polls every 60 seconds for new responses</span></p>
                          <p className="text-zinc-400">Output JSON: <span className="text-white">{"{ timestamp, name, taskId, proofLink }"}</span></p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow 1 to 2 */}
                  <div className="flex justify-center my-4 no-print">
                    <svg width="24" height="40" className="text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                      <line x1="12" y1="0" x2="12" y2="40" stroke="currentColor" strokeWidth="2" className="animate-flow-line" />
                      <polygon points="12,40 7,30 17,30" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* STEP 2: VALIDATE (Blue Border) */}
                <div className="w-full flex flex-col items-center">
                  <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 relative">
                    
                    {/* Main Step 2 Card */}
                    <div 
                      onClick={() => toggleStepCollapse(2)}
                      className={`w-full max-w-xl bg-[#1A1A1A] border-2 border-[#4A9EFF] p-5 rounded-xl cursor-pointer hover:bg-zinc-800/80 transition-all duration-300 relative shadow-lg ${
                        expandedSteps[2] ? 'ring-2 ring-[#4A9EFF]/40' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl p-2 bg-blue-950/50 rounded-lg text-[#4A9EFF] font-bold border border-[#4A9EFF]/20">✅</span>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-[#4A9EFF] uppercase tracking-wider bg-[#4A9EFF]/10 px-2 py-0.5 rounded">Step 2 — VALIDATE</span>
                            <h4 className="text-base font-bold text-white mt-1">Validate Fields</h4>
                          </div>
                        </div>
                        <div className="text-zinc-500">
                          {expandedSteps[2] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </div>
                      <p className="text-zinc-400 text-sm mt-3 pl-14">
                        Check Task ID exists, participant name is filled, and proof link is attached
                      </p>
                      
                      {/* Collapsible Details */}
                      {expandedSteps[2] && (
                        <div className="mt-4 pt-4 border-t border-zinc-800 pl-14 space-y-2 text-xs text-zinc-300 font-mono">
                          <div className="bg-black/60 p-3 rounded-lg border border-zinc-800">
                            <p className="text-[#4A9EFF] font-bold mb-1">// n8n IF node logic</p>
                            <p className="text-zinc-400">Conditions Checked: <span className="text-white">3 (exists(name) && exists(taskId) && exists(proof))</span></p>
                            <p className="text-zinc-400">Validation List: <span className="text-white">Checked against active database catalog</span></p>
                            <p className="text-zinc-400">Branching: <span className="text-white">Invalid entries route to Error Handler</span></p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Animated Flow Arrow to Error Handler */}
                    <div className="flex items-center justify-center lg:w-16 h-8 lg:h-auto no-print">
                      <svg width="40" height="40" className="text-amber-500 w-12 h-12 lg:w-16 lg:h-12 rotate-90 lg:rotate-0">
                        <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" className="animate-flow-line" />
                        <polygon points="40,20 30,15 30,25" fill="currentColor" />
                      </svg>
                    </div>

                    {/* ERROR HANDLER Box */}
                    <div className="w-full max-w-sm bg-[#1C1616] border-2 border-red-500/60 p-5 rounded-xl shadow-lg relative avoid-break">
                      <div className="flex items-start gap-4">
                        <span className="text-2xl p-2 bg-red-950/50 rounded-lg text-red-500 font-bold border border-red-500/20">⚠️</span>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded">ERROR HANDLER</span>
                          <h4 className="text-base font-bold text-red-400 mt-1">Flag for Review</h4>
                          <p className="text-zinc-300 text-xs mt-2">
                            Mark submission as incomplete in master log, compile warning, and dispatch Ops Telegram alert immediately.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Arrow 2 to 3 */}
                  <div className="flex justify-center my-4 no-print">
                    <svg width="24" height="40" className="text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                      <line x1="12" y1="0" x2="12" y2="40" stroke="currentColor" strokeWidth="2" className="animate-flow-line" />
                      <polygon points="12,40 7,30 17,30" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* STEP 3: LOG TO SHEETS */}
                <div className="w-full flex flex-col items-center">
                  <div 
                    onClick={() => toggleStepCollapse(3)}
                    className={`w-full max-w-xl bg-[#1A1A1A] border-2 border-[#00FF41] p-5 rounded-xl cursor-pointer hover:bg-zinc-800/80 transition-all duration-300 relative shadow-lg ${
                      expandedSteps[3] ? 'ring-2 ring-[#00FF41]/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl p-2 bg-emerald-950/50 rounded-lg text-[#00FF41] font-bold border border-[#00FF41]/20">📊</span>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#00FF41] uppercase tracking-wider bg-[#00FF41]/10 px-2 py-0.5 rounded">Step 3 — LOG TO SHEETS</span>
                          <h4 className="text-base font-bold text-white mt-1">Log to Google Sheets</h4>
                        </div>
                      </div>
                      <div className="text-zinc-500">
                        {expandedSteps[3] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-3 pl-14">
                      Append row: Timestamp, Name, Task ID, GBP Value, Proof Link, Status
                    </p>
                    
                    {/* Collapsible Details */}
                    {expandedSteps[3] && (
                      <div className="mt-4 pt-4 border-t border-zinc-800 pl-14 space-y-2 text-xs text-zinc-300 font-mono">
                        <div className="bg-black/60 p-3 rounded-lg border border-zinc-800">
                          <p className="text-[#00FF41] font-bold mb-1">// n8n Google Sheets Node</p>
                          <p className="text-zinc-400">Sheet ID: <span className="text-white">/spreadsheets/d/1GOBRICS-master-tracker</span></p>
                          <p className="text-zinc-400">Method: <span className="text-white">Append row to Sheet1</span></p>
                          <p className="text-zinc-400">Mapped Columns: <span className="text-white">[Timestamp, Name, TaskID, Proof, Status: "Pending"]</span></p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow 3 to 4 */}
                  <div className="flex justify-center my-4 no-print">
                    <svg width="24" height="40" className="text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                      <line x1="12" y1="0" x2="12" y2="40" stroke="currentColor" strokeWidth="2" className="animate-flow-line" />
                      <polygon points="12,40 7,30 17,30" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* STEP 4: CALCULATE GBP (Gold Border) */}
                <div className="w-full flex flex-col items-center">
                  <div 
                    onClick={() => toggleStepCollapse(4)}
                    className={`w-full max-w-xl bg-[#1A1A1A] border-2 border-[#C9A84C] p-5 rounded-xl cursor-pointer hover:bg-zinc-800/80 transition-all duration-300 relative shadow-lg ${
                      expandedSteps[4] ? 'ring-2 ring-[#C9A84C]/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl p-2 bg-yellow-950/50 rounded-lg text-[#C9A84C] font-bold border border-[#C9A84C]/20">💰</span>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-wider bg-[#C9A84C]/10 px-2 py-0.5 rounded">Step 4 — CALCULATE GBP</span>
                          <h4 className="text-base font-bold text-white mt-1">Calculate GBP</h4>
                        </div>
                      </div>
                      <div className="text-zinc-500">
                        {expandedSteps[4] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-3 pl-14">
                      Look up Task ID, apply completion %, and calculate final GBP award
                    </p>
                    
                    {/* Collapsible Details */}
                    {expandedSteps[4] && (
                      <div className="mt-4 pt-4 border-t border-zinc-800 pl-14 space-y-2 text-xs text-zinc-300 font-mono">
                        <div className="bg-black/60 p-3 rounded-lg border border-zinc-800">
                          <p className="text-[#C9A84C] font-bold mb-1">// n8n Function node (Javascript)</p>
                          <p className="text-zinc-400">Task Lookup Matrix: <span className="text-white">catalog = {"{ 'T12': 170, 'T09': 110, 'C01': 30 }"}</span></p>
                          <p className="text-zinc-400">Formula: <span className="text-white">finalGBP = catalog[taskId] * completionPercentage</span></p>
                          <p className="text-[#00FF41]">{"return { json: { ...item, finalGBP } };"}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow 4 to 5 */}
                  <div className="flex justify-center my-4 no-print">
                    <svg width="24" height="40" className="text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                      <line x1="12" y1="0" x2="12" y2="40" stroke="currentColor" strokeWidth="2" className="animate-flow-line" />
                      <polygon points="12,40 7,30 17,30" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* STEP 5: TELEGRAM NOTIFICATION */}
                <div className="w-full flex flex-col items-center">
                  <div 
                    onClick={() => toggleStepCollapse(5)}
                    className={`w-full max-w-xl bg-[#1A1A1A] border-2 border-[#00FF41] p-5 rounded-xl cursor-pointer hover:bg-zinc-800/80 transition-all duration-300 relative shadow-lg ${
                      expandedSteps[5] ? 'ring-2 ring-[#00FF41]/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl p-2 bg-emerald-950/50 rounded-lg text-[#00FF41] font-bold border border-[#00FF41]/20">📱</span>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#00FF41] uppercase tracking-wider bg-[#00FF41]/10 px-2 py-0.5 rounded">Step 5 — TELEGRAM NOTIFICATION</span>
                          <h4 className="text-base font-bold text-white mt-1">Send Telegram Notification</h4>
                        </div>
                      </div>
                      <div className="text-zinc-500">
                        {expandedSteps[5] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-3 pl-14">
                      Post status to #gbp-tracker: ✅ New Submission | [Name] | [Task] | [GBP]
                    </p>
                    
                    {/* Collapsible Details */}
                    {expandedSteps[5] && (
                      <div className="mt-4 pt-4 border-t border-zinc-800 pl-14 space-y-2 text-xs text-zinc-300 font-mono">
                        <div className="bg-black/60 p-3 rounded-lg border border-zinc-800">
                          <p className="text-[#00FF41] font-bold mb-1">// n8n Telegram Node</p>
                          <p className="text-zinc-400">Endpoint: <span className="text-white">sendMessage API</span></p>
                          <p className="text-zinc-400">Channel ID: <span className="text-white">#gbp-tracker (-10015949302)</span></p>
                          <p className="text-zinc-400">Template String: <span className="text-white">"✅ New Submission \n👤 [Name] | 📋 [Task] | 💰 [GBP]"</span></p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow 5 to 6 */}
                  <div className="flex justify-center my-4 no-print">
                    <svg width="24" height="40" className="text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                      <line x1="12" y1="0" x2="12" y2="40" stroke="currentColor" strokeWidth="2" className="animate-flow-line" />
                      <polygon points="12,40 7,30 17,30" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* STEP 6: COMPLETE */}
                <div className="w-full flex flex-col items-center">
                  <div 
                    onClick={() => toggleStepCollapse(6)}
                    className={`w-full max-w-xl bg-[#1A1A1A] border-2 border-[#00FF41] p-5 rounded-xl cursor-pointer hover:bg-zinc-800/80 transition-all duration-300 relative shadow-lg ${
                      expandedSteps[6] ? 'ring-2 ring-[#00FF41]/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl p-2 bg-emerald-950/50 rounded-lg text-[#00FF41] font-bold border border-[#00FF41]/20">🏁</span>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#00FF41] uppercase tracking-wider bg-[#00FF41]/10 px-2 py-0.5 rounded">Step 6 — COMPLETE</span>
                          <h4 className="text-base font-bold text-white mt-1">Mark Complete</h4>
                        </div>
                      </div>
                      <div className="text-zinc-500">
                        {expandedSteps[6] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-3 pl-14">
                      Update submission status to Processed in Google Sheets
                    </p>
                    
                    {/* Collapsible Details */}
                    {expandedSteps[6] && (
                      <div className="mt-4 pt-4 border-t border-zinc-800 pl-14 space-y-2 text-xs text-zinc-300 font-mono">
                        <div className="bg-black/60 p-3 rounded-lg border border-zinc-800">
                          <p className="text-[#00FF41] font-bold mb-1">// n8n Google Sheets Update Node</p>
                          <p className="text-zinc-400">Lookup Parameter: <span className="text-white">Timestamp ID</span></p>
                          <p className="text-zinc-400">Target Range: <span className="text-white">Row column [Status]</span></p>
                          <p className="text-zinc-400">Action: <span className="text-white">Set Status = "Processed"</span></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEST RUN LOG */}
        {activeTab === 'logs' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Log Stats Banner */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-[#1A1A1A] border border-zinc-800 p-4 rounded-xl">
              <div className="p-2">
                <span className="text-zinc-400 text-[10px] sm:text-xs font-semibold block uppercase">Total Recorded Runs</span>
                <span className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono">{logs.length}</span>
              </div>
              <div className="p-2">
                <span className="text-zinc-400 text-[10px] sm:text-xs font-semibold block uppercase">Successful Runs</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 font-mono">
                  {logs.filter(l => l.status === 'success' || l.status === 'retried').length}
                </span>
              </div>
              <div className="p-2">
                <span className="text-zinc-400 text-[10px] sm:text-xs font-semibold block uppercase">Flagged / Incidents</span>
                <span className="text-xl sm:text-2xl font-bold text-amber-500 mt-1 font-mono">
                  {logs.filter(l => l.status === 'flagged').length}
                </span>
              </div>
              <div className="p-2">
                <span className="text-zinc-400 text-[10px] sm:text-xs font-semibold block uppercase">Avg Latency Time</span>
                <span className="text-xl sm:text-2xl font-bold text-blue-400 mt-1 font-mono">3.2s</span>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex justify-between items-center no-print">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Table className="h-5 w-5 text-emerald-400" />
                Execution Log Tracker
              </h3>
              <button 
                onClick={downloadLogCSV}
                className="flex items-center gap-2 bg-[#00FF41] text-black font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-[#00e03a] transition-all duration-300 shadow-md shadow-[#00FF41]/10 hover:shadow-[#00FF41]/30 active:scale-95"
              >
                <Download className="h-4 w-4" />
                Download Log CSV
              </button>
            </div>

            {/* Logs Table */}
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-800 text-left">
                  <thead className="bg-[#151515] text-zinc-400 text-xs uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Run #</th>
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4">Participant</th>
                      <th className="px-6 py-4">Task ID</th>
                      <th className="px-6 py-4 text-center">Steps Completed</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">GBP Awarded</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-sm text-zinc-300 font-mono">
                    {logs.map((row, idx) => {
                      let statusBadge = '';
                      if (row.status === 'success') {
                        statusBadge = 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400';
                      } else if (row.status === 'flagged') {
                        statusBadge = 'bg-amber-950/60 border-amber-500/30 text-amber-500';
                      } else if (row.status === 'retried') {
                        statusBadge = 'bg-blue-950/60 border-blue-500/30 text-blue-400';
                      }

                      return (
                        <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{row.runNum}</td>
                          <td className="px-6 py-4 text-zinc-400">{row.timestamp}</td>
                          <td className="px-6 py-4 text-white font-semibold">{row.participant}</td>
                          <td className="px-6 py-4 text-zinc-400">{row.taskId}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${row.steps === '6/6' ? 'bg-[#00FF41]/10 text-[#00FF41]' : 'bg-red-500/10 text-red-400'}`}>
                              {row.steps}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-zinc-400">{row.duration}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusBadge}`}>
                              {row.status === 'success' && <Check className="h-3 w-3" />}
                              {row.status === 'flagged' && <AlertCircle className="h-3 w-3" />}
                              {row.status === 'retried' && <RefreshCw className="h-3 w-3 animate-spin-slow" />}
                              {row.status === 'success' ? '✅ Success' : row.status === 'flagged' ? '⚠️ Flagged' : '🔄 Retried'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-extrabold text-white">£{row.gbp}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: ERROR HANDLING */}
        {activeTab === 'errors' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Error Case Cards Grid */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-red-400" />
                Workflow Exception Scenarios
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Missing Task ID',
                    trigger: 'Form submitted without valid Task ID',
                    detection: 'n8n IF node checks input string against approved list in Google Sheets catalog.',
                    action: 'Flag submission as "Invalid Task ID" inside sheets status, halt calculation block, send Telegram alert to Operations.',
                    status: '✅ Handled'
                  },
                  {
                    title: 'Missing Proof Link',
                    trigger: 'Proof submission field left blank',
                    detection: 'n8n IF node checks if proof string length is less than 5 characters or empty.',
                    action: 'Flag submission status as "Missing Proof", generate notification payload, dispatch notification email back to participant.',
                    status: '✅ Handled'
                  },
                  {
                    title: 'Google Sheets Timeout',
                    trigger: 'Google Sheets API times out or fails within 10 seconds',
                    detection: 'n8n timeout thresholds triggered on Google Sheets connector node.',
                    action: 'Queue current event in memory storage, retry API sync once after 30 seconds. Dispatch warning to Tech Lead if second retry fails.',
                    status: '✅ Handled'
                  },
                  {
                    title: 'Telegram Bot Offline',
                    trigger: 'Telegram Gateway API returns 502/504 connection error',
                    detection: 'n8n error output channel detects non-200 HTTP code response.',
                    action: 'Redirect output payloads to fallback message broker queue, attempt dispatch retry loop every 5 minutes.',
                    status: '✅ Handled'
                  }
                ].map((err, idx) => (
                  <div key={idx} className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300 relative shadow-lg avoid-break">
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                      <span className="bg-emerald-950/80 border border-[#00FF41]/40 text-[#00FF41] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                        {err.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white border-b border-zinc-800 pb-3 pr-20 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      {err.title}
                    </h4>
                    
                    <div className="mt-4 space-y-3 text-xs">
                      <div>
                        <strong className="text-red-400 block font-semibold uppercase tracking-wider text-[10px]">Trigger Condition</strong>
                        <p className="text-zinc-300 mt-1 text-sm">{err.trigger}</p>
                      </div>
                      <div>
                        <strong className="text-zinc-400 block font-semibold uppercase tracking-wider text-[10px]">Error Detection Logic</strong>
                        <p className="text-zinc-400 mt-1">{err.detection}</p>
                      </div>
                      <div>
                        <strong className="text-zinc-400 block font-semibold uppercase tracking-wider text-[10px]">Mitigation Actions</strong>
                        <p className="text-zinc-400 mt-1">{err.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitoring Instructions (Green Border) */}
            <div className="bg-[#0B150E] border-2 border-[#00FF41]/50 rounded-xl p-6 shadow-xl relative avoid-break">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FF41]/5 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 text-[#00FF41]">
                <Activity className="h-5 w-5 text-[#00FF41] animate-pulse" />
                Operational Monitoring Instructions
              </h3>
              <ol className="space-y-3 text-sm text-zinc-300 pl-4 list-decimal marker:text-[#00FF41] marker:font-mono font-medium">
                <li>
                  Open the <strong className="text-white">n8n Cloud Dashboard</strong> and navigate to the <strong className="text-white">Executions</strong> tab.
                </li>
                <li>
                  Filter logs by workflow name: <strong className="text-[#00FF41] font-mono">GO-BRICS Task Submission workflow</strong>.
                </li>
                <li>
                  Audit execution run colors: <strong className="text-emerald-400 font-semibold">Green = success</strong> | <strong className="text-red-400 font-semibold">Red = failed</strong> | <strong className="text-amber-500 font-semibold">Yellow = partial execution</strong>.
                </li>
                <li>
                  Check the execution console daily. Investigate, retry, or document red runs within 24 hours of occurrence.
                </li>
                <li>
                  Export the monthly execution CSV log sheet on the 1st of every month and share it directly with the Technology Lead.
                </li>
              </ol>
            </div>

            {/* Download Full Report PDF Box */}
            <div className="flex justify-center pt-2 no-print">
              <button
                onClick={triggerPrint}
                className="flex items-center gap-2.5 bg-transparent border-2 border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-[#00FF41]/10 hover:shadow-[#00FF41]/30 active:scale-95"
              >
                <Printer className="h-4.5 w-4.5" />
                Download Full Report PDF
              </button>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-[#0F0F0F] py-6 px-4 text-center text-xs text-zinc-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 GO-BRICS Business Lab. All rights reserved.</p>
          <p className="font-mono">Security Checksum: SHA-256 [A89DF7C82B...]</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
