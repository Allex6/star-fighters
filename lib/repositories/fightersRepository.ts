import postgres from './../databases/postgres';
    
async function create(data: { username: string, wins: number, losses: number, draws: number }){

    const { username, wins, losses, draws } = data;

    await postgres.query(`
        INSERT INTO fighters (username, wins, losses, draws)
        VALUES ($1, $2, $3, $4)
    `, [username, wins, losses, draws]);

}

async function getByUsername(username: string){

    const { rows: fighters } = await postgres.query(`
        SELECT * FROM fighters
        WHERE username = $1
        LIMIT 1
    `, [username]);

    return (fighters.length > 0) ? fighters[0] : null;

}

async function list(){

    const { rows: fighters } = await postgres.query(`
        SELECT * FROM fighters
        ORDER BY wins DESC, draws DESC
    `);

    return fighters;

}

async function increaseWins(username: string){

    await postgres.query(`
        UPDATE fighters
        SET wins = wins + 1
        WHERE username = $1
    `, [username]);

}

async function increaseLosses(username: string){

    await postgres.query(`
        UPDATE fighters
        SET losses = losses + 1
        WHERE username = $1
    `, [username]);

}

async function increaseDraws(username: string){

    await postgres.query(`
        UPDATE fighters
        SET draws = draws + 1
        WHERE username = $1
    `, [username]);

}

export default {
    create,
    getByUsername,
    list,
    increaseWins,
    increaseLosses,
    increaseDraws
}