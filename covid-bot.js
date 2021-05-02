const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content === '!covid') {

    const response = await fetch('https://api.covid19api.com/total/country/finland').then(response => response.json());
    const latestInfo = response[response.length - 1];
    const yesterdaysInfo = response[response.length - 2];
    let newConfirmed = latestInfo["Confirmed"] - yesterdaysInfo["Confirmed"];
    let confirmed = latestInfo["Confirmed"];
    let deaths = latestInfo["Deaths"];
    let recovered = latestInfo["Recovered"];
    let activeCases = latestInfo["Active"];

    msg.reply(`PÄIVÄN KORONASETIT KOTIMAASSA\n${newConfirmed} uutta tapausta\nConfirmed: ${confirmed}\nDeaths: ${deaths}\nRecovered: ${recovered}\nActive: ${activeCases}\n`);
  }
});

client.login(token);