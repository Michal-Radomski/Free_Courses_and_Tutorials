import React from "react";
import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { Link, useNavigate } from "react-router-dom";

import { useSigninUserMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/state/authSlice";
import { AppDispatch, CustomError } from "../../Interfaces";

const SignIn = (): JSX.Element => {
  // console.info({ useSigninUserMutation });
  const [email, setEmail] = React.useState<string>("");
  // console.info({ email });
  const dispatch: AppDispatch = useAppDispatch();

  const toast = useToast();
  const navigate = useNavigate();
  const [signinUser, { data, isLoading, error, isError, isSuccess }] = useSigninUserMutation();
  // console.info({ data });
  // console.info({ error, isError });

  React.useEffect(() => {
    if (isError) {
      toast({
        title: (error as CustomError).data?.message,
        status: "error",
        duration: 5000,
      });
      if ((error as CustomError).data?.message === "User not Verified") {
        navigate("/send-verify-mail", {
          state: { email },
        });
      }
    }
    if (isSuccess) {
      dispatch(setUser({ token: data.token, name: data.name }));
      navigate("/");
      localStorage.setItem("token", data.token);
    }
    // console.info({ error });
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        console.info({ values });
        setEmail(values.email);
        signinUser({ ...values });
      }}
    >
      <Form>
        <Grid h="100vh" placeItems="center">
          <Stack p="4" boxShadow="xl" borderRadius="md">
            <Heading color="teal" textAlign="center" fontSize="lg" fontWeight="semibold">
              Signin
            </Heading>
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
            <Flex justify="flex-end">
              <Text as={Link} to="/forgot-password" color="teal">
                Forgot Password
              </Text>
            </Flex>
            <SubmitButton isLoading={isLoading}>Signin</SubmitButton>
          </Stack>
        </Grid>
      </Form>
    </Formik>
  );
};
export default SignIn;
