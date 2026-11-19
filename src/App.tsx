/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedSection } from './components/TrustedSection';
import { ServiceModal } from './components/modals/ServiceModal';
import { ServiceType } from './types';

// Declare Telegram WebApp interface on window
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
      };
    };
  }
}

export default function App() {
  const [activeService, setActiveService] = useState<ServiceType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      try {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      } catch (err) {
        console.error('Telegram WebApp init error:', err);
      }
    }
  }, []);

  const handleSelectService = (service: ServiceType) => {
    setActiveService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveService(null);
  };

  const handleHelpCenter = () => {
    setActiveService('userid');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex flex-col text-[#1a2b4c] selection:bg-[#0060af] selection:text-white">
      {/* Navbar */}
      <Navbar onHelpClick={handleHelpCenter} />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero onSelectService={handleSelectService} />
        <TrustedSection />
      </main>

      {/* Dynamic Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        serviceType={activeService}
        onClose={handleCloseModal}
      />
    </div>
  );
}

