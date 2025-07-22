const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade' },
    scene: { preload, create, update }
};

let player, cursors, bullets, monsters, obstacles, lastMonster = 0, lastObstacle = 0;

function preload() {}

function create() {
    player = this.physics.add.sprite(400, 300, null);
    player.setDisplaySize(40, 40);
    player.setTint(0x2196f3);

    cursors = this.input.keyboard.createCursorKeys();
    bullets = this.physics.add.group();
    monsters = this.physics.add.group();
    obstacles = this.physics.add.group();

    this.input.keyboard.on('keydown-SPACE', () => {
        let bullet = bullets.create(player.x, player.y, null);
        bullet.setVelocityX(400);
        bullet.setDisplaySize(10, 5);
        bullet.setTint(0xffc107);
    });

    this.physics.add.overlap(bullets, monsters, (b, m) => { b.destroy(); m.destroy(); });
    this.physics.add.overlap(player, monsters, () => { this.scene.restart(); });
    this.physics.add.overlap(player, obstacles, () => { this.scene.restart(); });
}

function update(time) {
    if (cursors.left.isDown) player.x -= 5;
    if (cursors.right.isDown) player.x += 5;
    if (cursors.up.isDown) player.y -= 5;
    if (cursors.down.isDown) player.y += 5;

    // Spawn monsters
    if (time > lastMonster + 2000) {
        let m = monsters.create(800, Phaser.Math.Between(50, 550), null);
        m.setVelocityX(-100);
        m.setDisplaySize(30, 30);
        m.setTint(0xe53935);
        lastMonster = time;
    }

    // Spawn obstacles
    if (time > lastObstacle + 3000) {
        let o = obstacles.create(Phaser.Math.Between(400, 800), Phaser.Math.Between(50, 550), null);
        o.setImmovable(true);
        o.setDisplaySize(40, 20);
        o.setTint(0x8bc34a);
        lastObstacle = time;
    }
}

new Phaser.Game(config);
