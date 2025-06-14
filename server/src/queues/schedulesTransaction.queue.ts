import Bull from "bull";

import { ScheduledTransaction } from "../models/scheduledTransaction.model.js";
import { Transaction } from "../models/transaction.model.js";

const scheduledQueue = new Bull("scheduled-transaction", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

const getNextRunDate = (currentDate: Date, frequency: "daily" | "weekly" | "monthly") => {
  const next = new Date(currentDate);
  if (frequency === "daily") next.setDate(next.getDate() + 1);
  else if (frequency === "weekly") next.setDate(next.getDate() + 7);
  else if (frequency === "monthly") next.setDate(next.getMonth() + 1);

  return next;
}

scheduledQueue.process(async (job) => {
  const scheduled = job.data;

  await Transaction.create({
    title: scheduled.title,
    amount: scheduled.amount,
    type: scheduled.type,
    category: scheduled.category,
    user: scheduled.user,
    date: new Date()
  })

  await ScheduledTransaction.findByIdAndUpdate(scheduled._id, { nextRun: getNextRunDate(new Date(), scheduled.frequency) });
});

export { scheduledQueue };
