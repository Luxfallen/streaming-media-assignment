const fs = require('fs');
const path = require('path');

// Retrieve the file
const getParty = (request, response) => {
    loadFile(request, response, '../client/party.mp4', 'video/mp4');
};

const loadFile = (request, response, fileLoc, fileType) => {
    const file = path.resolve(__dirname, fileLoc); // Returns async so file will be defined as soon as it's found
    fs.stat(file, (err, stats) => { // Returns err and stats, if stats is defined, there was a problem
        if (err) {
            if (err.code === 'ENOENT') { // ENOENT = Error No Entry, which means the file was not found
                response.writeHead(404);
            }
            return response.end(err);
        }
        //Removed because it's not user friendly
        /*
            const range = request.headers.range;
            if (!range) {
                return response.writeHead(416);
            }
        */

        // Tell the browser to start at the beginning of the file
        let range = request.headers.range;
        if (!range) {
            range = 'bytes=0-';
        }

        // Retrieve the beginning and end of the byte range
        const positions = range.replace(/bytes=/, '').split('-');
        let start = parseInt(positions[0], 10);
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        if (start > end) {
            start = end - 1;
        }

        // Tell the browser that it has some of the content and what the content is
        const chunksize = (end - start) + 1;
        response.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': fileType,
        });
        estabStream(file, start, end);
    });
}

const prepStream = () => 

// Establish video stream
const estabStream = (file, start, end) => {
    fs.createReadStream(file, {
        start,
        end
    });
    stream.on('open', () => { // Streams are async, so we need to check if it's ready, either open or error
        stream.pipe(response); // Send it if it's valid
    });
    stream.on('error', (streamErr) => {
        response.end(streamErr); // End it if there's an issue
    });
    return stream;
}

module.exports.getParty = getParty;
