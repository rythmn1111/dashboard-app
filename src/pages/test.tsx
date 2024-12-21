'use client';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui

const supabase = createClient('https://mqofvhzshrqzelpgfgts.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb2Z2aHpzaHJxemVscGdmZ3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4Nzc4OTUsImV4cCI6MjA0ODQ1Mzg5NX0.eUa5anQgMtyonSipKdeBF5hmZfHF1xl2_pH7mLQfxP4');

export default function DisplayPage() {
  const [currentNumbers, setCurrentNumbers] = useState<number[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  const fetchNumbers = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('en_number')
      .range(startIndex, startIndex + 3)
      .order('id', { ascending: true });

    if (data) {
      setCurrentNumbers(data.map(item => item.en_number));
    }
  };

  const handleNext = () => {
    setStartIndex(prev => prev + 4);
  };

  useEffect(() => {
    fetchNumbers();

    const channel = supabase
      .channel('custom-channel')
      .on('broadcast', { event: 'refresh' }, () => {
        fetchNumbers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [startIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-8">CN VIVA!!!!!!!!</h1>
      <h1 className="text-3xl font-bold mb-8">Next Students Go To Lab</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {currentNumbers.map((number, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow-lg text-2xl font-bold text-center min-w-[150px] text-black"
          >
            {number}
          </div>
        ))}
      </div>
      <Button 
        onClick={handleNext}
        className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg font-semibold"
      >
        Next 4 Students
      </Button>
    </div>
  );
}