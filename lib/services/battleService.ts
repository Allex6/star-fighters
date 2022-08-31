import axios from 'axios';
import fightersRepository from '../repositories/fightersRepository';

function countStargazers(repos: { stargazers_count: number }[]){

    const totalStars = repos.reduce((prev, current) => prev + current.stargazers_count, 0);
    return totalStars;

}

async function createBattle(users: { firstUser: string, secondUser: string }){

    const { firstUser, secondUser } = users;
        
    const firstUserResponse = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
    const secondUserResponse = await axios.get(`https://api.github.com/users/${secondUser}/repos`);

    const totalFirstUser = countStargazers(firstUserResponse.data);
    const totalSecondUser = countStargazers(secondUserResponse.data);

    const firstFighter = await fightersRepository.getByUsername(firstUser);
    const secondFighter = await fightersRepository.getByUsername(secondUser);

    if(!firstFighter) await fightersRepository.create({
        username: firstUser,
        wins: 0,
        losses: 0,
        draws: 0
    });

    if(!secondFighter) await fightersRepository.create({
        username: secondUser,
        wins: 0,
        losses: 0,
        draws: 0
    });

    if(totalFirstUser > totalSecondUser){

        await fightersRepository.increaseWins(firstUser);
        await fightersRepository.increaseLosses(secondUser);

        return {
            winner: firstUser,
            loser: secondUser,
            draw: false
        }

    } else if(totalSecondUser > totalFirstUser) {

        await fightersRepository.increaseWins(secondUser);
        await fightersRepository.increaseLosses(firstUser);

        return {
            winner: secondUser,
            loser: firstUser,
            draw: false
        }

    } else {

        await fightersRepository.increaseDraws(firstUser);
        await fightersRepository.increaseDraws(secondUser);

        return {
            winner: null,
            loser: null,
            draw: true
        }

    }

}

export default {
    createBattle
}