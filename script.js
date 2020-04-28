/*
 * Dit is een array van alle "markers"
 *  - x & y bepalen de positie van de marker in % tegenover de achtergrond. 50/50 is dus knal in het midden.
 *  - url is de youtube url die moet afspelen in de tooltip
 *  - icon is de image uit /images die hij moet tonen als icoon
 */
const markers = [
    {
        name: 'test',
        url: 'https://www.youtube.com/watch?v=dP9KWQ8hAYk',
        icon: 'marker.svg',
        x: 50,
        y: 20
    },
    {
        name: 'test2',
        url: 'https://www.youtube.com/watch?v=7hkw4rw3ong',
        icon: 'marker.svg',
        x: 75,
        y: 75
    }
];

/*
 * Plaats alle markers uit de array hierboven + zet de tooltips aan.
 *
 */
markers.forEach( (marker) => {
    addMarker(marker);
});

enableTooltips();

/*
 * Methods, hoef je normaal gezien niet aan te komen.
 */
function addMarker(data) {
    // Create the marker
    const marker = document.createElement("div");
    marker.classList.add('marker');
    marker.style.left = data.x + '%';
    marker.style.top = data.y + '%';
    marker.style.backgroundImage = "url('images/" + data.icon + "')";
    marker.dataset.video = data.url; // Tooltips laden de youtube video op deze url in

    document.querySelector('.wrap').appendChild(marker);
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


