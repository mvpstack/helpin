import { Avatar, Grid, Input, Text } from '@geist-ui/core';
import {
      createBrowserSupabaseClient,
      createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import UploadAvatar from '../../components/assetsUpload';
import ChatMessages from '../../components/ChatMessages';
import MiniSideNav from '../../components/miniSidebar';
import { randomString } from '../../config/functions';

const HandlePage = ({ ticket, ticketMessagesList, ticketObj }) => {
      const messagesRef = useRef(null);
      const [supabase] = useState(() => createBrowserSupabaseClient());
      const [message, setMessage] = useState('');
      const [messagesList, setMessagesList] = useState(ticketMessagesList);
      const session = useSession();

      const sendMessage = async (e) => {
            const { user } = session;

            if (user && message !== '' && e.key === 'Enter') {
                  const { data: newMessage, error } = await supabase
                        .from('ticketMessages')
                        .upsert({
                              id: randomString(12, '#'),
                              message,
                              type: 'text',
                              userId: user.id,
                              userType: 'customer',
                              ticketId: ticket,
                        })
                        .select();
                  // if (!error) setMessagesList([...messagesList, ...newMessage]);

                  setMessage('');
            }
      };

      const onUpload = async (filePath, fileObj) => {
            const { user } = session;

            if (user) {
                  const { data: newMessage, error } = await supabase
                        .from('ticketMessages')
                        .upsert({
                              id: randomString(12, '#'),
                              message: fileObj.name,
                              type: fileObj.type,
                              userId: user.id,
                              userType: 'customer',
                              ticketId: ticket,
                              filePath,
                        })
                        .select();
                  // if (!error) setMessagesList([...messagesList, ...newMessage]);

                  setMessage('');
            }
      };

      useEffect(() => {
            if (messagesRef.current) {
                  messagesRef.current.scrollTop =
                        messagesRef.current.scrollHeight + 400;
            }
      }, [messagesList]);

      // Load initial data and set up listeners
      useEffect(() => {
            // Listen for new and deleted messages

            const channel = supabase.channel('ticketMessages');

            channel.on(
                  'postgres_changes',
                  {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'ticketMessages',
                        filter: `ticketId=eq.${ticket}`,
                  },
                  (payload) =>
                        setMessagesList((current) => [...current, payload.new])
            );

            channel.subscribe(async (status) => {
                  console.log(status);
            });

            return () => {
                  supabase.removeChannel(channel);
            };
      }, []);

      return (
            <div className="dashboard">
                  <div>
                        <Head>
                              <title>{ticket}</title>
                              <link rel="icon" href="/favicon.png" />
                        </Head>

                        <div className="chat-container">
                              <MiniSideNav />

                              <div className="chat-box">
                                    <div className="chat-head">
                                          <div className="ticket-meta">
                                                <Text
                                                      h3
                                                      style={{
                                                            fontWeight: 500,
                                                      }}
                                                >
                                                      {ticketObj.title}
                                                </Text>
                                          </div>
                                          <div className="ticket-support-team">
                                                <Avatar.Group count={2}>
                                                      <Avatar
                                                            src="https://static.generated.photos/vue-static/home/hero/3.png"
                                                            stacked
                                                      />
                                                      <Avatar
                                                            src="https://static.generated.photos/vue-static/home/hero/5.png"
                                                            stacked
                                                      />
                                                      <Avatar
                                                            src="https://static.generated.photos/vue-static/home/hero/6.png"
                                                            stacked
                                                      />
                                                </Avatar.Group>
                                          </div>
                                    </div>
                                    <div
                                          style={{
                                                height: 'calc(100vh - 150px)',
                                                padding: '0px 20px',
                                                overflowY: 'scroll',
                                          }}
                                          ref={messagesRef}
                                    >
                                          <ChatMessages
                                                publicChat={true}
                                                messagesList={messagesList}
                                          />
                                    </div>
                                    <div className="chat-message-input">
                                          <div className="message-form">
                                                <div className="file-attach">
                                                      <UploadAvatar
                                                            uid={
                                                                  session?.user
                                                                        .id
                                                            }
                                                            onUpload={onUpload}
                                                      />
                                                </div>
                                                <div>
                                                      <Input
                                                            placeholder="Type a message"
                                                            width="100%"
                                                            value={message}
                                                            onChange={(e) =>
                                                                  setMessage(
                                                                        e.target
                                                                              .value
                                                                  )
                                                            }
                                                            onKeyDown={
                                                                  sendMessage
                                                            }
                                                            iconRight={
                                                                  <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                              1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-6 h-6"
                                                                  >
                                                                        <path
                                                                              strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                                                        />
                                                                  </svg>
                                                            }
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default HandlePage;

export const getServerSideProps = async (ctx) => {
      const { ticket } = ctx.query;
      const supabase = createServerSupabaseClient(ctx);

      const {
            data: { session },
      } = await supabase.auth.getSession();
      if (!session)
            return {
                  redirect: {
                        destination: '/',
                        permanent: false,
                  },
            };
      let ticketMessagesList = [];

      const { data: ticketObj, error: ticketError } = await supabase
            .from('tickets')
            .select(`*`)
            .eq('id', ticket)
            .single();

      const { data, error } = await supabase
            .from('ticketMessages')
            .select(`*`)
            .eq('ticketId', ticket);
      if (data) ticketMessagesList = data;
      return { props: { ticket, ticketMessagesList, ticketObj } };
};
