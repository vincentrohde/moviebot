# Slack Moviebot

Slack bot that recommends you random movies (you can also use criterias, such as genre) from the [The Movie Database API](https://developers.themoviedb.org/)

## Table of Contents

1. [Getting Started](#getting-started)
2. [Keywords](#keywords)
3. [Built With](#built-with)

## Getting Started

### Prerequisites

#### The Movie Database Credentials

First of all, you will need a [The Movie Database account](https://www.themoviedb.org/account/signup) to use the project with The Movie Database API. Once you have an account you can [apply for an API key](https://www.themoviedb.org/settings/api).

#### Creating a Slack App

Before being able to use your project, you will have to [create your own Slack app](https://api.slack.com/apps?new_app=1). Once you have everything set up, you can start with the installation.

### Installation

```
git clone https://github.com/vincentrohde/moviebot.git
npm install
cp .env.example .env
```

Now go to your `.env` file and replace the template data with your own data. 

#### Starting the bot

```
npm run start
```

The bot is now running under `http://localhost:8765` 

#### Exposing

To expose your application (the repository) to be visible by Slack, you can make use of [ngrok](https://github.com/inconshreveable/ngrok) or set up a deployment to services like [Heroku](https://www.heroku.com).

#### Connecting

Now that you exposed your application to the internet, you will have to add your url as a **Request URL** to your slack application.

```
{{ your url, e.x. http://moviebot.service.abc }}/api/messages
```

## Keywords

`{genre} film {year}` - will print a random movie, you can add genre and year to the equation

`{genre || genres}` - will give you a list of all genres

## Built With

- [Botkit](https://github.com/howdyai/botkit)
- [Slack API](https://api.slack.com/)
- [The Movie Database API](https://developers.themoviedb.org/)

[Back to the Top](#slack-moviebot)
