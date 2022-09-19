import React from "react";
import { Grid, Heading, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/spinner";

import { useVerifyUserMutation } from "../../redux/api/authApi";
import { CustomError } from "../../Interfaces";

const EmailVerify = (): JSX.Element => {
  const { token } = useParams();
  const toast = useToast();
  console.info({ token });

  const [verifyUser, { data, isError, isLoading, error, isSuccess }] = useVerifyUserMutation();
  if (isError) {
    toast({
      title: (error as CustomError).data?.message,
      status: "error",
      duration: 5000,
    });
  }
  console.info({ data });

  React.useEffect(() => {
    if (token) {
      verifyUser({ token });
    }
  }, [verifyUser, token]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isError && (
            <Grid placeItems="center" h="100vh">
              <Text>Email Verification Failed! Try Again</Text>{" "}
            </Grid>
          )}
          {isSuccess && (
            <Grid placeItems="center" h="100vh">
              <Heading>User Verified</Heading>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default EmailVerify;
