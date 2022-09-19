import React from "react";
import { Grid, Heading, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/spinner";

import { useSendMailForVerificationMutation } from "../../redux/api/authApi";
import { CustomError } from "../../Interfaces";

const SendEmail = (): JSX.Element => {
  const toast = useToast();
  const { state } = useLocation();
  // console.info({ state });

  const [sendMail, { isLoading, data, isError, error }] = useSendMailForVerificationMutation();
  if (isError) {
    toast({
      title: (error as CustomError).data?.message,
      status: "error",
      duration: 5000,
    });
  }
  console.info({ data });

  React.useEffect(() => {
    sendMail({ email: state.email });
  }, [sendMail, state]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <Grid placeItems="center" h="100vh">
            <Heading>Email Sended</Heading>
          </Grid>
        </>
      )}
    </>
  );
};

export default SendEmail;
