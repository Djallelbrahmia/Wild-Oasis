import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isloading } = useBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useChecking();
  const [confirmPaid, setConfirmPaid] = useState();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isloading: isLoadingSettings } = useSettings();
  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
    },
    [booking]
  );

  if (!booking || isloading || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guest: guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numOfNight: numNights,
  } = booking;
  const optionalBreakFastPrice =
    settings.breakFastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakFastPrice,
          totalPrice: totalPrice + optionalBreakFastPrice,
        },
      });
    } else {
      checkIn({ bookingId });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmPaid(false);
            }}
            id={"breakfast"}
          >
            Want to add breakfast for {optionalBreakFastPrice}?
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
        >
          I Confirm that {guests.fullName} has paid the total amount{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakFastPrice)} (
              ${formatCurrency(totalPrice)} +
              ${formatCurrency(optionalBreakFastPrice)})`}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
