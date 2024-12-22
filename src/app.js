const { Client, EmbedBuilder, ActivityType, SlashCommandBuilder, DiscordAPIError, GatewayIntentBits } = require('discord.js')
const {getRoles} = require('./database')

const { DISCORD_TOKEN } = process.env
if (!DISCORD_TOKEN) {
    console.error('No DISCORD_TOKEN provided, exiting...')
    process.exit()
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
    
})

client.on('ready', () => {
    console.log('Bot is ready!')
    // Create commands
    const createboard = new SlashCommandBuilder()
        .setName('createboard')
        .setDescription('Move the self roles board here')
    
    client.application.commands.create(createboard)
})

client.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName == 'createboard') {
        console.log(interaction.guild.presences.resolve(331768332032278530))
        const channel = client.channels.cache.get(interaction.channelId)
        const embed = createBoardEmbed(interaction.guildId)
        interaction.reply('Cool board!')
        .catch(err => {
            interaction.reply({
                content: ':warning: Unable to send messages in channel, check channel permissions and try again',
                ephemeral: true,
            })
            .then(result => {
                console.log(`Moved board for guild ${channel.guild.name} to ${channel.name}`)
            })
            })
    }
})

function createBoardEmbed(guildId) {
    const guild = client.guilds.cache.get(guildId)
    const roles = getRoles(guildId)
    
    return new EmbedBuilder()
        .setTitle(`Roles for ${guild.name}`)
    JSON.stringify(roles)
}

client.login(DISCORD_TOKEN)
