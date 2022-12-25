import { Avatar, Grid, Text } from '@geist-ui/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import DashboardSideNav from '../../components/dashboardSideNav';
import CustomerList from '../../components/customerList';
import Head from 'next/head';

const Dashboard = ({ customerList }) => {
      const session = useSession();
      return (
            <>
                  <Head>
                        <title>Dashboard</title>
                        <link rel="icon" href="/favicon.png" />
                  </Head>
                  <div className="dashboard">
                        <div className="chat-container">
                              <DashboardSideNav active="dashboard" />
                              <Grid.Container gap={4}>
                                    <Grid xs={24} md={6} xl={4}>
                                          <CustomerList
                                                customerList={customerList}
                                          />
                                    </Grid>
                                    <Grid xs={24} md={17}>
                                          <Text h4>
                                                Welcome back to work. 👋
                                          </Text>
                                    </Grid>
                              </Grid.Container>
                        </div>
                  </div>
            </>
      );
};

export default Dashboard;

export const getServerSideProps = async (ctx) => {
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
      let customerList = [];
      // Retrieve provider_token & logged in user's third-party id from metadata
      const { user } = session;

      const { data: userObj, error: userError } = await supabase
            .from('users')
            .select(`email,id,role`)
            .eq('id', user.id)
            .single();
      const role = userObj?.role;
      if (role === 'customer')
            return {
                  redirect: {
                        destination: '/',
                        permanent: false,
                  },
            };

      const { data, error } = await supabase.from('users').select(`*`);

      customerList = data;

      return { props: { customerList } };
};
