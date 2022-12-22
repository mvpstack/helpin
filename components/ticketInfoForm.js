import { Button, Divider, Text, User } from '@geist-ui/core';
import { Formik } from 'formik';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
      HiLocation,
      HiClock,
      HiFlag,
      HiTrash,
      HiUserPlus,
      HiTicket,
} from '../config/icons';
import CreateTicket from './createTicketForCustomer';

const TicketInfoForm = ({ activeCustomerObj }) => {
      const [errorMessage, setErrorMessage] = useState('');
      return (
            <div className="ticket-info-form">
                  <User
                        text="A"
                        name={activeCustomerObj.idString}
                        style={{ padding: '20px 0px' }}
                  >
                        {activeCustomerObj.email}
                  </User>

                  <div className="svg-span">
                        <HiLocation />
                        <span>
                              {activeCustomerObj.ipInfo.state},{' '}
                              {activeCustomerObj.ipInfo.country}
                        </span>
                  </div>
                  <div className="svg-span">
                        <HiClock />
                        <span>{activeCustomerObj.ipInfo.timeZone}</span>
                  </div>
                  <div className="svg-span">
                        <HiFlag />
                        <span>
                              <ReactCountryFlag
                                    countryCode={
                                          activeCustomerObj.ipInfo?.countryCode
                                    }
                              />
                        </span>
                  </div>
                  <br />
                  <CreateTicket
                        btnType="primary"
                        activeCustomerObj={activeCustomerObj}
                  />
                  <Text h4 style={{ fontWeight: 500 }} mb={0}>
                        Team members
                  </Text>
                  <div className="team-member">
                        <User
                              src="https://static.generated.photos/vue-static/home/hero/3.png"
                              name="Witt"
                        />
                        <HiTrash />
                  </div>
                  <div className="team-member">
                        <User
                              src="https://static.generated.photos/vue-static/home/hero/3.png"
                              name="Witt"
                        />
                        <HiTrash />
                  </div>
                  <Text
                        small
                        type="secondary"
                        style={{
                              textDecoration: 'underline',
                              cursor: 'pointer',
                        }}
                        className="svg-span"
                  >
                        <HiUserPlus /> <span>Add a team member</span>
                  </Text>
            </div>
      );
};

export default TicketInfoForm;
