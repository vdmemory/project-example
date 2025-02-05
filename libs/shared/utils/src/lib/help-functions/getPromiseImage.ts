export function getPromiseImage(url: string) {
    return new Promise(function (resolve, reject) {
        const img = new Image();
        img.onload = function () {
            resolve(url);
        };
        img.onerror = function () {
            reject(url);
        };
        img.src = url;
    });
}
