import { Avatar, Badge, Text } from '@geist-ui/core';
import moment from 'moment';
import Link from 'next/link';
import ReactCountryFlag from 'react-country-flag';

const CustomerList = ({ customerList, customer }) => {
      return (
            <>
                  {customerList.length > 0 ? (
                        <div className="customers-tab">
                              {customerList.map((c, key) => (
                                    <div
                                          className={
                                                customer === c.idString
                                                      ? 'acive-customer-tab customer'
                                                      : 'customer'
                                          }
                                          key={key}
                                    >
                                          <Link
                                                href={`/dashboard/${c.idString}`}
                                                className="card"
                                          >
                                                <div
                                                      className="user-svg"
                                                      style={{
                                                            backgroundColor:
                                                                  c.avatarColor,
                                                      }}
                                                >
                                                      <Badge.Anchor placement="bottomRight">
                                                            {c.ipInfo
                                                                  ?.countryCode && (
                                                                  <Badge
                                                                        style={{
                                                                              backgroundColor:
                                                                                    '#fff',
                                                                              padding: '1px 2px',
                                                                        }}
                                                                        title={
                                                                              c
                                                                                    .ipInfo
                                                                                    ?.country
                                                                        }
                                                                  >
                                                                        <ReactCountryFlag
                                                                              countryCode={
                                                                                    c
                                                                                          .ipInfo
                                                                                          ?.countryCode
                                                                              }
                                                                        />
                                                                  </Badge>
                                                            )}
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
                                                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                                                  />
                                                            </svg>
                                                      </Badge.Anchor>
                                                </div>

                                                <div className="metadata">
                                                      <Text
                                                            style={{
                                                                  fontSize: 14,
                                                                  margin: 0,
                                                                  fontWeight: 700,
                                                                  color: '#000',
                                                            }}
                                                      >
                                                            {c.idString}
                                                      </Text>
                                                      <Text
                                                            style={{
                                                                  fontSize: 11,
                                                                  margin: 0,
                                                            }}
                                                            small
                                                            type="secondary"
                                                      >
                                                            {moment(
                                                                  c.created_at
                                                            ).calendar()}
                                                      </Text>
                                                </div>
                                          </Link>
                                    </div>
                              ))}
                        </div>
                  ) : (
                        ''
                  )}
            </>
      );
};

export default CustomerList;
