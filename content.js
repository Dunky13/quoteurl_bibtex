
function capitalize(str, lower = false) {
    return (lower ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}

function splitAuthor(title) {
    const authorSeparators = [" - ", "by"];
    let obj = {
        title: title,
        author: ""
    }

    const lowerTitle = title.toLowerCase();

    for (const divider of authorSeparators) {
        if (!lowerTitle.includes(divider)) continue;

        const splitted = lowerTitle.split(divider);

        if (obj.title === title) {
            obj.title = capitalize(splitted[0], true).trim();
        }
        obj.author = capitalize(splitted[splitted.length - 1], true).trim();
    }

    return obj;
}

function getAuthorLDJSON(authObj) {
    const authOptions = ["name"];
    if (typeof authObj === 'string') return authObj;
    for (const ao of authOptions) {
        if (ao in authObj) return authObj[ao];
    }
    return "";
}

function parseLDJSON(jsondata) {
    try {
        const data = JSON.parse(jsondata);
        if (data["@type"] === "Organization") return {};
        
        return {
            date: new Date(data["datePublished"]),
            title: data["headline"],
            author: getAuthorLDJSON(data["author"])
        };
    } catch (e) {
        return {};
    }
}

async function quote() {
    const titleAuthor = splitAuthor(document.title);
    let title = titleAuthor.title;
    let author = titleAuthor.author;
    let date = new Date();
    const url = document.URL;

    const ldjsonElements = document.querySelectorAll('script[type="application/ld+json"]');

    if (ldjsonElements.length > 0) {
        for (const script of ldjsonElements) {
            const obj = parseLDJSON(script.innerHTML);
            if (obj && Object.keys(obj).length > 0) {
                title = obj.title ?? title;
                author = obj.author ?? author;
                date = obj.date ?? date;
            }
        }
    }

    return `@misc{${author.slice(0, 4).toLowerCase()}${date.getFullYear()}${title.slice(0, 4).toLowerCase()},
    title={${title}},
    author={${author}},
    year={${date.getFullYear()}},
    month={${date.getMonth() + 1}},
    url={${url}}
}`;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

// Execute the main functionality
quote().then(copyToClipboard).catch(console.error);
