# PUGC Events - React Native Mobile App (Expo)

> This project is a part of the Mobile Application Development course at PUGC. The project is developed by the students of the BS Computer Science program at PUGC. The project is developed using the React Native framework and the Expo CLI. The project is a mobile app that allows users to view upcoming events, register for events, and view event details. The app also allows users to view their profile information. The app is connected to a Laravel API server that provides endpoints for the mobile app to interact with the database.

<br/>
<div align="center">
  <h3 align="center">PUGC Events - React Native Mobile App (Expo)</h3>

  <p align="center">
      A Mobile App for the PUGC Events API Server
    <br/>
    <br/>
    <a href="https://github.com/itxsaaad/pugc-events-app-react-native"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/itxsaaad/pugc-events-app-react-native/issues">Report Bug</a>
    .
    <a href="https://github.com/itxsaaad/pugc-events-app-react-native/issues">Request Feature</a>
  </p>
</div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## Table Of Contents

- [PUGC Events - React Native Mobile App (Expo)](#pugc-events---react-native-mobile-app-expo)
  - [Table Of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
  - [Features](#features)
    - [User Authentication](#user-authentication)
    - [Events](#events)
    - [RSVP](#rsvp)
  - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)
  - [Support](#support)

## About The Project

PUGC Events is a React Native mobile app built with Expo. The app provides an intuitive interface for users to browse and register for events at PUGC. Users can view event details, RSVP to events, manage their registrations, and update their profile information. The app connects to a Laravel backend API to handle data persistence and authentication.

## Features

### User Authentication

- **User Registration**: User can register using their name, email and password.
- **User Login**: User can login using their email and password.
- **User Logout**: User can logout from the app.
- **User Profile**: User can view their profile information.

### Events

- **Event Creation**: Admin can create an event with the following details:

  - Event Title
  - Event Description
  - Event Date
  - Event Time
  - Event Location

- **Event Update**: Admin can update the event details.
- **Event Deletion**: Admin can delete the event.
- **Event Details**: User can view the event details.
- **Event List**: User can view the list of all events.

### RSVP

- **Event Registration**: User can register for an event.
- **Event Unregistration**: User can unregister from an event.

## Built With

- [React Native](https://reactnative.dev/) - React Native is an open-source mobile application framework created by Facebook.
- [Expo](https://expo.dev/) - Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- [Expo Router](https://reactnavigation.org/docs/getting-started) - Expo Router is a routing library for React Native apps built with Expo.
- [React Navigation](https://reactnavigation.org/) - React Navigation is a popular library for routing and navigation in a React Native app.
- [Axios](https://axios-http.com/) - Axios is a popular promise-based HTTP client for the browser and Node.js.
- [React Native Paper](https://callstack.github.io/react-native-paper/) - React Native Paper is a high-quality, standard-compliant Material Design library that has you covered in all major use-cases.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) - Expo CLI is a command-line tool that is the main interface between a developer and Expo tools.
- [Laravel API Server](https://github.com/itxSaaad/pugc-events-server-laravel) - Laravel API server for the PUGC Events mobile app.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/itxSaaad/pugc-events-app-react-native.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```sh
   EXPO_PUBLIC_API_URL=<your-api-url>
   EXPO_ENV=development
   ```

   Replace the `<your-api-url>` with the URL of your Laravel API server.

4. Start the Expo server

   ```sh
   npx expo start
   ```

5. Open the Expo Go app on your mobile device and scan the QR code to run the app.

## Roadmap

See the [open issues](https://github.com/itxsaaad/pugc-events-app-react-native) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/itxsaaad/pugc-events-app-react-native/issues/new) to discuss it, or directly create a pull request after you edit the _README.md_ file with necessary changes.
- Please make sure you check your spelling and grammar.
- Create individual PR for each suggestion.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the repo
2. Clone the project
3. Create your feature branch (`git checkout -b feature/AmazingFeature`)
4. Commit your changes (`git commit -m "Add some AmazingFeature"`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## Authors

- **Muhammad Saad** - [itxsaaad](https://github.com/itxsaaad)
- **Mirza Moiz** - [mirza-moiz](https://github.com/mirza-moiz)
- **Hassnain Raza** - [hassnain512](https://github.com/hassnain512)

See also the list of [contributors](https://github.com/itxsaaad/pugc-events-app-react-native/graphs/contributors)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

Give ⭐️ if you like this project!

<a href="https://www.buymeacoffee.com/itxSaaad"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="200" /></a>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/itxsaaad/pugc-events-app-react-native.svg?style=for-the-badge
[contributors-url]: https://github.com/itxsaaad/pugc-events-app-react-native/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/itxsaaad/pugc-events-app-react-native.svg?style=for-the-badge
[forks-url]: https://github.com/itxsaaad/pugc-events-app-react-native/network/members
[stars-shield]: https://img.shields.io/github/stars/itxsaaad/pugc-events-app-react-native.svg?style=for-the-badge
[stars-url]: https://github.com/itxsaaad/pugc-events-app-react-native/stargazers
[issues-shield]: https://img.shields.io/github/issues/itxsaaad/pugc-events-app-react-native.svg?style=for-the-badge
[issues-url]: https://github.com/itxsaaad/pugc-events-app-react-native/issues
[license-shield]: https://img.shields.io/github/license/itxsaaad/pugc-events-app-react-native.svg?style=for-the-badge
[license-url]: https://github.com/itxsaaad/pugc-events-app-react-native/blob/main/LICENSE.md
