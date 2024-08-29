<div align="center">

# Bitesy

</div>

## Getting started

1. Install NodeJS v18 +
2. Clone the repo at the directory of your preference using the `git clone` command.
3. Access the project folder:
4. Let's set up the client folder first

### Client Set up

  ```bash
  $ cd client
  ```
5. Create your local `.env.local` file, following the `.env.sample` file structure

6. Install the dependencies:
```bash
  $ npm install
  ```

7. Run application:
  ```bash
  $ npm run dev
  ```
8. Access application through your preferred browser: http://localhost:3000 🚀

### Server Set up
1. Go back to parent folder and access the server folder
 ```bash
  $ cd server
  ```
2. Create your local `.env` file (not inside src folder, outside of it), following the `.env.sample` file structure 

3. Install the dependencies:
  ```bash
  $ npm install
  ```

4. Run application:
  ```bash
  $ npm run dev
  ```
5. Application will run at the Port that you input: example: https://localhost:yourport

### Additional Information and Set up

- The database that is used here is MongoDB, you can copy the link from MongoAtlas cloud or local url string.

*** Database Seeding ***

There is a API for database seeding. Some Mockup data for the models will be inserted into the database

1. Run Server Application first.
2. Go to Postman or any similiar application.
3. call this URL http://localhost:{yourport}/api/db-seed
4. if you see the response from API with a success message, your db is seeded 

## Appendix

testuser -> name: test1@gmail.com, password: Testuser123!

## Tech Stack

**Client:** Vite, React, TypeScript, TailwindCSS, ShadCn UI, Zustand, Zod, @tanstack/react-query, @tanstack/react-router, context api, axios, i18next, usehook ts and more... 

**Server:** Node, Express, TypeScript, Mongoose, MongoDb, Yup, jsonwebtoken, cloudinary, nodemailer and more..



## Authors

- [@hanthu][@Draz](https://github.com/HanMyatThu)



## shadcn/ui Components folder ⚠

shadcn is a collection of re-usable components builted using Radix UI and Tailwind CSS.

Using shadcn/ui, instead of install the component in the project, you use `npm add <...>` command to copy the component to your component folder, giving you lots of possibilities, including the fully customization control. All of the components are under the
`components/ui` folder. 

