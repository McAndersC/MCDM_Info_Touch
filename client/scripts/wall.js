
const serverPath = 'https://infohub.webmcdm.dk';

const renderImages = async () => {  

    const wallContainer = document.querySelector('.wall');
    const response = await fetch(`${serverPath}/images/dontclick`).then(response => response.json());
    wallContainer.innerHTML = '';
    response.forEach((image) => {
      wallContainer.innerHTML += `<img src="${serverPath}/dontclick/${image.image}.png" alt="image" width="180px"/>`;
    });

};

const socket = io.connect(serverPath);
socket.on("message", (args) => {

    console.log(args)


});

socket.on("dontclick", (args) => {

    console.log(args)
    renderImages();
});


renderImages(); 