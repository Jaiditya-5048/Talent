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
class Whishlist {
    user_id;
    locationName;
    constructor(user_id, locationName) {
        this.user_id = user_id;
        this.locationName = locationName;
    }
    changeColorToRed() {
        const dom = new Dom();
        dom.removeClass('heartIcon', 'text-white');
        dom.addClass('heartIcon', 'text-red-500');
    }
    changeColorTowhite() {
        const dom = new Dom();
        dom.removeClass('heartIcon', 'text-red-500');
        dom.addClass('heartIcon', 'text-white');
    }
    async checkHeartColor() {
        const whishlist = await getWhishlistAPI(this.user_id);
        const pTagFlag = document.getElementById('fav_btn_flag');
        if (whishlist === null) {
        }
        else {
            console.log(whishlist);
            if (whishlist.fav_locations.includes(this.locationName)) {
                this.changeColorToRed();
                pTagFlag.innerHTML = 'true';
            }
            else {
                this.changeColorTowhite();
                pTagFlag.innerHTML = 'false';
            }
        }
    }
    async handleWhishlistBtn(e) {
        console.log(e);
        e.preventDefault();
        const whishlist = await getWhishlistAPI(this.user_id);
        console.log('whishlist origin :', whishlist);
        if (whishlist !== null) {
            const pTagFlag = document.getElementById('fav_btn_flag');
            const pTagFlagValue = pTagFlag.textContent;
            if (pTagFlagValue === 'true') {
                const updatedLocationArr = whishlist?.fav_locations?.filter((location) => location !== this.locationName) ??
                    [];
                updatedLocationArr.sort();
                whishlist.fav_locations = updatedLocationArr;
                pTagFlag.textContent = 'false';
                replaceWishlist(this.user_id, whishlist);
                this.changeColorTowhite();
            }
            else {
                // whishlist[0].fav_locations.push(this.locationName);
                // whishlist[0].fav_locations.sort()
                // Object.defineProperty(whishlist, 'fav_locations', { value: whishlist });
                // replaceWishlist(this.user_id, whishlist);
                // this.changeColorToRed();
                const locationArr = whishlist.fav_locations;
                // console.log('locationArr' , locationArr);
                whishlist.fav_locations.push(this.locationName);
                whishlist.fav_locations.sort();
                console.log(whishlist);
                pTagFlag.textContent = 'true';
                replaceWishlist(this.user_id, whishlist);
                this.changeColorToRed();
            }
        }
    }
}
