/**
 * This is an example that shows how to download youtube videos using node.js
 */
const express = require('express');
const ytdl = require('youtube-dl');
const app = express();
const port = 3000;

// return the info of a video using ytdl
function getInfo(videoURL, flags = []) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(videoURL, flags, (err, info) => {
            err ? reject(err) : resolve(info);
        });
    });
}

app.get('/video/:videoId', (req, res) => {
    const url = `https://www.youtube.com/watch?v=${req.params.videoId}`;
    return getInfo(url)
        .then((info) => {
            const videoFormats = info.formats
            // take only the video formats (skip audio)
                .filter(({format_note}) => {
                    return !format_note.toLowerCase().includes('audio')
                })
                // sort by quality
                .sort((v1, v2) => {
                    return v2.quality - v1.quality
                });
            // choose the best video
            const bestVideo = videoFormats[0];
            // redirect to the video
            res.redirect(bestVideo.url);
        })
        .catch(err => res.status(500).json(err));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened 😥', err)
    }
    console.log(`server is listening on http://localhost:${port}/   🚀`);
    console.log(`You can try out: http://localhost:${port}/video/GVzHPW6GkL4`);
});
