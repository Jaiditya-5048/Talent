class Dom {
  constructor() {}

  public addClass(id: string, classList: string) {
    const element = document.getElementById(id);
    element?.classList.add(...classList.split(' '));
  }

  public removeClass(id: string, classList: string) {
    const element = document.getElementById(id);
    element?.classList.remove(...classList.split(' '));
  }
}

function showToast(id: string) {
  const dom = new Dom();
  dom.removeClass(id, 'hidden');

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    dom.addClass(id, 'hidden');
  }, 3000);
}

class Whishlist {
  private user_id: string;
  private locationName: string;

  constructor(user_id: string, locationName: string) {
    this.user_id = user_id;
    this.locationName = locationName;
  }

  private changeColorToRed() {
    const dom = new Dom();
    dom.removeClass('heartIcon', 'text-white');
    dom.addClass('heartIcon', 'text-red-500');
  }

  private changeColorTowhite() {
    const dom = new Dom();
    dom.removeClass('heartIcon', 'text-red-500');
    dom.addClass('heartIcon', 'text-white');
  }

  async checkHeartColor() {
    const whishlist = await getWhishlistAPI(this.user_id);
    const pTagFlag = document.getElementById('fav_btn_flag') as HTMLParagraphElement;

    if (whishlist === null) {
    } else {
      console.log(whishlist);
      if (whishlist.fav_locations.includes(this.locationName)) {
        this.changeColorToRed();
        pTagFlag.innerHTML = 'true';
      } else {
        this.changeColorTowhite();
        pTagFlag.innerHTML = 'false';
      }
    }
  }

  async handleWhishlistBtn(e: Event) {
    console.log(e);
    e.preventDefault();
    const whishlist = await getWhishlistAPI(this.user_id);
    console.log('whishlist origin :', whishlist);
    if (whishlist !== null) {
      const pTagFlag = document.getElementById('fav_btn_flag') as HTMLParagraphElement;
      const pTagFlagValue = pTagFlag.textContent;
      if (pTagFlagValue === 'true') {
        const updatedLocationArr =
          whishlist?.fav_locations?.filter((location: string) => location !== this.locationName) ??
          [];
        updatedLocationArr.sort();

        whishlist.fav_locations = updatedLocationArr;

        pTagFlag.textContent = 'false';
        replaceWishlist(this.user_id, whishlist);

        this.changeColorTowhite();
      } else {
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

  // async removeCity(city:string) {
  //   const whishlist = await getWhishlistAPI(this.user_id);
  //   if (whishlist === null) return ;
  //   const updatedLocationArr =
  //     whishlist?.fav_locations?.filter((location: string) => location !== this.locationName) ?? [];
  //   updatedLocationArr.sort();
  //   replaceWishlist(this.user_id, whishlist);
  //   this.checkHeartColor();
  // }
}
