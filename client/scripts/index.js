
import camHandler from "./takePicture.js";
const btns = document.querySelectorAll('.btn');


const renderImages = async () => {  

    const thumbsContainer = document.querySelector('.thumbs-test');
    const response = await fetch('http://localhost:3008/images/dontclick').then(response => response.json());
    thumbsContainer.innerHTML = '';
    response.forEach((image) => {
      thumbsContainer.innerHTML += `<img src="http://localhost:3008/dontclick/${image.image}.png" alt="image" width="180px"/>`;
    });

};

// Vi løber igennem alle knapperne og tilføjer en eventlistener til hver knap.
btns.forEach( (btn) => {

    btn.addEventListener('click', (e) => {

        camHandler.takepicture();
        e.target.classList.toggle('active');
        // renderImages();

    })

})

camHandler.startup();
// renderImages();


