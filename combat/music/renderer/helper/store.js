const store = new Store();
const uuidv4  = require('uuid/v4');
const path = require('path');

class DataStore extends store {
    constructor (settings) {
        super(settings)
        this.tracks = [];
    }
    saveTracks () {
        this.set('tracks', this.tracks)
        return this
    }
    getTracks () {
        return this.get('tracks') || []
    }
    addTracks (tracks) {
        const tracksWithProps = tracks.map( track => {
            return {
                id: uuidv4(),
                path: track,
                fileName: path.basename(track)
            }
        }).filter( track => {
            const currentTracksPath = this.getTracks().map( track => track.path )  
            return currentTracksPath.indexOf(track.path) < 0
        })
        this.tracks = {...this.tracks, ...tracksWithProps}
        return this.saveTracks()
    }
    deleteTracks () {
        this.delete('tracks')
        return this
    }
}

module.exports = DataStore