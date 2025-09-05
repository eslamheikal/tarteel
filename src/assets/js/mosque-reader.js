var _mosques = mosques;

(function () {
    _mosques.sort((a, b) => a.name.localeCompare(b.name));
    _mosques.forEach(item => {
        let mosque = drawMosqueElement(item.id, item.name, item.address, item.imageUrl);
        document.getElementById("mosques").appendChild(mosque);
    });
})();

function drawMosqueElement(id, name, address, imageUrl) {
    let divElement = document.createElement("a");
    divElement.href = "./mosque-readers.html?mosqueId=" + id;
    divElement.className += `col-lg-3 col-md-6 d-flex align-items-stretch mosque-card`;

    divElement.innerHTML += `<div class='member w-100' data-aos='fade-up' >
                                <div class='member-img'><img class='img-fluid' height='10rem' width='100%' src='./assets/img/mosques/${imageUrl?.length ? imageUrl : 'default-mosque.jpg'}' ></div>
                                <div class='member-info'><h4><span class='text-muted'>مسجد : </span>${name}</h4></div>
                            </div>`;

    return divElement;
}
