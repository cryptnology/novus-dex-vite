import { Event } from "ethers";

const sortUserEvents = (
  account: string,
  tokenEvents: Event[],
  exchangeEvents: Event[]
) => {
  let events: Event[];

  events = [...tokenEvents, ...exchangeEvents];

  events = events
    ?.filter((o) => o.args?.user === account)
    .sort((a, b) => b.blockNumber - a.blockNumber);

  return { events };
};

export default sortUserEvents;
