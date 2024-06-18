const RSS_URL = 'https://cors-anywhere.herokuapp.com/https://medium.com/feed/@asbedb';

$.ajax({
    url: RSS_URL,
    dataType: "xml",
    success: function(data) {
        $(data).find("item").each(function() {
            const el = $(this);
            const contentEncoded = el.find("content\\:encoded").text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contentEncoded;
            const pTags = tempDiv.getElementsByTagName('p');
            const firstImg = tempDiv.querySelector('img');
            const firstImageUrl = firstImg ? firstImg.getAttribute('src') : 'img/medium.webp'; // Provide a default image URL if no <img> tag is found

            let firstTwoSentences = '';
            if (pTags.length > 0) {
                const firstPTagContent = pTags[0].textContent.trim();
                const sentences = firstPTagContent.split(/[\.\?!]\s+/);
                firstTwoSentences = sentences.slice(0, 1).join('. ');
            }
            //HTML Message-Embedder//
            const template = `
            <a href="${el.find("link").text()}" target="_blank">
                <div class="message-embed">
                    <div id="title" style="color: lightseagreen;">${el.find("title").text()}</div>
                    <div id="pub-date" class="post-pubdate">${el.find("pubDate").text()}</div>
                    <div id="post-image"><img class="message-embed-image" src="${firstImageUrl}"/></div>
                    <div id="leading-message" class="leading-message">${firstTwoSentences}</div>
                </div>
            </a>
            `;
            $("#rss-embed").append(template);
        });
    },
    error: function(xhr, status, error) {
        console.error("Error fetching RSS feed:", error);
    }
});