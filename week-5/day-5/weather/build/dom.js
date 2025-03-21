"use strict";
class Dom {
    constructor() { }
    addClass(id, classList) {
        const element = document.getElementById(id);
        element?.classList.add(...classList.split(' '));
    }
    removeClass(id, classList) {
        const element = document.getElementById(id);
        element?.classList.remove(...classList.split(' '));
    }
}
function showToast(id) {
    const dom = new Dom();
    dom.removeClass(id, 'hidden');
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        dom.addClass(id, 'hidden');
    }, 3000);
}
