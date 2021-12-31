import { TextureKeys, SceneKeys } from '../enums';

interface StartData {
  score?: number;
  titleText?: string;
  buttonText?: string;
}

export class Start extends Phaser.Scene {
  startData: StartData;
  previousScore: number;
  titleText: string;
  buttonText: string;
  title: Phaser.GameObjects.Text;
  button: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.Start);
  }

  create() {
    this.startData = this.scene.settings.data;
    this.previousScore = this.startData?.score;
    this.titleText = this.startData?.titleText || 'wtf';
    this.buttonText = this.startData?.buttonText || 'go';

    const scoreText: string = `you scored ${this.previousScore}!`;

    this.title = this.add.text(
      0,
      <number>this.game.config.height / 4,
      this.previousScore ? scoreText : this.titleText,
      {
        color: '#ff00ff',
        align: 'center',
        fixedWidth: <number>this.game.config.width,
      }
    );
    this.button = this.add.text(
      0,
      <number>this.game.config.height / 2,
      this.buttonText,
      {
        color: '#fff',
        align: 'center',
        fixedWidth: <number>this.game.config.width,
      }
    );
    this.button.setInteractive().on('pointerdown', () =>
      this.scene.start(SceneKeys.Runner, {
        time: this.time.now,
      })
    );
    this.hint = this.add.text(
      0,
      (<number>this.game.config.height / 4) * 3,
      "tap or click to jump",
      {
        color: '#0f0',
        align: 'center',
        fixedWidth: <number>this.game.config.width,
      }
    );

    const test_sprite_run = this.physics.add.sprite(
      100,
      200,
      "hero_run"
    );
    test_sprite_run.anims.create({key: "run"});
    console.log("test_sprite_run", test_sprite_run);
    // test_sprite_run.anims.play("run");
    // this.add.tween(test_sprite);

    const test_sprite_jump = this.physics.add.sprite(
      200,
      200,
      "hero_jump"
    );
    test_sprite_jump.anims.create({key: "jump"});
  }
}
