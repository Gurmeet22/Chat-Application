const rooms = []

const addRoom = (room) => {
    room = room.trim().toLowerCase()
    if(!room){
        return
    }
    const existingRoom = rooms.find((rum) => rum === room)
    if(existingRoom){
        return
    }
    rooms.push(room)
}

const getRooms = () => {
    return rooms
}

module.exports = {
    addRoom,
    getRooms
}