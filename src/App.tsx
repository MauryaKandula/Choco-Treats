import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { Footer } from './components/common/Footer.tsx';
import { Hero } from './components/home/Hero.tsx';
import { FlavorShowcase } from './components/home/FlavorShowcase.tsx';
import { PackagingShowcase } from './components/home/PackagingShowcase.tsx';
import { OrderingSteps } from './components/home/OrderingSteps.tsx';
import { DeliveryChecker } from './components/home/DeliveryChecker.tsx';
import { HomeFAQ } from './components/home/HomeFAQ.tsx';
import { ShopCatalog } from './components/shop/ShopCatalog.tsx';
import { CustomBoxBuilder } from './components/custom/CustomBoxBuilder.tsx';
import { OurStoryView } from './components/story/OurStoryView.tsx';
import { BulkRetailView } from './components/bulk/BulkRetailView.tsx';
import { CartDrawer } from './components/cart/CartDrawer.tsx';
import { PolicyModal } from './components/common/PolicyModal.tsx';
import { OwnerConfigModal } from './components/common/OwnerConfigModal.tsx';
import { ChocolateCursorEffect } from './components/common/ChocolateCursorEffect.tsx';
import { CheckCircle2 } from 'lucide-react';

const RevealSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();
  const prefersReducedMotion = useReducedMotion();

  const pageVariants = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF1E6] text-[#281711] selection:bg-[#C99C76]/30 selection:text-[#281711] relative">
      {/* Ambient silky mouse/touch particle canvas */}
      <ChocolateCursorEffect />

      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar />

      {/* Active Screen Rendering with smooth motion fade & slide-up transitions & mobile bottom bar clearance */}
      <main className="flex-1 pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && (
              <div className="space-y-0">
                <Hero />
                <RevealSection>
                  <FlavorShowcase />
                </RevealSection>
                <RevealSection>
                  <PackagingShowcase />
                </RevealSection>
                <RevealSection>
                  <OrderingSteps />
                </RevealSection>
                <RevealSection>
                  <DeliveryChecker />
                </RevealSection>
                <RevealSection>
                  <HomeFAQ />
                </RevealSection>
              </div>
            )}

            {activeTab === 'shop' && <ShopCatalog />}

            {activeTab === 'customize' && <CustomBoxBuilder />}

            {activeTab === 'story' && <OurStoryView />}

            {activeTab === 'bulk' && <BulkRetailView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Boutique Footer */}
      <Footer />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <PolicyModal />
      <OwnerConfigModal />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-[#442719] text-[#FAF1E6] px-4 py-3 rounded-lg shadow-xl border border-[#C99C76]/40 flex items-center gap-2.5 text-xs font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-[#D7BD96] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
