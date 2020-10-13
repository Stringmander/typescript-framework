export class UserForm {
  constructor(public parent: Element) {}

  eventsMap(): { [key: string]: () => void }  {
    return {
      'click: button': this.onButtonClick,
      'mouseenter: h1': this.onHeaderHover
    };
  }

  onHeaderHover(): void {
    console.log('H1 was hovered over')
  }

  onButtonClick(): void {
    console.log('Hello World!')
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <input />
        <button>Click Me</button>
      </div>
    `
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      });
    }
  }

  render(): void {
    const templateELement = document.createElement('template');
    templateELement.innerHTML = this.template();

    this.bindEvents(templateELement.content);

    this.parent.append(templateELement.content);
  }
}