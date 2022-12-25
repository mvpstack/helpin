import { Button, Grid, Text } from '@geist-ui/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Empty from '../../../components/empty';
import Layout from '../../../components/layout';
import DashboardSideNav from '../../../components/dashboardSideNav';
import moment from 'moment';
import ReactCountryFlag from 'react-country-flag';
import CustomerList from '../../../components/customerList';
import TicketInfoForm from '../../../components/ticketInfoForm';
import { HiMessages, HiTicket } from '../../../config/icons';
import CreateTicket from '../../../components/createTicketForCustomer';
import TicketList from '../../../components/ticketList';

const WebsiteDashboard = ({
      customer,
      customerList,
      customerTickets,
      activeCustomerObj,
}) => {
      const session = useSession();
      return (
            <div className="dashboard">
                  <div className="chat-container">
                        <DashboardSideNav active="dashboard" />
                        <Grid.Container gap={1}>
                              <Grid xs={24} md={6} xl={4}>
                                    <CustomerList
                                          customerList={customerList}
                                          customer={customer}
                                    />
                              </Grid>
                              <Grid xs={24} md={13} xl={16}>
                                    {customerTickets.length > 0 ? (
                                          <div className="ticket-container dashboard-chat">
                                                <br />
                                                <CreateTicket
                                                      btnType="primary"
                                                      activeCustomerObj={
                                                            activeCustomerObj
                                                      }
                                                />
                                                <br />
                                                <br />
                                                <TicketList
                                                      customerTickets={
                                                            customerTickets
                                                      }
                                                      customer={customer}
                                                />
                                                <div className="history">
                                                      <Text
                                                            mt={0}
                                                            mb={0}
                                                            style={{
                                                                  fontWeight: 500,
                                                            }}
                                                      >
                                                            SHOW HISTORY
                                                      </Text>
                                                </div>
                                          </div>
                                    ) : (
                                          <>
                                                <Empty
                                                      hrefPath="/dashboard"
                                                      title="There no ticket for this customer."
                                                      description="Account created "
                                                      icon={<HiMessages />}
                                                      secondButton={
                                                            <CreateTicket
                                                                  btnType="secondary"
                                                                  activeCustomerObj={
                                                                        activeCustomerObj
                                                                  }
                                                            />
                                                      }
                                                />
                                          </>
                                    )}
                              </Grid>
                              <Grid xs={24} md={5} xl={4}>
                                    <TicketInfoForm
                                          activeCustomerObj={activeCustomerObj}
                                    />
                              </Grid>
                        </Grid.Container>
                  </div>
            </div>
      );
};

export default WebsiteDashboard;

export const getServerSideProps = async (ctx) => {
      const { customer } = ctx.query;
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

      const activeCustomerObj = customerList[customerIndex];
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
      return {
            props: {
                  customerList,
                  customer,
                  customerTickets,
                  activeCustomerObj,
            },
      };
};
