# HollaEx Next Demo

This repository contains the code for the HollaEx Next Demo project. The project is a demonstration of the HollaEx Kit, a cryptocurrency exchange software solution.

## Usage

To run the project, follow these steps:

1. Install the required dependencies by running `npm install`.
2. Set up the necessary environment variables by creating a `.env` file and filling in the required values. (Since this a demo there are no env variables)
3. For dev mode use command `npm run dev`
4. For prod mode create the application build by running `npm run build`
5. Start the application by running `npm start` it will run in prod mode.

## Hosted FE Demo

- [Login Page](https://frontend-sample-next-git-main-hollaex.vercel.app/login)
- [Wallet](https://frontend-sample-next-git-main-hollaex.vercel.app/wallet) - Gives a list of all the crypto currencies that the user owns
- [Quick Trade](https://frontend-sample-next-git-main-hollaex.vercel.app/quicktrade/btc-usdt) - Used for quick crypto exchange based on the prices 
- [Deposit](https://frontend-sample-next-git-main-hollaex.vercel.app/wallet/eth/deposit) - Deposit crypto page based on the available method.

## API Documentation

- Base URL for [Sandbox](https://api.sandbox.hollaex.com/v2)
- Base URL for [Prod](https://api.hollaex.com/v2) 
- [Swagger API Demo](https://api.sandbox.hollaex.com/api/explorer/)

## Folder Structure

The repository is organized as follows:

- `pages`: Contains the files that route to their corresponding pages.
- `services`: Contains service files that handle business logic and interact with the apis.
- `provider`: This is used for maintaing providers which help to maintain context across the app.
- `components`: Contains the component files that can be used across pages and different modules.

## Contributing

If you would like to contribute to this project, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that the code passes all tests.
3. Submit a pull request with a clear description of your changes. 
