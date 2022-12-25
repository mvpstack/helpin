import { Grid, Text } from '@geist-ui/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Empty from '../components/empty';
import Layout from '../components/layout';
import DashboardSideNav from '../components/dashboardSideNav';

const Teams = () => {
      const session = useSession();
      return (
            <div className="dashboard">
                  <div className="chat-container">
                        <DashboardSideNav active="teams" />

                        <Grid.Container gap={2}>
                              <Grid xs={20} md={20}>
                                    <Text h2>Teams</Text>
                              </Grid>
                        </Grid.Container>
                  </div>
            </div>
      );
};

export default Teams;

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

      // Retrieve provider_token & logged in user's third-party id from metadata
      const { user } = session;

      return { props: { user } };
};
