/**
 * Données initiales du jeu
 */
const playerLeftPad = {
    x: 0,
    y: 0,
    width: 25,
    height: 100
}

const playerRightPad = {
    x: 0,
    y: 0,
    width: 25,
    height: 100
}

const screen = {
    width: 0,
    height: 0
}

const ball = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 16,
    height: 16
}

/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, context) {
    screen.width = canvas.width
    screen.height = canvas.height

    playerLeftPad.x = 10
    playerLeftPad.y = screen.height / 2 - playerLeftPad.height / 2

    playerRightPad.x = screen.width - 10 - playerRightPad.width
    playerRightPad.y = screen.height / 2 - playerRightPad.height / 2

    ball.x = screen.width / 2 - ball.width / 2
    ball.y = screen.height / 2 - ball.height / 2

    ball.vx = 2
    ball.vy = -2
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    if (isKeyDown('ArrowUp') && playerRightPad.y > 0) {
        playerRightPad.y = playerRightPad.y - 2
    }
    if (isKeyDown('ArrowDown') && playerRightPad.y + playerRightPad.height < screen.height) {
        playerRightPad.y = playerRightPad.y + 2
    }
    if (isKeyDown('KeyW') && playerLeftPad.y > 0) {
        playerLeftPad.y = playerLeftPad.y - 2
    }
    if (isKeyDown('KeyS') && playerLeftPad.y + playerLeftPad.height < screen.height) {
        playerLeftPad.y = playerLeftPad.y + 2
    }

    ball.x = ball.x + ball.vx
    ball.y = ball.y + ball.vy

    if (ball.y + ball.height >= screen.height || ball.y <= 0) {
        ball.vy = -ball.vy
    }

    if (aabb(ball, playerRightPad) || aabb(ball, playerLeftPad)) {
        ball.vx = -ball.vx
    }
}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(context) {
    // Dessine la raquette de gauche
    context.fillRect(playerLeftPad.x, playerLeftPad.y, playerLeftPad.width, playerLeftPad.height)

    // Dessine la raquette de droite
    context.fillRect(playerRightPad.x, playerRightPad.y, playerRightPad.width, playerRightPad.height)

    // Dessine la balle
    context.fillRect(ball.x, ball.y, ball.width, ball.height)
}
