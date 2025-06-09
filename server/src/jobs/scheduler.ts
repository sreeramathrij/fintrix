import { ScheduledTransaction } from "../models/scheduledTransaction.model";
import { scheduledQueue } from "../queues/schedulesTransaction.queue";

export const enqueueScheduledtransaction = async () => {
  const now = new Date();
  const scheduled = await ScheduledTransaction.find({
    isActive: true,
    nextRun: { $lte: now }
  })

  for (const s of scheduled) {
    await scheduledQueue.add(s);
  }

  console.log(`${scheduled.length} jobs queued`)
}