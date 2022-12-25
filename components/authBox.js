import { Button, Input, Text } from '@geist-ui/core';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
const AuthBox = () => {
      const router = useRouter();
      const session = useSession();
      const supabase = useSupabaseClient();

      const [errorMessage, setErrorMessage] = useState('');
      const [isLoginBox, setIsLoginBox] = useState(true);
      return (
            <div className="auth-box">
                  <div className="auth-form form-dev">
                        <Text h4 style={{ maxWidth: 350 }}>
                              Hey 👋 Let{`'`}s start with your email
                        </Text>
                        {isLoginBox ? (
                              <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validate={(values) => {
                                          const errors = {};
                                          if (!values.email) {
                                                errors.email = 'Required';
                                          }
                                          if (!values.password) {
                                                errors.password = 'Required';
                                          } else if (
                                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                      values.email
                                                )
                                          ) {
                                                errors.email =
                                                      'Invalid email address';
                                          }
                                          return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                          setTimeout(async () => {
                                                const { data, error } =
                                                      await supabase.auth.signInWithPassword(
                                                            values
                                                      );

                                                if (error) {
                                                      const { message } =
                                                            JSON.parse(
                                                                  JSON.stringify(
                                                                        error
                                                                  )
                                                            );
                                                      setErrorMessage(message);
                                                } else {
                                                      router.push('/');
                                                }
                                                setSubmitting(false);
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
                                                      type="email"
                                                      name="email"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.email}
                                                      color="#eee"
                                                      placeholder="Email address"
                                                />
                                                <Text small type="secondary">
                                                      {errors.email &&
                                                            touched.email &&
                                                            errors.email}
                                                </Text>
                                                <input
                                                      type="password"
                                                      name="password"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.password}
                                                      placeholder="Password"
                                                />
                                                <Text small type="secondary">
                                                      {errors.password &&
                                                            touched.password &&
                                                            errors.password}
                                                </Text>

                                                <Button
                                                      htmlType="submit"
                                                      loading={isSubmitting}
                                                      disabled={isSubmitting}
                                                      type="secondary"
                                                      width="100%"
                                                      style={{
                                                            fontWeight: 700,
                                                            textTransform:
                                                                  'uppercase',
                                                      }}
                                                >
                                                      Login
                                                </Button>
                                                <br />
                                                <br />

                                                <Text small>
                                                      Don{`'`}t have an account
                                                      yet?{' '}
                                                      <u
                                                            onClick={() =>
                                                                  setIsLoginBox(
                                                                        !isLoginBox
                                                                  )
                                                            }
                                                      >
                                                            Sign up
                                                      </u>
                                                </Text>
                                                <br />
                                                <br />
                                                <Text small type="secondary">
                                                      {errorMessage}
                                                </Text>
                                          </form>
                                    )}
                              </Formik>
                        ) : (
                              <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validate={(values) => {
                                          const errors = {};
                                          if (!values.email) {
                                                errors.email = 'Required';
                                          } else if (
                                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                      values.email
                                                )
                                          ) {
                                                errors.email =
                                                      'Invalid email address';
                                          }
                                          return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                          setTimeout(async () => {
                                                const { data, error } =
                                                      await supabase.auth.signUp(
                                                            values
                                                      );

                                                if (error) {
                                                      const { message } =
                                                            JSON.parse(
                                                                  JSON.stringify(
                                                                        error
                                                                  )
                                                            );
                                                      setErrorMessage(message);
                                                } else {
                                                      router.push('/');
                                                }
                                                setSubmitting(false);
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
                                                      type="email"
                                                      name="email"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.email}
                                                      color="#eee"
                                                      placeholder="Email address"
                                                />
                                                <Text small>
                                                      {errors.email &&
                                                            touched.email &&
                                                            errors.email}
                                                </Text>
                                                <input
                                                      type="password"
                                                      name="password"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.password}
                                                      placeholder="Password"
                                                />
                                                <Text small>
                                                      {errors.password &&
                                                            touched.password &&
                                                            errors.password}
                                                </Text>

                                                <Button
                                                      htmlType="submit"
                                                      loading={isSubmitting}
                                                      disabled={isSubmitting}
                                                      type="secondary"
                                                      width="100%"
                                                      style={{
                                                            fontWeight: 700,
                                                            textTransform:
                                                                  'uppercase',
                                                      }}
                                                >
                                                      Get Started
                                                </Button>
                                                <br />
                                                <br />

                                                <Text small>
                                                      I already have an account
                                                      —{' '}
                                                      <u
                                                            onClick={() =>
                                                                  setIsLoginBox(
                                                                        !isLoginBox
                                                                  )
                                                            }
                                                      >
                                                            Sign in
                                                      </u>
                                                </Text>
                                                <br />
                                                <br />
                                                <Text small type="secondary">
                                                      {errorMessage}
                                                </Text>
                                          </form>
                                    )}
                              </Formik>
                        )}
                  </div>
            </div>
      );
};

export default AuthBox;
