import { now } from "./now";

/**
 * This abstraction keeps track of in game real time, if the game is stopped the real time of the game stops.
 */
export class Timer {

  constructor(private readonly counter: TimerCounter = now) {}

  private running = false;

  private startTime = 0;
  private accumTime = 0;

  now() {
    return this.accumTime + (this.running ? this.counter() - this.startTime : 0);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.startTime = this.counter();
  }
  
  stop() {
    if (!this.running) return;
    this.running = false;
    this.accumTime += this.counter() - this.startTime;
  }

}

export type TimerCounter = () => number;
