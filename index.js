
let listOfVideos = document.getElementById("listOfVideos");

const handleDownload = async () => {

    let playlistId = document.getElementById("urlId").value;
    if (playlistId) {
        const ind = playlistId.lastIndexOf("list=");
        if (ind > 0) {
            playlistId = playlistId.substring(ind + 5);
            const getData = await fetch(`https://youtube-downloader-api-vbw7.vercel.app/sendplaylistid`, {
                method: "POST",
                body: JSON.stringify({ playlistId: playlistId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await getData.json();
            let liList;
            for (let content of data.data) {
                const videoId = content["contentDetails"].videoId;
                const urlOfVideo = `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`;
                liList += `<li class="text-primary">${urlOfVideo}<span class="ml-5 text-success">in process</span></li>`;
                function closer(videoId) {
                    setTimeout(() => {
                        window.open(`https://youtube-downloader-api-vbw7.vercel.app/download?URL=https://www.youtube.com/watch?v=${videoId}`, "_blank");
                    }, 3000);
                }
                closer(videoId);

            }
            listOfVideos.innerHTML = liList;
        }
    }
}

