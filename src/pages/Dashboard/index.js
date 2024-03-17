import React from 'react';
import Summary from './components/Summary';
import WalletInspector from './components/WalletInspector';

const Dashboard = () => {
  return (
    <main className="flex flex-col gap-4">
      <Summary />
      <WalletInspector />
    </main>
  );
};

export default Dashboard;
