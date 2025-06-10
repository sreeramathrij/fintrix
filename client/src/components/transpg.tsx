import { useEffect, useState } from "react";
import { useTransactionsStore } from "@/store/useTranscationStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionsPage() {
  const {
    transactions,
    getTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    setSelectedTransaction,
    selectedTransaction,
    isFetchingTransactions
  } = useTransactionsStore();

  const [form, setForm] = useState({
    amount: "",
    type: "income", // or 'expense'
    description: "",
    date: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formatted = {
      ...form,
      amount: Number(form.amount),
      date: new Date(form.date).getTime(),
    };

    if (selectedTransaction) {
      await editTransaction(selectedTransaction._id, formatted);
    } else {
      await addTransaction(formatted);
    }

    setForm({ amount: "", type: "income", description: "", date: "", category: "" });
    setSelectedTransaction(null);
  };

  const handleEdit = (id: string) => {
    const tx = transactions?.find((t) => t._id === id);
    if (!tx) return;

    setForm({
      amount: String(tx.amount),
      type: tx.type,
      description: tx.description,
      date: new Date(Number(tx.date)).toISOString().split("T")[0],
      category: tx.category,
    });
    setSelectedTransaction(tx as any); // You may cast properly if needed
  };

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
  };

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      <div className="mb-6 space-y-2">
        <Input
          placeholder="Amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
        />
        <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <Input
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          placeholder="Date"
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
        />
        <Input
          placeholder="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>
          {selectedTransaction ? "Update" : "Add"} Transaction
        </Button>
      </div>

      <div>
        {isFetchingTransactions ? (
          <p>Loading transactions...</p>
        ) : (
          transactions?.map((tx) => (
            <div
              key={tx._id}
              className="border rounded-lg p-3 mb-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-sm text-muted-foreground">
                  {tx.type} - ₹{tx.amount} - {new Date(Number(tx.date)).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <Button size="sm" onClick={() => handleEdit(tx._id)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(tx._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
