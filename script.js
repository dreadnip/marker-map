/*
 * Dit is een array van alle "markers"
 *  - x & y bepalen de positie van de marker in % tegenover de achtergrond. 50/50 is dus knal in het midden.
 *  - url is de youtube url die moet afspelen in de tooltip
 *  - icon is de image uit /images/pins die hij moet tonen als icoon. Je moet de extensie niet meegeven.
 */
const markers = [
    {
        name: 'test',
        url: 'https://www.youtube.com/watch?v=dP9KWQ8hAYk',
        icon: 'hout',
        x: 15,
        y: 30
    },
    {
        name: 'test2',
        url: 'https://www.youtube.com/watch?v=7hkw4rw3ong',
        icon: 'elektromechanica',
        x: 75,
        y: 75
    }
];

/*
 * Plaats alle markers uit de array hierboven op de achtergrond + zet de tooltips aan.
 */
markers.forEach( (marker) => {
    addMarker(marker);
});

enableTooltips();

/* ======================================================================
 * Alles hieronder zijn methods, hoef je normaal gezien niet aan te komen.
 * ====================================================================== */

function addMarker(data) {
    const marker = document.createElement("div");
    marker.classList.add('marker');
    marker.style.left = data.x + '%';
    marker.style.top = data.y + '%';
    marker.style.backgroundImage = "url('images/pins/" + data.icon + ".png')";
    marker.dataset.video = data.url;
    document.querySelector('.map-container').appendChild(marker);
}

/*
 * Toont een tooltip voor alle elementen met klasse .marker
 */
function enableTooltips() {
    tippy('.marker', {
        interactive: true,
        content: 'Laden...',
        allowHTML: true,
        onShow(instance) {
            instance.setContent(createYoutubeEmbed(instance.reference.dataset.video));
        },
        onShown(instance) {
            /*
             * Bug fix: manually set the width of the tooltip's inner container
             * after we load the youtube iframe in it.
             * Side effect: Tippy still think this container is only 350px wide
             * so it will not correctly show it on the left side of the marker
             * if the tooltip is too wide to fit on the screen. The 580px is 
             * only a cosmetic change at the last second
             */
            instance.popper.querySelector('.tippy-box').style.maxWidth = '580px';
        },
    });
}

/*
 * Maakt een Youtube embed iframe aan
 */
function createYoutubeEmbed(url) {
    const frame = document.createElement('iframe');
    frame.width = '560';
    frame.height = '315';
    frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('allowfullscreen', 'allowfullscreen');
    frame.src = transformEmbedUrl(url);
    return frame;
}

/*
 * Vormt een gewone Youtube URL om naar een embed URL
 */
function transformEmbedUrl(url) {
    const code = url.split("=")[1];
    return 'https://www.youtube.com/embed/' + code;
}


