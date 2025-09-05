var numberOfHomeAdvicesText = 3;
var numberOfHomeAdvicesVideo = 3;

function drawAdviceTexts(){
    if(advicesText.length <= numberOfHomeAdvicesText && document.getElementById("more-advices-btn")){
        document.getElementById("more-advices-btn").style.display = "none";
    }

    let homeAdvices = document.getElementById("advices");
    let idAdvicesSection = homeAdvices ? "advices" : "allAdvices";
    if(idAdvicesSection){
        advicesText.slice(0, homeAdvices ? numberOfHomeAdvicesText : advicesText.length).forEach(item => {
            let advice = drawAdviceTextElement(item.type, item.title, item.description);
            document.getElementById(idAdvicesSection).appendChild(advice);
        });
    }
}

function drawAdviceTextElement(type, title, description) {
    let divElement = document.createElement("div");
    divElement.className += `col-lg-4 col-md-6`;

    divElement.innerHTML += `<div class="icon-box" data-aos="fade-up">
                                <p class="description">${description}</p>
                                <div class="icon">${type}</div>
                            </div>`;

    return divElement;
}

function drawAdviceVideos(){
    let homeAdviceVideos = document.getElementById("homeAdviceVideos");
    let idAdviceVideosSection = homeAdviceVideos ? "homeAdviceVideos" : "allAdvicesVideos";
    if(idAdviceVideosSection){
        advicesVideo.slice(0, homeAdviceVideos ? numberOfHomeAdvicesVideo : advicesVideo.length).forEach(item => {
            let advice = drawAdviceVideoElement(item.type, item.presenter, item.day);
            document.getElementById(idAdviceVideosSection).appendChild(advice);
        });
    }
}

function drawAdviceVideoElement(type, presenter, day) {
    let divElement = document.createElement("div");
    divElement.className += `col-lg-4 col-md-6`;

    divElement.innerHTML += `<div class="icon-box advice-video-card" data-aos="fade-up">                            
                                <video class="w-100" controls>
                                    <source src="https://youtu.be/YIoCS1iVclU" type="video/mp4" />
                                </video>
                                <div class="advice-video-info text-right">
                                    <h4 class="title">
                                        <span class="text-muted">التصنيف : </span> ${type}
                                    </h4>
                                    <hr/>

                                    <h4 class="title">
                                        <span class="text-muted">المقدم : </span> ${presenter}
                                    </h4>
                                    <hr/>
                                    
                                    <h4 class="title">
                                        <span class="text-muted">اليوم : </span> ${day}
                                    </h4>
                                </div>
                            </div>`;

    return divElement;
}
