import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation = Math.round(
    (confirmedStays.reduce((acc, cur) => acc + cur.numOfNight, 0) /
      (numDays * cabinCount)) *
      100
  );
  return (
    <>
      <Stat
        title={"Bookings"}
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={"Sales"}
        color={"blue"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check-ins"}
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={"Occupancy rate"}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={`${occupation} %`}
      />
    </>
  );
}

export default Stats;
