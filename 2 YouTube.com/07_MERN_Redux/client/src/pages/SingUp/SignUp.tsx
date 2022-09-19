import React from "react";
import { Grid, Heading, Stack } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { useSignupUserMutation } from "../../redux/api/authApi";

const SignUp = (): JSX.Element => {
  const [signupUser, { data, isLoading, isSuccess }] = useSignupUserMutation();
  console.info({ data, isSuccess });
  // console.info({ isLoading });

  const navigate = useNavigate();
  const toast = useToast();

  return (
    <React.Fragment>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => {
          // console.info({ values });
          signupUser({ ...values });
          // alert("You will be redirected to the SignIn Page");
          toast({
            title: "You will be redirected to the SignIn Page",
            description: "Please SignIn",
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          setTimeout(() => {
            navigate("/signin", {});
          }, 500);
        }}
      >
        <Form>
          <Grid h="100vh" placeItems="center">
            <Stack p="4" boxShadow="xl" borderRadius="md">
              <Heading color="teal" textAlign="center" fontSize="lg" fontWeight="semibold">
                Signup
              </Heading>
              <InputControl
                name="name"
                label="Name"
                inputProps={{
                  placeholder: "Enter Name...",
                }}
              />
              <InputControl
                name="email"
                label="Email"
                inputProps={{
                  type: "email",
                  placeholder: "Enter Email...",
                }}
              />
              <InputControl
                name="password"
                label="Password"
                inputProps={{
                  placeholder: "Enter Password...",
                  type: "password",
                }}
              />
              <SubmitButton isLoading={isLoading}>Signup</SubmitButton>
            </Stack>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default SignUp;
