"use client";

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function RealtimeOpps() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('realtime_opportunities')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'opportunities',
        },
        (payload) => {
          console.log('New opportunity received!', payload);
          
          toast.success("New Opportunity Found", {
            description: payload.new.title,
            action: {
              label: "Refresh Feed",
              onClick: () => router.refresh(),
            },
            duration: 10000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return null; // This component doesn't render anything visible
}
