"use client";
import { useEffect, useRef } from 'react';
import { useCartStore } from '@/context/cartStore';
import { useUser } from '@/hooks/useUser';
import { supabaseClient } from '@/lib/supabase/client';

export function CartSyncClient() {
  const user = useUser();
  const items = useCartStore((s) => s.items);
  const setFromServer = useRef(false);
  const clear = useCartStore((s) => s.clear);
  const addItem = useCartStore((s) => s.addItem);

  // On sign-in, fetch server cart once and merge/replace
  useEffect(() => {
    const fn = async () => {
      if (!supabaseClient || !user?.id || setFromServer.current) return;
      const { data } = await supabaseClient.from('carts').select('items').eq('userId', user.id).maybeSingle();
      const serverItems = (data as any)?.items as { product: any; quantity: number }[] | undefined;
      if (serverItems && serverItems.length) {
        clear();
        for (const ci of serverItems) addItem(ci.product, ci.quantity);
      } else if (items.length) {
        await supabaseClient.from('carts').upsert({ userId: user.id, items });
      }
      setFromServer.current = true;
    };
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Push on changes
  useEffect(() => {
    const push = async () => {
      if (!supabaseClient || !user?.id) return;
      await supabaseClient.from('carts').upsert({ userId: user.id, items });
    };
    push();
  }, [items, user?.id]);

  return null;
}
