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
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

`AICar` is an application for detecting a free parking parking space on a parking lot using the AI detection module. This repository is a central module of the backend service.


### Built With

* Node.js
* Koa
* PostgreSQL
* TypeORM
* Typescript

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

1. This project requires `pnpm version >= 7.6.0`.
2. Setup a new database PostgreSQL connection with a new database and put the connection options to `.env` file. Please, see `.env.sample`.

### Installation

1. Clone the repo
   ```sh
    git clone https://github.com/petrokss/aicar-backend.git
   ```
2. touch a `.env` file and fill with the required variables and their values.
3. run
   ```sh
    pnpm i
   ```
4. To fill the database with tables run
   ```sh
    pnpm run migration-run
   ```
5. The project is set up, run
   ```sh
    pnpm start
   ```

<!-- CONTACT -->
## Contact

Oksana Petrenko - [@linkedIn](https://www.linkedin.com/in/petroks/) - petrokss9@gmail.com
