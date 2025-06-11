import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { useTransactionsStore } from "@/store/useTranscationStore";


interface Transaction {
    _id: string,
    amount: number,
    type: string,
    date: string,
    description: string,
    category: {
        _id: string,
        name: string,
        type: "income" | "expense",
        picture: string,
        createdBy: string | null,
    }
    user: string,
    createdAt: string,
    updatedAt: string,
}

type TransactionGroup = {
  _id: string; // date in YYYY-MM-DD
  transactions: Transaction[];
};

type Props = {
  groupedTransactions: TransactionGroup[];
};

export default function TransactionList({ groupedTransactions }: Props) {
     const { setSelectedTransaction, deleteTransaction } = useTransactionsStore();
  return (
    <div className="space-y-6">
      {groupedTransactions.reverse().map((group) => {
        const date = new Date(group._id);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          weekday: "short",
        });

        return (
          <div key={group._id}>
            <p className="text-sm text-muted-foreground mb-2">{formattedDate}</p>
            <div className="space-y-3">
              {group.transactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex justify-between items-center bg-muted/10 p-3 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tx.category.picture}
                      alt={tx.category.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {tx.category.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      tx.type === "income" ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                  </p>
                   <Pencil
                  className="w-4 h-4 cursor-pointer hover:text-primary"
                  onClick={() => setSelectedTransaction(tx)}
                />
                <Trash2
                  className="w-4 h-4 text-destructive cursor-pointer hover:opacity-80"
                  onClick={() => deleteTransaction(tx._id)}
                />
                </div>

                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
