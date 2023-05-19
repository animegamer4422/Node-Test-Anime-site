import fetch from 'node-fetch';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';

const host = 'https://animepahe.ru';
const apiURL = `${host}/api`;

const scriptPath = path.dirname(process.argv[1]);
const animeListFile = `${scriptPath}/anime.list`;


async function searchAnimeByName(name) {
  const response = await fetch(`${apiURL}?m=search&q=${name.replace(/ /g, '%20')}`);
  const data = await response.json();
  const total = data.total;

  if (total === 0) {
    return;
  }

  const animeList = data.data.map(anime => `[${anime.session}] ${anime.title}`);
  fs.appendFileSync(animeListFile, animeList.join('\n') + '\n');

  return animeList;
}

async function fetchAnimeById(sessionId) {
  const response = await fetch(`${apiURL}?m=release&id=${sessionId}`);
  const data = await response.json();

  if (!data || data.length === 0) {
    return;
  }

  return data;
}

async function fetchAnimeEpisodesById(sessionId, page = 1) {
  const response = await fetch(`${apiURL}?m=release&id=${sessionId}&sort=episode_asc&page=${page}`);
  const data = await response.json();

  if (!data || data.length === 0) {
    return;
  }

  return data;
}
  
  
  
  const argv = yargs(hideBin(process.argv)).options({
    'search': { type: 'string', demandOption: false },
    'ep': { type: 'string', demandOption: false },
}).argv;
  
  if (argv.search) {
    searchAnimeByName(argv.search)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  
  if (argv.ep) {
    fetchAnimeEpisodesById(argv.ep)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }