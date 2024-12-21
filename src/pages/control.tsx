'use client';
import { createClient } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import { useState } from 'react';

const supabase = createClient('https://mqofvhzshrqzelpgfgts.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb2Z2aHpzaHJxemVscGdmZ3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4Nzc4OTUsImV4cCI6MjA0ODQ1Mzg5NX0.eUa5anQgMtyonSipKdeBF5hmZfHF1xl2_pH7mLQfxP4');

export default function ControlPage() {
  const [currentBatch, setBatchNumber] = useState(1);

  const handleNext = async () => {
    // Broadcast refresh event to all clients
    await supabase.channel('custom-channel').send({
      type: 'broadcast',
      event: 'refresh',
    });
    
    setBatchNumber(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Lab Queue Control</h1>
      <p className="text-gray-600">Current Batch: {currentBatch}</p>
      <Button 
        onClick={handleNext}
        className="px-6 py-3 text-lg"
      >
        Next Batch
      </Button>
    </div>
  );
}