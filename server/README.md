
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
