const camHandler = {

    width : 1024,
    height : 0,
    streaming : false,
    video : null,
    canvas : null,
    photo : null,

    clearphoto() {

        const context = canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        const data = this.canvas.toDataURL("image/png");
        this.photo.setAttribute("src", data);
    },

    async takepicture() {
        const context = canvas.getContext("2d");
        if (this.width && this.height) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            context.drawImage(video, 0, 0, this.width, this.height);
    
            const data = canvas.toDataURL("image/png");
            photo.setAttribute("src", data);

            const response = await fetch(data);
            const blob = await response.blob();

            //.replace("image/png", "image/octet-stream");
            const formData = new FormData();
            const fileName = "TEST1.png";
    
            // Appending Form Data
            formData.append("id", "dontclick_" + Date.now());
            formData.append("image", blob, fileName);
    
            console.log(fileName, formData.get('image'));



            fetch('https://infohub.webmcdm.dk/images/dontclick',  
            {
                method: 'POST',
                body: formData
            }).catch((err) => {console.log(err) });




        } else {
            this.clearphoto();
        }
    },

    startup() {

    
        this.video = document.getElementById("video");
        this.canvas = document.getElementById("canvas");
        this.photo = document.getElementById("photo");
    
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    
            navigator.mediaDevices.getUserMedia({ audio: false, video:true}).then((stream) => {

                this.video.srcObject =  stream;
                this.video.play();
    
            }).catch((err) => {
    
                console.error(`An error occurred: ${err}`);
    
            });
        }

        this.video.addEventListener("canplay", (ev) => {
            if (!this.streaming) {
                this.height = this.video.videoHeight / (this.video.videoWidth / this.width);
                this.video.setAttribute("width", this.width);
                this.video.setAttribute("height", this.height);
                this.canvas.setAttribute("width", this.width);
                this.canvas.setAttribute("height", this.height);
                this.streaming = true;
            }
        },
        false
        );

        this.clearphoto();
    }
};



export default camHandler;