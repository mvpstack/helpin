import { Button, Text } from '@geist-ui/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthBox from '../components/authBox';
import MiniSideNav from '../components/miniSidebar';
import { randomString } from '../config/functions';
import TicketList from '../components/ticketList';

const HandlePage = ({ ticketList }) => {
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
                                                Hi! Looking good. 😊
                                          </Text>
                                          <Button
                                                onClick={createNewTicket}
                                                loading={loading}
                                                icon={
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                                            />
                                                      </svg>
                                                }
                                                scale={2 / 3}
                                          >
                                                ASK ANYTHING
                                          </Button>

                                          <br />
                                          <br />

                                          <TicketList
                                                customerTickets={ticketList}
                                          />
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default HandlePage;

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
            const role = userObj?.role;
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
