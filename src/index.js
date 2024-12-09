import { createState, state } from './state.js';

// @ts-ignore
self.state = state;

class CharacterSheet extends HTMLElement {
  //#region props

  // ""  no proficiency
  // "H" half proficiency
  // "P" proficiency
  // "E" expertise

  #species = 'half-elf';

  // dwarf
  // elve
  // human
  // gnomi
  // insetti
  // draconidi
  // goliat
  // orchi
  // tifling
  // centauri

  #classe = {
    guerriero: 5,
    ladro: 6,
  };

  // [
  //     'barbaro',
  //     'bardo',
  //     'chierico',
  //     'druido',
  //     'guerriero',
  //     'monaco',
  //     'maestro',
  //     'paladino',
  //     'ranger',
  //     'ladro',
  //     'stregone',
  //     'warlock',
  //     'wizard',
  //     'artificiere',
  // ];

  #proficiency = 4;

  #initiative = 3;

  #armorClass = 14;

  #hp = 60;

  #speed = 30;
  //#endregion

  constructor() {
    super();
    this.#state = createState(state);
    this.render();

    // @todo implementare slot come con lo shadow dom ma senza lo shadow dom

    document.addEventListener('state.change', (e) => {
      this.render();
      console.log(e);
    });
  }

  #state;

  render(rows = '') {
    // @todo fare render con dom-diffing
    for (const skill in this.#state.skills) {
      const [expertise, ability, bonus] = this.#state.skills[skill];
      rows += `
      <tr>
        <th>${skill}</th>
        <th>${expertise}</th>
        <th>${ability}</th>
        <th>${bonus}</th>
      </tr>
    `;
    }

    this.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>skill</th>
          <th>expertise</th>
          <th>ability</th>
          <th>bonus</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
      <tfoot>
      </tfoot>
    </table>
    `;
  }

  //#region lifecycle
  static observedAttributes = ['class'];

  attributeChangedCallback(name, oldValue, newValue) {
    console.log({
      name,
      oldValue,
      newValue,
    });
  }

  connectedCallback() {
    console.log('connected callback');
    // @todo vedere perché non va bene agganciare eventi
  }

  disconnectedCallback() {
    console.log('disconnected callback');
  }

  adoptedCallback() {
    console.log('adopted callback');
  }
  //#endregion
}

customElements.define('character-sheet', CharacterSheet);

// class ErBottone extends HTMLButtonElement {
//     constructor() {
//         super();
//         this.innerHTML = 'press me';
//     }
// }

// customElements.define('er-bottone', ErBottone, {
//     extends: 'button'
// });
