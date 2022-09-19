import React from "react";
import { Grid, Heading, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
// import { useLocation } from "react-router-dom";

import { useSendMailForgotPasswordMutation } from "../../redux/api/authApi";
import { CustomError } from "../../Interfaces";

const ForgotPassword = (): JSX.Element => {
  // const location = useLocation();
  // console.info({ location });

  const toast = useToast();

  const [sendMail, { isLoading, data, isError, error }] = useSendMailForgotPasswordMutation();
  if (isError) {
    toast({
      title: (error as CustomError).data?.message,
      status: "error",
      duration: 5000,
    });
  }
  console.info({ data });

  return (
    <React.Fragment>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          console.info(values);
          sendMail({ ...values });
        }}
      >
        <Form>
          <Grid h="100vh" placeItems="center">
            <Stack p="4" boxShadow="xl" borderRadius="md">
              <Heading color="teal" textAlign="center" fontSize="lg" fontWeight="semibold">
                Forgot Password
              </Heading>
              <InputControl
                name="email"
                label="Email"
                inputProps={{
                  type: "email",
                  placeholder: "Enter Email...",
                }}
              />

              <SubmitButton isLoading={isLoading}>Send Mail</SubmitButton>
            </Stack>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default ForgotPassword;
