import { Button, Text } from '@geist-ui/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthBox from '../../components/authBox';
import MiniSideNav from '../../components/miniSidebar';

const CustomerSettings = ({ ticketList }) => {
      const session = useSession();
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const supabase = useSupabaseClient();

      const createNewTicket = async () => {
            if (session) {
                  setLoading(true);
                  const { user } = session;
                  const { data: newTicket, error } = await supabase
                        .from('tickets')
                        .upsert({ userId: user.id, id: randomString(6, '#') })
                        .select();
                  if (!error) router.push(`/tickets/${newTicket[0].id}`);
                  setLoading(false);
            }
      };

      return (
            <div className="dashboard">
                  <div>
                        <Head>
                              <title>Chat</title>
                              <link rel="icon" href="/favicon.png" />
                        </Head>

                        {!session ? (
                              <AuthBox />
                        ) : (
                              <div
                                    className="chat-container"
                                    style={{ height: '100vh' }}
                              >
                                    <MiniSideNav />

                                    <div className="chat-box">
                                          <Text h4 style={{ fontWeight: 500 }}>
                                                Setting Page
                                          </Text>
                                          Work in progress
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default CustomerSettings;

export const getServerSideProps = async (ctx) => {
      // Create authenticated Supabase Client
      const supabase = createServerSupabaseClient(ctx);
      // Check if we have a session

      let ticketList = [];
      const {
            data: { session },
      } = await supabase.auth.getSession();
      if (session) {
            const { user } = session;

            const { data: userObj, error: userError } = await supabase
                  .from('users')
                  .select(`email,id,role`)
                  .eq('id', user.id)
                  .single();
            const { role } = userObj;
            if (role !== 'customer')
                  return {
                        redirect: {
                              destination: '/dashboard',
                              permanent: false,
                        },
                  };

            const { data, error } = await supabase
                  .from('tickets')
                  .select(`*`)
                  .eq('userId', user.id);
            ticketList = data;
      }

      return { props: { ticketList } };
};
