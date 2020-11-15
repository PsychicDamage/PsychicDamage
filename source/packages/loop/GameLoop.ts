import { bound } from "../core";
import { Timer } from "./Timer";

export abstract class GameLoop {

  private frameTime: number;

  constructor(
    TPS: number,
    readonly timer: Timer
  ) {
    this.frameTime = 1000 / TPS;
  }

  get fixedDeltaTime() {
    return this.frameTime;
  }

  get TPS() {
    return 1 / this.frameTime;
  }

  set TPS(value) {
    this.frameTime = 1 / value;
  }

  private running = false;

  start() {
    if (this.running) return;
    this.running = true;
    this.timer.start();
    this.frame();
  }

  private lastTime = 0;
  private accumTime = 0;

  static MAX_DELTA_TIME = Infinity;

  @bound
  protected frame() {
  
    // TODO: figure out time scaling

    const time = this.timer.now();

    // @ts-ignore
    const delta = Math.min(this.lastTime - time, this.constructor.MAX_DELTA_TIME);

    this.accumTime += delta;

    this.enter(delta);

    const dt = this.frameTime;
    while (this.running && this.accumTime >= dt) {
      this.tick(dt);
      this.accumTime -= dt;
    }

    this.leave(this.accumTime / dt);

    if (this.running)
      this.schedule();

  }
  
  stop() {
    if (!this.running) return;
    this.running = false;
    this.timer.stop();
  }

  /**
   * Should schedule frame() for the eventual frame of execution.
   */
  protected abstract schedule(): void;

  protected enter(delta: number): void;
  protected enter() {}

  protected tick(dt: number): void;
  protected tick() {}

  protected leave(alpha: number): void;
  protected leave() {}


}
