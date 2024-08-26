import { EPromotionType } from "@/enum/promotion-type";
import {
  CONSTANT_DAY,
  ITEM_CATEGORY,
  ORDER_MIN_QUANTITY,
  ORDER_MIN_TOTAL_PRICE,
} from "@/constants/constants";
import { PromotionType } from "@/models/promotion-type";
import { Promotion } from "@/models/promotions";
import { User } from "@/models/user";
import { EOrderCategory } from "@/enum/categories";
import { Product } from "@/models/product";
import {
  getRandomObjectsFromArray,
  getRandomValueForArray,
} from "@/utils/common";
import { OrderItem } from "@/models/orderitem";
import { Order } from "@/models/order";
import { RequestHandler } from "express";

const promotionTypes = [
  {
    type: EPromotionType.ORDER_MIN_QUANTITY,
    min_order_item_quantity: ORDER_MIN_QUANTITY,
  },
  {
    type: EPromotionType.ORDER_MIN_TOTAL_PRICE,
    min_order_total_price_usd: ORDER_MIN_TOTAL_PRICE,
  },
  {
    type: EPromotionType.ITEM_CATEGORY,
    item_category: ITEM_CATEGORY,
  },
  {
    type: EPromotionType.ORDER_DAY_OF_PURCAHSE,
    day: CONSTANT_DAY,
  },
];

const promotions = [
  {
    name: "Get Your Promotion on purchasing many items!",
    type: EPromotionType.ORDER_MIN_QUANTITY,
  },
  {
    name: "Get Your Promotion on Minimum Order Amount!",
    type: EPromotionType.ORDER_MIN_TOTAL_PRICE,
  },
  {
    name: "Get Your Promotion on Specific Item!",
    type: EPromotionType.ITEM_CATEGORY,
  },
  {
    name: "Get Your Promotion on a special day",
    type: EPromotionType.ORDER_DAY_OF_PURCAHSE,
  },
];

const mockUsers = [
  {
    name: "Test 1",
    email: "test1@gmail.com",
    password: "Testuser123!",
    address: "helmond",
    verified: true,
  },
  {
    name: "Test 2",
    email: "test2@gmail.com",
    address: "helmond",
    password: "Testuser123!",
    verified: true,
  },
  {
    name: "Test 3",
    email: "test3@gmail.com",
    password: "Testuser123!",
    address: "helmond",
    verified: true,
  },
];

const products = [
  // MEAL Category
  {
    name: "Pepperoni Pizza",
    price: 12.49,
    category: EOrderCategory.MEAL,
    image: {
      url: "https://example.com/pepperoni-pizza.jpg",
      id: "1",
    },
    description: "Pepperoni Pizza with extra cheese",
  },
  {
    name: "Spaghetti Bolognese",
    price: 15.99,
    category: EOrderCategory.MEAL,
    image: {
      url: "https://example.com/spaghetti-bolognese.jpg",
      id: "2",
    },
    description: "Classic Italian spaghetti with Bolognese sauce",
  },
  {
    name: "Grilled Chicken Sandwich",
    price: 8.79,
    category: EOrderCategory.MEAL,
    image: {
      url: "https://example.com/grilled-chicken-sandwich.jpg",
      id: "3",
    },
    description: "Grilled chicken sandwich with lettuce and tomato",
  },
  {
    name: "Vegetable Stir Fry",
    price: 9.49,
    category: EOrderCategory.MEAL,
    image: {
      url: "https://example.com/vegetable-stir-fry.jpg",
      id: "4",
    },
    description: "Fresh vegetables stir-fried with soy sauce",
  },

  // DRINK Category
  {
    name: "Cola",
    price: 1.99,
    category: EOrderCategory.DRINK,
    image: {
      url: "https://example.com/cola.jpg",
      id: "5",
    },
    description: "Refreshing cola drink",
  },
  {
    name: "Orange Juice",
    price: 2.49,
    category: EOrderCategory.DRINK,
    image: {
      url: "https://example.com/orange-juice.jpg",
      id: "6",
    },
    description: "Freshly squeezed orange juice",
  },
  {
    name: "Lemon Iced Tea",
    price: 2.99,
    category: EOrderCategory.DRINK,
    image: {
      url: "https://example.com/lemon-iced-tea.jpg",
      id: "7",
    },
    description: "Chilled lemon-flavored iced tea",
  },
  {
    name: "Espresso",
    price: 3.49,
    category: EOrderCategory.DRINK,
    image: {
      url: "https://example.com/espresso.jpg",
      id: "8",
    },
    description: "Strong and rich espresso shot",
  },

  // CANDY Category
  {
    name: "Chocolate Bar",
    price: 1.49,
    category: EOrderCategory.CANDY,
    image: {
      url: "https://example.com/chocolate-bar.jpg",
      id: "9",
    },
    description: "Milk chocolate bar with a creamy center",
  },
  {
    name: "Gummy Bears",
    price: 2.19,
    category: EOrderCategory.CANDY,
    image: {
      url: "https://example.com/gummy-bears.jpg",
      id: "10",
    },
    description: "Colorful gummy bears with fruity flavors",
  },
  {
    name: "Lollipop",
    price: 0.99,
    category: EOrderCategory.CANDY,
    image: {
      url: "https://example.com/lollipop.jpg",
      id: "11",
    },
    description: "Large swirl lollipop with mixed fruit flavors",
  },

  // CONVENIENCE Category
  {
    name: "Pack of Chips",
    price: 2.99,
    category: EOrderCategory.CONVENIENCE,
    image: {
      url: "https://example.com/chips.jpg",
      id: "12",
    },
    description: "Crispy potato chips with sea salt",
  },
  {
    name: "Protein Bar",
    price: 3.29,
    category: EOrderCategory.CONVENIENCE,
    image: {
      url: "https://example.com/protein-bar.jpg",
      id: "13",
    },
    description: "High-protein bar with chocolate and nuts",
  },
  {
    name: "Instant Noodles",
    price: 1.89,
    category: EOrderCategory.CONVENIENCE,
    image: {
      url: "https://example.com/instant-noodles.jpg",
      id: "14",
    },
    description: "Instant ramen noodles with beef flavor",
  },

  // OTHER Category
  {
    name: "Reusable Water Bottle",
    price: 9.99,
    category: EOrderCategory.OTHER,
    image: {
      url: "https://example.com/water-bottle.jpg",
      id: "15",
    },
    description: "Eco-friendly reusable water bottle",
  },
];

/**
 *  This function is to generate data in database that is predefined and manipulated
 * for the purpose of testing and simulating the program
 * 1. Promotions Type First
 * 2. create promotions
 * 3. create 3 mock up users with promotions
 * 4. create 15` products
 * 5. create order, first get random user, get some random products, create order item and then create order with order items ids
 * 6. db is seeded successfully
 */
export const dbSeed: RequestHandler = async (req, res) => {
  try {
    // 1. create promotion types
    const promotionTypePromise = promotionTypes.map((type) => {
      const data = new PromotionType({
        ...type,
      });
      return data.save();
    });
    const promotionTypeResutls = await Promise.all(promotionTypePromise);
    console.log("promotion types created successfully", promotionTypeResutls);

    // 2. create promotion
    const promotionPromises = promotions.map((promotion) => {
      const findId = promotionTypeResutls.filter(
        (res) => res.type === promotion.type
      );
      const data = new Promotion({
        name: promotion.name,
        config: findId[0]._id,
      });
      return data.save();
    });
    const promotionResults = await Promise.all(promotionPromises);
    const promotionId = promotionResults.map((res) => {
      return res._id;
    });
    console.log("promotions created successfully");

    //3. create user
    const userPromises = mockUsers.map((user) => {
      const data = new User({
        ...user,
        promotions: promotionId,
      });
      return data.save();
    });
    const userResults = await Promise.all(userPromises);
    console.log("users created successfully");

    //4 . create products
    const productPromises = products.map((product) => {
      const data = new Product({
        ...product,
      });
      return data.save();
    });
    const productResults = await Promise.all(productPromises);
    console.log("product created successfully");

    //5. create orders
    [...Array(12)].map(async (_, i) => {
      const randomUser = getRandomValueForArray(userResults);
      const randomProducts = getRandomObjectsFromArray(productResults);
      console.log(randomProducts, "randomProducts");
      const totalPrice = randomProducts.reduce((accumulator, product) => {
        return accumulator + product.price;
      }, 0);

      // create order items first
      const orderItemsPromises = randomProducts.map((product) => {
        const data = new OrderItem({
          product: product._id,
          price: product.price,
          quantity: 1,
          category: product.category,
        });
        return data.save();
      });

      const orderItemsResults = await Promise.all(orderItemsPromises);
      const orderItemsId = orderItemsResults.map((res) => ({
        item: res._id,
      }));

      // create order
      const order = new Order({
        customer_id: randomUser._id,
        date: {
          year: 2024,
          month: Math.floor(Math.random() * 12),
          date: Math.floor(Math.random() * 31) + 1,
        },
        price: Number(totalPrice).toFixed(2),
        items: orderItemsId,
      });
      await order.save();
    });
    console.log("Orders are created");

    console.log("DB seeding is success");
    res.send({ message: "DB seeding is success" });
  } catch (e) {
    console.log("Error in DB Seeding", e);
  }
};
