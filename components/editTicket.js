import { Button, Modal, Text } from '@geist-ui/core';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Formik } from 'formik';
import { useState } from 'react';
import { HiEdit } from '../config/icons';

const EditTicket = ({ ticketObj, triggerUpdate }) => {
      const [state, setState] = useState(false);
      const supabase = useSupabaseClient();
      const [errorMessage, setErrorMessage] = useState('');
      const handler = () => setState(true);
      const closeHandler = (event) => {
            setState(false);
      };
      return (
            <>
                  <span
                        style={{
                              cursor: 'pointer',
                        }}
                        onClick={handler}
                  >
                        <HiEdit />
                  </span>
                  <Modal visible={state} onClose={closeHandler}>
                        <Modal.Content>
                              <Text h4 style={{ fontWeight: 500 }}>
                                    Give a suitable name to this ticket.
                              </Text>
                              <Formik
                                    initialValues={ticketObj}
                                    validate={(values) => {
                                          const errors = {};
                                          if (!values.title) {
                                                errors.title = 'Required';
                                          }
                                          return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                          setTimeout(async () => {
                                                const { title, id } = values;
                                                const { data, error } =
                                                      await supabase
                                                            .from('tickets')
                                                            .update({
                                                                  title,
                                                            })
                                                            .eq('id', id);
                                                if (error) {
                                                      const { message } =
                                                            JSON.parse(
                                                                  JSON.stringify(
                                                                        error
                                                                  )
                                                            );
                                                      setErrorMessage(message);
                                                } else {
                                                      triggerUpdate(values);
                                                }
                                                setSubmitting(false);
                                                setState(false);
                                          }, 400);
                                    }}
                              >
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                          isSubmitting,
                                          /* and other goodies */
                                    }) => (
                                          <form onSubmit={handleSubmit}>
                                                <input
                                                      type="text"
                                                      name="title"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.title}
                                                      color="#eee"
                                                      placeholder="Email address"
                                                />
                                                <Text small type="secondary">
                                                      {errors.title &&
                                                            touched.title &&
                                                            errors.title}
                                                </Text>
                                                <br />
                                                <br />

                                                <Button
                                                      htmlType="submit"
                                                      loading={isSubmitting}
                                                      disabled={isSubmitting}
                                                      width="100%"
                                                      type="secondary"
                                                      style={{
                                                            fontWeight: 500,
                                                      }}
                                                      scale={2 / 3}
                                                >
                                                      <HiEdit /> Change ticket
                                                      name
                                                </Button>
                                                <br />
                                                <Text small type="secondary">
                                                      {errorMessage}
                                                </Text>
                                          </form>
                                    )}
                              </Formik>
                        </Modal.Content>
                  </Modal>
            </>
      );
};

export default EditTicket;
