import { Tooltip } from '@geist-ui/core';
import Image from 'next/image';
import Link from 'next/link';

const DashboardSideNav = () => {
      return (
            <div className="mini-sidebar">
                  <div className="website-logo">
                        <Link href="/dashboard">
                              <Image
                                    src="/helpin-svg.png"
                                    alt="Helpin"
                                    height={25}
                                    width={25}
                              />
                        </Link>
                  </div>

                  <div className="menu-icons">
                        <ul>
                              <li>
                                    <Tooltip
                                          text={
                                                <span style={{ fontSize: 13 }}>
                                                      Tickets
                                                </span>
                                          }
                                          placement="right"
                                          type="dark"
                                    >
                                          <Link href="/dashboard">
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
                                                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                                      />
                                                </svg>
                                          </Link>
                                    </Tooltip>
                              </li>
                              <li>
                                    <Tooltip
                                          text={
                                                <span style={{ fontSize: 13 }}>
                                                      Customers
                                                </span>
                                          }
                                          placement="right"
                                          type="dark"
                                    >
                                          <Link href="/customers">
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
                                                            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                                                      />
                                                </svg>
                                          </Link>
                                    </Tooltip>
                              </li>
                              <li>
                                    <Tooltip
                                          text={
                                                <span style={{ fontSize: 13 }}>
                                                      Files templates
                                                </span>
                                          }
                                          placement="right"
                                          type="dark"
                                    >
                                          <Link href="/files">
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
                                                            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                                                      />
                                                </svg>
                                          </Link>
                                    </Tooltip>
                              </li>
                              <li>
                                    <Tooltip
                                          text={
                                                <span style={{ fontSize: 13 }}>
                                                      Team members
                                                </span>
                                          }
                                          placement="right"
                                          type="dark"
                                    >
                                          <Link href="/teams">
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
                                                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                                      />
                                                </svg>
                                          </Link>
                                    </Tooltip>
                              </li>
                              <li>
                                    <Tooltip
                                          text={
                                                <span style={{ fontSize: 13 }}>
                                                      Integrations
                                                </span>
                                          }
                                          placement="right"
                                          type="dark"
                                    >
                                          <Link href="/integrations">
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
                                                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                                      />
                                                </svg>
                                          </Link>
                                    </Tooltip>
                              </li>
                              <li>
                                    <Tooltip
                                          text={
                                                <span style={{ fontSize: 13 }}>
                                                      Settings
                                                </span>
                                          }
                                          placement="right"
                                          type="dark"
                                    >
                                          <Link href="/settings">
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
                                                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                                                      />
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                      />
                                                </svg>
                                          </Link>
                                    </Tooltip>
                              </li>
                        </ul>
                  </div>
            </div>
      );
};

export default DashboardSideNav;
