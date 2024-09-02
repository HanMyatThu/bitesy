
### Bitesy Server

### Database Models

- user 
- auth-token
- bonus-point
- order
- order-items
- password-reset-tokens
- product
- promotion-type
- promotions
- sessions
- tiers






## API Reference

#### #### 1. Authentication flow

#### User Register
```http
  POST /api/auth/sign-up
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. example: "John" |
| `password` | `string` | **Required**. example: "John123!"|
| `email` | `string`| **Required**. example: "john@gmail.com"|

##### after registering, a system will send an email to you with a verfication link. 
example: https://bitesy.com/verify?id=1&token=abc

#### verify your email before sign in

```http
  POST /api/auth/verify
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. example: "1" |
| `token` | `string` | **Required**. example: "abc"|

##### email will be verified and user can be login to application

#### Login

```http
  GET /api/auth/sign-in
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. example: "John" |
| `password` | `string` | **Required**. example: "John123!"|


## Note 
There is an attached document for API lists "json file from postman" you can import that in your your postman.



## Bonus Points and Loyalty Tier Flows

### What is Bonus Points 

```  
{
  "_id": "66cf95886ae7b45aa454bafb",
  "bonus_point": 4.73,
   user": "66cf95886ae7b45aa454baef",
}
```

When a user purchase a order, let's say about 10$. he will get a bonus point based on the amount that he spent.

```
export const BONUS_POINT_MULTIPLER = 0.2;
```
Now there is a constant as a config for multiplying bonus points. 
A user can collect bonus points for every order purchase. when he has certain points, he can buy coupoun code to get an additional discount.


### What is a Loyalty Tier
There are four tier level in the system
```
export enum ETier {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
  NONE = "none",
}
```

It's similar to bonus point flow. A user will recieve tier points for every order purchase. 

```
export const BONUS_POINT_MULTIPLER = 0.1;
```
example 10$ purchase = 1 tier point
when he reaches certain threadshold, his tier level will be increased by the system.
bronze = > 40
silver = > 80
gold = > 120
none = < 40

You can provide specific discounts or promotions to certain tier level.

```
  "_id": "66cf95886ae7b45aa454baf5",
  "type": "none",
  "point": 2.3600000000000003,
  "user": "66cf95886ae7b45aa454baef",
```
