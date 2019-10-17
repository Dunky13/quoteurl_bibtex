String.prototype.capitalize = function (lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

const authorSeparators = [" - ", "by"];

function splitAuthor(title) {
    let obj = {
        title: title,
        author: ""
    }

    let a = title.toLowerCase();

    for (let divider of authorSeparators) {
        if (a.indexOf(divider) < 0) continue;

        let splitted = a.split(divider);

        if (obj.title === title) obj.title = splitted[0].capitalize(true).trim();
        obj.author = splitted[splitted.length - 1].capitalize(true).trim();
    }

    return obj;
}

function getAuthorLDJSON(authObj) {
    const authOptions = ["name"];
    if (authObj.constructor === String) return authObj;
    for (let ao of authOptions) {
        if (ao in authObj) return authObj[ao];
    }
    return "";
}

function parseLDJSON(jsondata) {
    let obj = {}
    try {
        let data = JSON.parse(jsondata);
        if (data["@type"] === "Organization") return obj;
        obj.date = new Date(data["datePublished"]);
        obj.title = data["headline"];
        obj.author = getAuthorLDJSON(data["author"]);
        // };

        return obj;
    }
    catch (e) {
        return;
    }
}

function quote() {
    let titleAuthor = splitAuthor(document.title);

    let title = titleAuthor.title;
    let author = titleAuthor.author;
    let date = new Date();
    let url = document.URL;

    let ldjson = document.querySelectorAll('script[type="application/ld+json"]');

    if (ldjson.length > 0) {
        for (let scrpt of ldjson) {
            let obj = parseLDJSON(scrpt.innerHTML);
            if (typeof obj !== "undefined" && Object.keys(obj).length > 0 && obj.constructor === Object) {
                title = obj.title;
                author = obj.author;
                date = obj.date
            }
        }
    }



    let retVal = `@misc{${author.slice(0, 4).toLowerCase()}${date.getFullYear()}${title.slice(0, 4).toLowerCase()}
    title={${title}},
    author={${author}},
    year={${date.getFullYear()}},
    month={${date.getMonth() + 1}},
    url={${url}}
}`;
    return retVal;
}

function copyToClipboard(text) {
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
};

copyToClipboard(quote());
