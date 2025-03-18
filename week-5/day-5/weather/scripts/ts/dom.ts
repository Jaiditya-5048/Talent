
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


function showToast(id:string) {
  const dom = new Dom();
  dom.removeClass(id, 'hidden');

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    dom.addClass(id, 'hidden');
  }, 3000);
}


