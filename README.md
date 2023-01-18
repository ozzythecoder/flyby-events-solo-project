<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ozzythecoder/flyby-events-solo-project">
    <img src="public/favicons/apple-touch-icon.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">FlyBy Events</h3>

  <p align="center">
    A mobile-first web app to create, track, and manage events.
    <br />
    <a href="https://github.com/ozzythecoder/flyby-events-solo-project/issues">Report Bug</a>
    ·
    <a href="https://github.com/ozzythecoder/flyby-events-solo-project/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<center>
<img src="./documentation/images/login-screenshot.png" height="500" style="margin-right: 20px" />
<img src="./documentation/images/myEvents-screenshot.png" height="500" />
</center>

I created FlyBy Events as a prototype for a mobile-first web app where users can register, create events, invite guests, and track each others' events.

FlyBy Events was created as my solo project at [Prime Digital Academy](https://www.primeacademy.io/).

This project has given me a great understanding of my own ability to learn and refine my skills, and push through challenges and app-breaking bugs with curiosity rather than anger or frustration. FlyBy is a very long way from being a viable consumer app, but is a functioning prototype that I am proud of.

A deployed version of this app can be accessed [here](https://flyby-events.herokuapp.com/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![React][React.js]][React-url]
[![Node][Node.js]][Node-url]
[![MUI]][MUI-url]
[![Postgresql]][Postgresql-url]
[![Redux-Saga]][Redux-saga-url]
[![Redux]][Redux-url]
[![Swal2]][Swal2-url]
[![Luxon.js]][Luxon-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This app was developed in node.js version 18.12.0. I can't guarantee functionality for any older versions of node.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ozzythecoder/flyby-events-solo-project.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file and enter a randomized session key
   ```
   SERVER_SESSION_SECRET = << RANDOM SESSION KEY HERE >>
   ```
4. Start your Postgres server and create a database under the name `flyby-events-app`
5. Build the database from the queries listed in `database.sql`
6. Spin up your backend server
    ```sh
    npm run server
    ```
7. Run your frontend client – this will navigate you to `localhost:3000`
    ```sh
    npm run client
    ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

**⚠️ This app is only functional when viewed in a mobile-style browser under 600px in width. ⚠️** 

If this is your first time using the app, register with a username, password, email, and phone number.

Use the hamburger menu to navigate through the app.

<img src="./documentation/images/menu-screenshot.png" height="500">

Create an event by filling out the required fields and confirm the details.

<img src="./documentation/images/createEvent-screenshot.png" height="500" >
<img src="./documentation/images/previewEvent-screenshot.png" height="500" >

You can edit and delete the event, and invite guests, from the event detail page. If your event is marked as public, the URL will be accessible to anyone, whether they have a FlyBy account or not. Visibility of private events is limited to the host and any invited guests.

<img src="documentation/images/eventDetail-screenshot.png" height="400">

Guests can add events, as well as *subscribe* to events. This is functionality for a future subscription feature, which will allow guests to receive text/email updates when event details change.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

Potential future updates include:
- Archive events
- Server-side filtering
- Profiles
- Comments section for events
- Fully implemented text & email notifications

See the [open issues](https://github.com/ozzythecoder/flyby-events-solo-project/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**, with the understanding that I am a student and this was mainly created as a learning opportunity for myself.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

August McAllister - august.chm@gmail.com

Project Link: [https://github.com/ozzythecoder/flyby-events-solo-project](https://github.com/ozzythecoder/flyby-events-solo-project)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Thank you to:
* The Shawl cohort family at Prime Coding Academy
* My instructors Dane, Key, Liz, and Kris
* My family, friends, and partner

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ozzythecoder/flyby-events-solo-project.svg?style=for-the-badge
[contributors-url]: https://github.com/ozzythecoder/flyby-events-solo-project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ozzythecoder/flyby-events-solo-project.svg?style=for-the-badge
[forks-url]: https://github.com/ozzythecoder/flyby-events-solo-project/network/members
[stars-shield]: https://img.shields.io/github/stars/ozzythecoder/flyby-events-solo-project.svg?style=for-the-badge
[stars-url]: https://github.com/ozzythecoder/flyby-events-solo-project/stargazers
[issues-shield]: https://img.shields.io/github/issues/ozzythecoder/flyby-events-solo-project.svg?style=for-the-badge
[issues-url]: https://github.com/ozzythecoder/flyby-events-solo-project/issues
[license-shield]: https://img.shields.io/github/license/ozzythecoder/flyby-events-solo-project.svg?style=for-the-badge
[license-url]: https://github.com/ozzythecoder/flyby-events-solo-project/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/august-mcallister
[product-screenshot]: ./documentation/images/login-screenshot.png
[Node.js]: https://img.shields.io/badge/Node.JS-20232A?style=for-the-badge&logo=node.js&logoColor=61DAFB
[Node-url]: https://nodejs.org/en/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Postgresql]: https://img.shields.io/badge/PostgreSQL-20232A?style=for-the-badge&logo=postgresql&logoColor=61DAFB
[Postgresql-url]: https://www.postgresql.org/
[Redux]: https://img.shields.io/badge/Redux-20232A?style=for-the-badge&logo=redux&logoColor=61DAFB
[Redux-url]: https://redux.js.org/
[Redux-Saga]: https://img.shields.io/badge/Redux/Saga-20232A?style=for-the-badge&logo=reduxsaga&logoColor=61DAFB
[Redux-saga-url]: https://redux-saga.js.org/
[MUI]: https://img.shields.io/badge/MUI%20&%20Material%20Design-20232A?style=for-the-badge&logo=materialdesign&logoColor=61DAFB
[MUI-url]: https://mui.com/core/
[Swal2]: https://img.shields.io/badge/SweetAlert2-20232A?style=for-the-badge
[Swal2-url]: https://sweetalert2.github.io/
[Luxon.js]: https://img.shields.io/badge/Luxon.js-20232A?style=for-the-badge
[Luxon-url]: https://moment.github.io/luxon/#/