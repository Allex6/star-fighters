import fightersRepository from '../repositories/fightersRepository';

async function list(){

    const fighters = await fightersRepository.list();
    return {
        fighters
    };

}

export default {
    list
}