import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { FieldCASLogbook } from './components/FieldCASLogbook';
import { RaisingFactorEngineView } from './components/RaisingFactorEngineView';
import { WaterbodyGISMap } from './components/WaterbodyGISMap';
import { ProposalViewer } from './components/ProposalViewer';
import { ProofOfWorkDossier } from './components/ProofOfWorkDossier';
import { AdminConsole } from './components/AdminConsole';
import { INITIAL_CATCH_RECORDS } from './services/mockData';
import { CatchAssessmentRecord } from './types/fishery';

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'field-cas' | 'raising-engine' | 'gis-map' | 'proposal' | 'dossier' | 'admin-console'>('dashboard');
  const [userRole, setUserRole] = useState<'demonstrator' | 'dfdo' | 'directorate'>('directorate');
  const [records, setRecords] = useState<CatchAssessmentRecord[]>(INITIAL_CATCH_RECORDS);

  const pendingSyncCount = records.filter(r => r.syncStatus === 'pending').length;

  const handleAddRecord = (newRecord: CatchAssessmentRecord) => {
    setRecords(prev => [...prev, newRecord]);
  };

  const handleSyncAll = () => {
    setRecords(prev => prev.map(r => ({ ...r, syncStatus: 'synced' })));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingSyncCount={pendingSyncCount}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            records={records}
            onNavigateToCAS={() => setActiveTab('field-cas')}
            onNavigateToRaising={() => setActiveTab('raising-engine')}
          />
        )}

        {activeTab === 'field-cas' && (
          <FieldCASLogbook
            records={records}
            onAddRecord={handleAddRecord}
            onSyncAll={handleSyncAll}
          />
        )}

        {activeTab === 'raising-engine' && (
          <RaisingFactorEngineView
            records={records}
          />
        )}

        {activeTab === 'gis-map' && (
          <WaterbodyGISMap />
        )}

        {activeTab === 'proposal' && (
          <ProposalViewer />
        )}

        {activeTab === 'dossier' && (
          <ProofOfWorkDossier />
        )}

        {activeTab === 'admin-console' && (
          <AdminConsole />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">MatsyaDrishti Assam</span>
            <span>•</span>
            <span>North East Seva First Innovation Challenge (NESFIC 2026: NESFIC-D-33)</span>
          </div>
          <div className="text-slate-500 text-center sm:text-right">
            <span>Aligned with ICAR-Central Inland Fisheries Research Institute (CIFRI) & Assam Fishery Rules</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
