var _readers = readers;
var _mosques = mosques;
var _schedules = schedules.filter(r => r.date < new Date());

(function () {

    const urlParams = new URLSearchParams(window.location.search);
    const mosqueId = +urlParams.get('mosqueId');
    const readerId = +urlParams.get('readerId');

    if (mosqueId > 0) {

        let mosque = _mosques.find(m => m.id == mosqueId);
        document.getElementById("type").innerHTML = 'قراء مسجد ';
        document.getElementById("mosque-name").innerHTML = mosque.name;

        _schedules.forEach(scheduleItem => {
            let mosqueSchedules = scheduleItem.mosqueReaders.find(r => r.mosqueId == mosqueId);
            let mosqueReaders = _readers.filter(r => mosqueSchedules?.readerIds?.includes(r.id));
            let reader = drawReaderElement(scheduleItem.day, scheduleItem.dayName, mosqueReaders, "القارئ", "readerId", 135);
            document.getElementById("mosque-readers").appendChild(reader);
        });

    } else {

        let reader = _readers.find(r => r.id == readerId);
        document.getElementById("type").innerHTML = 'القارئ ';
        document.getElementById("mosque-name").innerHTML = reader.name;
        document.getElementById("reader-photo").innerHTML = `<img src="./assets/img/readers/${reader.imageUrl?.length ? reader.imageUrl : 'default-reader.png'}">`;

        _schedules.forEach(item => {
            let mosqueSchedule = item.mosqueReaders.find(r => r.readerIds.includes(readerId));
            let mosque = _mosques.find(r => r.id == mosqueSchedule?.mosqueId);
            let mosqueCard = drawReaderElement(item.day, item.dayName, mosque ? [mosque] : [], "المسجد", "mosqueId", 125);
            document.getElementById("mosque-readers").appendChild(mosqueCard);
        });

    }
})();

function drawReaderElement(day, dayName, readers, placeHolder, segment, height) {
    let divElement = document.createElement("div");
    divElement.className += `col-lg-3 col-md-6`;

    let unavailable = `<h4 class="title">
                            <span class="text-muted">${placeHolder} : </span>
                            <span>غير متوفر</span>
                        </h4>`;

    let personElement = `<div class='persons'><h4 class='title'><span class='text-muted'>اليوم : </span> ${dayName}</h4>`;

    if (readers?.length) {
        readers.forEach(reader => {
            let readerElement = `<h4 class="title">
                                    <span class="text-muted">${placeHolder} : </span>
                                    <a href="./mosque-readers.html?${segment}=${reader.id}">${reader.name}</a>
                                </h4>`;
            personElement += reader.id > 0 ? readerElement : unavailable;
        });
    } else {
        personElement += unavailable;
    }

    personElement += '</div>';

    let iconBoxElement = `<div class='icon-box' data-aos='fade-up' style='height: ${height}px'>
                            <div class='icon'>
                                <span>ليلة</span
                                <span>${day} رمضان</span>
                            </div>
                            ${personElement}
                        </div>`;

    divElement.innerHTML += iconBoxElement;
    return divElement;
}
