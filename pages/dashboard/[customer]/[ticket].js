import { Avatar, Grid, Input, Text } from '@geist-ui/core';
import {
      createBrowserSupabaseClient,
      createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Empty from '../../../components/empty';
import Layout from '../../../components/layout';
import DashboardSideNav from '../../../components/dashboardSideNav';
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import { randomString } from '../../../config/functions';
import ChatMessages from '../../../components/ChatMessages';
import TicketInfoForm from '../../../components/ticketInfoForm';
import CustomerList from '../../../components/customerList';
import { HiEdit } from '../../../config/icons';
import EditTicket from '../../../components/editTicket';
import UploadAvatar from '../../../components/assetsUpload';

const WebsiteDashboard = ({
      customer,
      ticket,
      customerList,
      customerTickets,
      ticketObjData,
      ticketMessagesList,
}) => {
      const messagesRef = useRef(null);
      const [supabase] = useState(() => createBrowserSupabaseClient());
      const [message, setMessage] = useState('');
      const [messagesList, setMessagesList] = useState(ticketMessagesList);
      const session = useSession();
      const [ticketObj, setTicketObj] = useState(ticketObjData);

      const cIndex = customerList.findIndex((x) => x.idString === customer);

      const activeCustomerObj = customerList[cIndex];

      const sendMessage = async (e) => {
            const { user } = session;

            if (user && message !== '' && e.key === 'Enter') {
                  const { data: newMessage, error } = await supabase
                        .from('ticketMessages')
                        .insert({
                              id: randomString(12, '#'),
                              message,
                              type: 'text',
                              userId: user.id,
                              userType: 'owner',
                              ticketId: ticket,
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
                  (payload) => {
                        setMessagesList((current) => [...current, payload.new]);
                        // if (messagesRef.current) {
                        //       messagesRef.current.scrollTop =
                        //             messagesRef.current.scrollHeight;
                        // }
                  }
            );

            channel.subscribe(async (status) => {
                  console.log(status);
            });

            return () => {
                  supabase.removeChannel(channel);
            };
      }, []);

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
                              userType: 'owner',
                              ticketId: ticket,
                              filePath,
                        })
                        .select();
                  // if (!error) setMessagesList([...messagesList, ...newMessage]);

                  setMessage('');
            }
      };

      return (
            <>
                  <Head>
                        <title>Dashboard</title>
                        <link rel="icon" href="/favicon.png" />
                  </Head>
                  <div className="dashboard">
                        <div className="chat-container">
                              <DashboardSideNav active="dashboard" />
                              <Grid.Container>
                                    <Grid xs={24} md={6} xl={4}>
                                          <CustomerList
                                                customer={customer}
                                                customerList={customerList}
                                          />
                                    </Grid>
                                    <Grid
                                          xs={24}
                                          md={13}
                                          xl={16}
                                          className="chat-container-dash"
                                    >
                                          <div className="chat-box-dash dashboard-chat">
                                                <div className="chat-head">
                                                      <div className="ticket-meta">
                                                            <Text h3>
                                                                  <span>
                                                                        {
                                                                              ticketObj.title
                                                                        }
                                                                  </span>
                                                                  <EditTicket
                                                                        ticketObj={
                                                                              ticketObj
                                                                        }
                                                                        triggerUpdate={(
                                                                              obj
                                                                        ) =>
                                                                              setTicketObj(
                                                                                    obj
                                                                              )
                                                                        }
                                                                  />
                                                            </Text>
                                                      </div>
                                                      <div className="ticket-support-team">
                                                            <Avatar.Group
                                                                  count={2}
                                                            >
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
                                                            publicChat={false}
                                                            messagesList={
                                                                  messagesList
                                                            }
                                                      />
                                                </div>
                                                <div className="chat-message-input">
                                                      <div className="message-form">
                                                            <div className="file-attach">
                                                                  <UploadAvatar
                                                                        uid={
                                                                              session
                                                                                    ?.user
                                                                                    .id
                                                                        }
                                                                        onUpload={
                                                                              onUpload
                                                                        }
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <Input
                                                                        placeholder="Type a message"
                                                                        width="100%"
                                                                        value={
                                                                              message
                                                                        }
                                                                        onChange={(
                                                                              e
                                                                        ) =>
                                                                              setMessage(
                                                                                    e
                                                                                          .target
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
                                    </Grid>
                                    <Grid xs={24} md={5} xl={4}>
                                          <TicketInfoForm
                                                activeCustomerObj={
                                                      activeCustomerObj
                                                }
                                          />
                                    </Grid>
                              </Grid.Container>
                        </div>
                  </div>
            </>
      );
};

export default WebsiteDashboard;

export const getServerSideProps = async (ctx) => {
      const { customer, ticket } = ctx.query;
      // Create authenticated Supabase Client
      const supabase = createServerSupabaseClient(ctx);
      // Check if we have a session
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

      // Retrieve provider_token & logged in user's third-party id from metadata
      const { user } = session;

      let customerList = [];

      // const { data: webObj, error } = await supabase
      //       .from('websites')
      //       .select(`*`)
      //       .eq('wid', websiteId)
      //       .single();

      const { data, error } = await supabase.from('users').select(`*`);
      customerList = data;

      const customerIndex = customerList.findIndex(
            (x) => x.idString === customer
      );

      const customerSessionIndex = customerList.findIndex(
            (x) => x.id === user.id
      );
      const { id } = customerList[customerIndex];
      const { role } = customerList[customerSessionIndex];

      if (role === 'customer')
            return {
                  redirect: {
                        destination: '/',
                        permanent: false,
                  },
            };

      const { data: customerTickets, error: errorOnTickets } = await supabase
            .from('tickets')
            .select(`*`)
            .eq('userId', id);

      const { data: ticketObjData, error: ticketError } = await supabase
            .from('tickets')
            .select(`*`)
            .eq('id', ticket)
            .single();

      let ticketMessagesList = [];

      const { data: messagesArray, error: errorMessages } = await supabase
            .from('ticketMessages')
            .select(`*`)
            .eq('ticketId', ticket);
      if (data) ticketMessagesList = messagesArray;

      return {
            props: {
                  customerList,
                  customer,
                  customerTickets,
                  ticket,
                  ticketMessagesList,
                  ticketObjData,
            },
      };
};
