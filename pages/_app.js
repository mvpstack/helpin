import '../styles/globals.scss';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useEffect, useRef, useState } from 'react';
import { randomColor, randomString } from '../config/functions';
import { useRouter } from 'next/router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }) {
      const [supabase] = useState(() => createBrowserSupabaseClient());
      const router = useRouter();

      const dataFetchedRef = useRef(false);

      useEffect(() => {
            const handleStart = (url) => {
                  NProgress.start();
            };

            const handleStop = () => {
                  NProgress.done();
            };

            router.events.on('routeChangeStart', handleStart);
            router.events.on('routeChangeComplete', handleStop);
            router.events.on('routeChangeError', handleStop);

            return () => {
                  router.events.off('routeChangeStart', handleStart);
                  router.events.off('routeChangeComplete', handleStop);
                  router.events.off('routeChangeError', handleStop);
            };
      }, [router]);

      useEffect(() => {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            checkUser();
      });
      async function checkUser() {
            // const { data } = await supabase.auth.getUser();
            const { data: userSession } = await supabase.auth.getSession();
            if (userSession?.session) {
                  const { user } = userSession?.session;
                  const { data: users, error } = await supabase
                        .from('users')
                        .select(`email,id`)
                        .eq('id', user.id)
                        .single();
                  if (!users) {
                        let ipInfo = {};

                        try {
                              const res = await fetch(`/api/ipInfo`, {
                                    method: 'GET',
                              });
                              const data = await res.json();
                              ipInfo = data;
                        } catch (err) {
                              console.log('No ip info');
                        }

                        const { data: newUserObj, error } = await supabase
                              .from('users')
                              .upsert({
                                    id: user.id,
                                    email: user.email,
                                    ipInfo,
                                    idString: randomString(8, 'a#'),
                                    avatarColor: randomColor(),
                              })
                              .select();
                  }
            }
      }

      return (
            <GeistProvider themeType="light">
                  <CssBaseline />
                  <SessionContextProvider
                        supabaseClient={supabase}
                        initialSession={pageProps.initialSession}
                  >
                        <Component {...pageProps} />
                  </SessionContextProvider>
            </GeistProvider>
      );
}
export default MyApp;
