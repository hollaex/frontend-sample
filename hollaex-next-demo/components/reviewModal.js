import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Box,
} from "@mui/material";
import TimerProgressBar from "./timerProgressBar";
import { AccessTime } from "@mui/icons-material";
import Image from "next/image";

const ModalWrapper = styled(Dialog)`
  .MuiDialogContent-root {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

const Content = styled(DialogContent)`
  opacity: ${(props) => (props.isExpired ? 0.75 : 1)};
`;

const ReviewModal = ({
  isOpen = false,
  onClose,
  onConfirm,
  duration,
  spendAmount,
  estimatedAmount,
  spendCurrency,
  receiveCurrency,
  coinData,
}) => {
  const [isExpired, setIsExpired] = useState(false);

  const handleExpire = () => setIsExpired(true);

  const handleCloseModal = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (!isExpired) {
      onConfirm();
    }
  };

  useEffect(() => {
    setIsExpired(duration <= 0);
  }, [duration]);

  const content = (
    <Content isExpired={isExpired}>
      <DialogTitle className="p-0 text-[28px]">Confirm</DialogTitle>
      <DialogContentText className="mb-4 text-sm">
        Please check your order and confirm it below.
        <br />
        Amount to receive are estimates and aren't inclusive of the trading fee
      </DialogContentText>
      {isExpired ? (
        <DialogContentText className="pt-4">
          <Box className="flex items-center text-orange-400 text-sm">
            <Box>
              <AccessTime />
            </Box>
            <Box className="ml-2">
              Price has expired.
              <br />
              Go back to get a new price quote.
            </Box>
          </Box>
        </DialogContentText>
      ) : (
        <Box>
          <Box className="flex items-center mb-2">
            <Box>
              <AccessTime />
            </Box>
            <Box className="ml-2">
              Price quote will expire in {duration} seconds
            </Box>
          </Box>
          <TimerProgressBar duration={duration} onExpire={handleExpire} />
        </Box>
      )}
      <DialogContentText className="mt-4">
        <Box className="flex justify-between border-t-2 py-6 mt-4">
          <Box>Spend Amount</Box>
          <Box className="flex items-center text-5xl">
            <Image
              src={coinData[spendCurrency.value].logo}
              width={40}
              height={40}
              className="mr-2"
            />
            {spendAmount}
          </Box>
        </Box>
        <Box className="flex justify-between border-t-2 py-6 mt-4">
          <Box>Estimated Receiving Amount</Box>
          <Box className="flex items-center text-5xl">
            <Image
              src={coinData[receiveCurrency.value].logo}
              width={40}
              height={40}
              className="mr-2"
            />
            {estimatedAmount}
          </Box>
        </Box>
      </DialogContentText>
    </Content>
  );

  return (
    <ModalWrapper open={isOpen} onClose={handleCloseModal}>
      {content}
      <DialogActions className="justify-between px-4">
        <Button onClick={handleCloseModal} fullWidth>
          Back
        </Button>
        <Button
          variant="contained"
          className="bg-blue-500 text-white"
          disabled={isExpired}
          onClick={handleConfirm}
          fullWidth
        >
          Confirm
        </Button>
      </DialogActions>
    </ModalWrapper>
  );
};

export default ReviewModal;
