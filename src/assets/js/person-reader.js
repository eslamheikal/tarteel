var _readers = readers;

(function () {
    _readers.sort((a, b) => a.name.localeCompare(b.name));
    _readers.filter(r => r.id > 0).forEach(item => {
        let reader = drawPersonElement(item.id, item.name, item.imageUrl);
        document.getElementById("psersons").appendChild(reader);
    });
})();

function drawPersonElement(id, name,  imageUrl) {
    let divElement = document.createElement("a");
    divElement.href = "./mosque-readers.html?readerId=" + id;
    divElement.className += `col-lg-3 col-md-6 d-flex align-items-stretch mosque-card`;

    divElement.innerHTML += `<div class='member w-100' data-aos='fade-up'>
                                <div class='member-img'>
                                    <img class='img-fluid' style='height: 14rem !important;' width='100%' src='./assets/img/readers/${imageUrl?.length ? imageUrl : 'default-reader.png'}'>
                                </div>
                                <div class="member-info">
                                    <h4><span class="text-muted">القارئ : </span>${name}</h4>
                                </div>
                            </div>`;

    return divElement;
}
