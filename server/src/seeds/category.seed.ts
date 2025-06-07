import mongoose from "mongoose";
import dotenv from "dotenv";
import { Category } from "../models/category.model";

dotenv.config();
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dz1hss7pf/image/upload/v1749269692"

const defaultCategories = [
  // Income
  {
    name: "Salary",
    type: "income",
    picture: `${CLOUDINARY_BASE_URL}/wpdtylehh5ob9rpdaoed.png`,
    createdBy: null,
  },
  {
    name: "Freelance",
    type: "income",
    picture: `${CLOUDINARY_BASE_URL}/yfqbtdbfjh9aetqtby35.png`,
    createdBy: null,
  },

  // Expense
  {
    name: "Food",
    type: "expense",
    picture: `${CLOUDINARY_BASE_URL}/xk8iaey5ngtfkwmdlouy.png`,
    createdBy: null,
  },
  {
    name: "Transport",
    type: "expense",
    picture: `${CLOUDINARY_BASE_URL}/palcsodz9rbhgfv4fa4o.png`,
    createdBy: null,
  },
  {
    name: "Groceries",
    type: "expense",
    picture: `${CLOUDINARY_BASE_URL}/bybqksoc5cwx6ijwokbp.png`,
    createdBy: null,
  },
  {
    name: "Shopping",
    type: "expense",
    picture: `${CLOUDINARY_BASE_URL}/mnvxw2fdv95hwi35sswr.png`,
    createdBy: null,
  },
  {
    name: "Travel",
    type: "expense",
    picture: `${CLOUDINARY_BASE_URL}/runu7ym8w4wqpx2i2tqr.png`,
    createdBy: null,
  },
  {
    name: "Entertainment",
    type: "expense",
    picture: `${CLOUDINARY_BASE_URL}/i6rkbur6spqp39w5sp2j.png`,
    createdBy: null,
  },
  {
    name: "Bills and Fees",
    type: "expense",
    picture: `${CLOUDINARY_BASE_URL}/hvgxej4pmr5kubhfxg3r.png`,
    createdBy: null,
  },
  {
    name: "Gifts",
    type: "expense",
    picture: `${CLOUDINARY_BASE_URL}/ffyoucln3z9injvaurxu.png`,
    createdBy: null,
  },
]

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to DB");

    for(const category of defaultCategories) {
      const exists = await Category.findOne({ name: category.name, createdBy: null })
      if(!exists){
        await Category.create(category);
        console.log(`Seeded: ${category}`);
      } else {
        console.log(`Skipped: ${category}`);
      }
    }

    mongoose.connection.close();
    console.log("Seeding Complete");
    
  } catch (error) {
    console.error("Seeding error: ", error);
    process.exit(1);
  }
}

seedCategories();