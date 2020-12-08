This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

It may not work correctly if you don't have the .ev.local file with db credentials and secret for the JWT

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## The API
Base uri: `https://petshop-backend.vercel.app/api/`

## Endpoints

### Registration
Create user: `POST https://petshop-backend.vercel.app/api/user`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| admin          | Boolean                   | não         |
| birthdate      | String (YYYY-MM-DD)       | não         |
| name           | String                    | não         |
| email          | String                    | sim         |
| password       | String                    | sim         |
| address        | String                    | não         |
| phone          | String                    | não         |


### Authentication
Generate JWT: `POST https://petshop-backend.vercel.app/api/login`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| email          | String                    | sim         |
| password       | String                    | sim         |


### CRUD Supply for admin

Create a new product: `POST https://petshop-backend.vercel.app/api/supply`

Update a product: `PATCH https://petshop-backend.vercel.app/api/supply`

Get all products: `GET https://petshop-backend.vercel.app/api/supply`

Delete a products: `DELETE https://petshop-backend.vercel.app/api/supply`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| name           | String                    | não         |
| description    | String                    | não         |
| price          | Number                    | não         |
| stock          | Number                    | não         |
| sold           | Number                    | não         |
| photo          | String (base 64)          | não         |


### Sells
Order a purchase: `POST https://petshop-backend.vercel.app/api/sell`
Get all purchases from client: `GET https://petshop-backend.vercel.app/api/sell`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| userId         | String                    | sim         |
| bill           | List                      | não         |
| creditCard     | String                    | sim         |
| date           | String (YYYY-MM-DD)       | não         |
| totalPrice     | Number                    | sim         |


### Search
Order a purchase: `POST https://petshop-backend.vercel.app/api/search`

| Campo          | Tipo                      | Obrigatorio |
|----------------|---------------------------|-------------|
| search         | String                    | sim         |



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
