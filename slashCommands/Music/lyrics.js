const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "lyrics",
    aliases: [],
    description: "Display lyrics of a song",
    category: "music",
    checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: false,
    },

    run: async (client, interaction, queue) => {

        let song = queue.songs[0].name;
        let lyrics = null;
        try {
            lyrics = await client.lyrics.songs.search(song)?.searches[0]?.lyrics();
            let lyricsEmbed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setTitle(`Lyrics`)
                .setDescription(`**${song}**\n${lyrics || `Couldn't find any lyrics`}`);

            if (lyrics.length > 2048) {
                lyricsEmbed.setDescription(lyrics.substring(0, 2045));
            }

            interaction.reply({ embeds: [lyricsEmbed], ephemeral: true });
        } catch (err) {
            interaction.reply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        }
    }
};