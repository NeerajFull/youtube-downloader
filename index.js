
let listOfVideos = document.getElementById("listOfVideos");

const handleDownload = async () => {

    let playlistId = document.getElementById("urlId").value;
    if (playlistId) {
        const ind = playlistId.lastIndexOf("list=");
        if (ind > 0) {
            playlistId = playlistId.substring(ind + 5);
            const getData = await fetch(`http://localhost:3000/sendplaylistid`, {
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
                        var newWindowAnchor = document.createElement('a');

                        // Set the href attribute to the URL you want to open
                        newWindowAnchor.href = `http://localhost:3000/download?URL=https://www.youtube.com/watch?v=${videoId}`;

                        // Set the target attribute to _blank to open in a new window
                        newWindowAnchor.target = '_blank';

                        // Append the anchor element to the document body
                        document.body.appendChild(newWindowAnchor);

                        // Simulate a click on the anchor element to open the new window
                        newWindowAnchor.click();
                        // window.open(`https://youtube-downloader-api-vbw7.vercel.app/download?URL=https://www.youtube.com/watch?v=${videoId}`, "_blank");
                    }, 3000);
                }
                closer(videoId);

            }
            listOfVideos.innerHTML = liList;
        }
    }
}

