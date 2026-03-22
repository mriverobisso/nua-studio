'use client';

import React, { useState } from 'react';
import Step1_Category from '@/components/widget/Step1_Category';
import Step2_Service from '@/components/widget/Step2_Service';
import Step3_Calendar from '@/components/widget/Step3_Calendar';
import Step4_AuthOTP from '@/components/widget/Step4_AuthOTP';
import Step5_Confirmation from '@/components/widget/Step5_Confirmation';

export default function BookingWidget() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    category: '',
    service: null as any,
    date: '',
    time: '',
    email: '',
  });

  const nextStep = () => setStep(s => Math.min(5, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleCategory = (category: string) => {
    setBookingData(d => ({ ...d, category }));
    nextStep();
  };

  const handleService = (service: any) => {
    setBookingData(d => ({ ...d, service }));
    nextStep();
  };

  const handleDateTime = (date: string, time: string) => {
    setBookingData(d => ({ ...d, date, time }));
    nextStep();
  };

  const handleAuthSuccess = (email: string) => {
    setBookingData(d => ({ ...d, email }));
    nextStep();
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      
      {/* Maximum width constraint for an embedded widget feel */}
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Sleek Progress Bar */}
        <div style={{ width: '100%', height: '4px', background: 'var(--glass-border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '2rem', marginTop: '1rem' }}>
          <div style={{ 
             height: '100%', 
             width: `${(step / 5) * 100}%`, 
             background: 'var(--accent)', 
             transition: 'width 0.4s ease' 
          }} />
        </div>

        {/* Dynamic Step Rendering Container */}
        <div style={{ position: 'relative', width: '100%' }}>
          {step === 1 && <Step1_Category onNext={handleCategory} />}
          {step === 2 && <Step2_Service category={bookingData.category} onNext={handleService} onBack={prevStep} />}
          {step === 3 && <Step3_Calendar onNext={handleDateTime} onBack={prevStep} />}
          {step === 4 && <Step4_AuthOTP onSuccess={handleAuthSuccess} onBack={prevStep} />}
          {step === 5 && <Step5_Confirmation bookingData={bookingData} />}
        </div>
        
        {/* Subtle Footer for Brand Authority */}
        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.5 }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Powered by NÜA Studio Tech</p>
        </div>

      </div>
    </div>
  );
}
