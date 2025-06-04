const validateName = (name) => {
    if ((name + "").length > 2) {
        return true;
    }
    return false;
};
function isJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
function readCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
async function callApi(url, data, authorization) {
    return new Promise((resolve) => {
        const jsonData = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr != null) {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if (authorization != null) {
            xhr.setRequestHeader('Authorization', 'Basic ' + authorization);
        }
        xhr.send(jsonData);
        return xhr;
    });
}
async function replaceElement(element) {
    var old_element = element;
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    return new_element;
}
function getDayMonthYear(d) {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year];
}
function timeSince(date) {
    let originalSeconds = Math.floor((new Date().getTime() - date) / 1000);
    var seconds = originalSeconds;
    var interval = Math.floor(seconds / 31536000);
    let returnstr = "";
    if (interval >= 1) {
        returnstr += Math.floor(interval) + (Math.floor(interval) == 1 ? " yr " : " yrs ");
        seconds = seconds - (interval * 31536000);
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        returnstr += Math.floor(interval) + (Math.floor(interval) == 1 ? " mth " : " mths ");
        seconds = seconds - (interval * 2592000);
    }
    if (originalSeconds >= 31536000) {
        return returnstr;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        returnstr += Math.floor(interval) + (Math.floor(interval) == 1 ? " day " : " days ");
        seconds = seconds - (interval * 86400);
    }
    if (originalSeconds >= 2592000) {
        return returnstr;
    }
    console.log('ago', seconds, interval, Math.floor((new Date().getTime() - date) / 1000));
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        returnstr += Math.floor(interval) + (Math.floor(interval) == 1 ? " hr " : " hrs ");
        seconds = seconds - (interval * 3600);
    }
    if (originalSeconds >= 86400) {
        return returnstr;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        returnstr += Math.floor(interval) + (Math.floor(interval) == 1 ? " min " : " mins ");
        seconds = seconds - (interval * 60);
    }
    if (originalSeconds >= 3600) {
        return returnstr;
    }
    if (seconds > 0) {
        returnstr += Math.floor(seconds) + (Math.floor(seconds) == 1 ? " sec " : " seconds ");
    }
    return returnstr;
}
const exportFunctions = {
    callApi, validateName, readCookie, replaceElement, getDayMonthYear, isJsonString, timeSince
};
export default exportFunctions;
//# sourceMappingURL=util.js.map