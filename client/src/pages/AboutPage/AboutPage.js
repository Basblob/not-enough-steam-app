import React from "react";
import "./AboutPage.scss";

export default function AboutPage() {
  return (
    <article className="about">
      <section className="about__card">
        <h2 className="about__card__title">What is NotEnoughSteam?</h2>
        <ul>
          <li className="about__card__body">
            NotEnoughSteam is a data visualization app.
          </li>
          <li className="about__card__body">
            We use information about players and games on steam to give you a
            look into what other people are playing.
          </li>
          <li className="about__card__body">
            Search a game, and we'll take a look at what the players of that
            game are playing most!
          </li>
          <li className="about__card__body">
            Mess around with the visuals, and take a look at what's popular. You
            might just find your next favourite!
          </li>
        </ul>
      </section>
    </article>
  );
}
