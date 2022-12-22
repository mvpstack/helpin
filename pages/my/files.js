import { Button, Table, Text } from '@geist-ui/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthBox from '../../components/authBox';
import MiniSideNav from '../../components/miniSidebar';
import { contentTypeCheck, formatBytes } from '../../config/functions';
import { HiDocuText } from '../../config/icons';

const CustomerFiles = ({ assetsList, user }) => {
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

      const renderDate = (value, rowData, index) => {
            return moment(value).format('DD/MM/YYYY');
      };

      const renderSize = (value, rowData, index) => {
            return formatBytes(rowData.metadata.size);
      };

      const fileType = (value, rowData, index) => {
            return rowData.metadata.mimetype;
      };

      const renderFile = (value, rowData, index) => {
            const { id } = user;
            return (
                  <>
                        {contentTypeCheck(rowData.metadata.mimetype) ===
                              'image' && (
                              <div className="image">
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1}
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                          height="25px"
                                          width="25px"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                          />
                                    </svg>

                                    {/* https://cstvtjojcqfjvuiwcijp.supabase.co/storage/v1/object/public/assets/assets/${id}/${rowData.name} */}
                              </div>
                        )}{' '}
                        {contentTypeCheck(rowData.metadata.mimetype) ===
                              'doc' && (
                              <div className="image">
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1}
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                          height="25px"
                                          width="25px"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                          />
                                    </svg>
                              </div>
                        )}
                  </>
            );
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
                                                File Storage
                                          </Text>
                                          <Table data={assetsList}>
                                                <Table.Column
                                                      label="file"
                                                      render={renderFile}
                                                />
                                                <Table.Column
                                                      prop="name"
                                                      label="Name"
                                                />
                                                <Table.Column
                                                      prop="size"
                                                      label="size"
                                                      render={renderSize}
                                                />
                                                <Table.Column
                                                      prop="type"
                                                      label="type"
                                                      render={fileType}
                                                />
                                                <Table.Column
                                                      prop="created_at"
                                                      label="created_at"
                                                      render={renderDate}
                                                />
                                          </Table>
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default CustomerFiles;

export const getServerSideProps = async (ctx) => {
      // Create authenticated Supabase Client
      const supabase = createServerSupabaseClient(ctx);
      // Check if we have a session

      let assetsList = [];
      const {
            data: { session },
      } = await supabase.auth.getSession();
      const { user } = session;
      if (session) {
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
            const { data, error } = await supabase.storage
                  .from('assets')
                  .list(`assets/${user.id}`, {
                        limit: 100,
                        offset: 0,
                        sortBy: { column: 'created_at', order: 'asc' },
                  });

            assetsList = data;
      }

      return { props: { assetsList, user } };
};
