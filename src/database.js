const data = {}

function getBoardMessage(guildId) {
    return data.get(guildId)?.get('board')
}

function setBoardMessage(guildId, boardId) {
    if (!data.includes(guildId)) {
        data[guildId] = {}
    }
    data[guildId]['board'] = boardId
}

function getRoles(guildId) {
    return data.get(guildId)?.get('roles')
}

function addRole(guildId, role) {
    if (!data.includes(guildId)) {
        data[guildId] = {}
    }
    if (!data.get(guildId).includes('roles')) {
        data[guildId]['roles'] = []
    }
    return data[guildId]['roles'].push(role)
}

module.exports = {getBoardMessage, setBoardMessage, getRoles, addRole}