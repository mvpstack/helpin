import Head from 'next/head';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Select, Button, Text, Grid } from '@geist-ui/core';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import { HiGlobe } from 'react-icons/hi';

export default function Layout({ children, home, title, websites }) {
      const [projectsList, setProjectsList] = useState([]);
      const [activeProjectId, setActiveProjectId] = useState(null);
      const supabase = useSupabaseClient();

      const signInWithGitHub = async (evt) => {
            evt.preventDefault();
            const { user, error } = await supabase.auth.signInWithOAuth({
                  provider: 'github',
                  options: {
                        scopes: 'repo',
                        queryParams: {
                              access_type: 'offline',
                        },
                  },
            });
      };

      const handlerProjectChange = (pId) => {
            setActiveProjectId(pId);
            // navigate(`/projects/${pId}`);
            localStorage.setItem('activeWebsite', pId);
      };

      return (
            <div>
                  <Head>
                        <title>{title}</title>
                        <link rel="icon" href="/favicon.png" />
                  </Head>

                  <header className="header">
                        <div
                              className="header-inner"
                              style={
                                    home && {
                                          maxWidth: 1200,
                                          margin: '0 auto',
                                    }
                              }
                        >
                              <div
                                    style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gridGap: 30,
                                    }}
                              >
                                    <div className="logo">
                                          <Link href="/dashboard">
                                                <Image
                                                      src="/helpin-svg.png"
                                                      alt="Helpin"
                                                      height={25}
                                                      width={25}
                                                />
                                                <Text h4>Helpin</Text>
                                          </Link>
                                    </div>
                              </div>
                              <div className="header-menu">
                                    <div className="menu-item">
                                          {/* <Link href="/projects/create">
                                                      <Button
                                                            width="170px"
                                                            scale={2 / 3}
                                                            type="secondary"
                                                      >
                                                            Create new project
                                                      </Button>
                                                </Link> */}
                                    </div>
                              </div>
                        </div>
                  </header>
                  <div className="main-container">{children}</div>
            </div>
      );
}
