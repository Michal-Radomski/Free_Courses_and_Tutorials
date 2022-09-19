import React from "react";
import { Grid, Heading, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { useParams } from "react-router-dom";

import { useResetPasswordMutation } from "../../redux/api/authApi";
import { CustomError } from "../../Interfaces";

const ChangePassword = (): JSX.Element => {
  const { token } = useParams();
  const toast = useToast();
  // console.info({ token });

  const [resetPassword, { data, isError, isLoading, error, isSuccess }] = useResetPasswordMutation();

  React.useEffect(() => {
    if (isError) {
      toast({
        title: (error as CustomError).data?.message,
        status: "error",
        duration: 5000,
      });
    }
    console.info(data);
    if (isSuccess) {
      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 5000,
      });
    }
  });

  return (
    <React.Fragment>
      <Formik
        initialValues={{ password: "" }}
        onSubmit={(values) => {
          if (token) resetPassword({ ...values, token });
        }}
      >
        <Form>
          <Grid h="100vh" placeItems="center">
            <Stack p="4" boxShadow="xl" borderRadius="md">
              <Heading color="teal" textAlign="center" fontSize="lg" fontWeight="semibold">
                Forgot Password
              </Heading>
              <InputControl
                name="password"
                label="Password"
                inputProps={{
                  placeholder: "Enter Password...",
                  type: "password",
                }}
              />

              <SubmitButton isLoading={isLoading}>Change Password</SubmitButton>
            </Stack>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default ChangePassword;
