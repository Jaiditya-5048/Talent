
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



