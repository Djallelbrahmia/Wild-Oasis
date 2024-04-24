import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLength,
      breakFastPrice,
      maxGuestsPerBooking,
    } = {},
  } = useSettings();
  const { editSetting, isEditing } = useEditSettings();
  if (isLoading) return <Spinner />;
  function handleUpdate(e, fieldName) {
    const { value } = e.target;
    console.log(value);
    if (!value) return;
    editSetting({ [fieldName]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          defaultValue={minBookingLength}
          type="number"
          id="min-nights"
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={maxBookingLength}
          type="number"
          id="max-nights"
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={breakFastPrice}
          onBlur={(e) => handleUpdate(e, "breakFastPrice")}
          type="number"
          disabled={isEditing}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          type="number"
          disabled={isEditing}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
