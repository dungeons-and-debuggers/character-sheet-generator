class CharacterSheet extends HTMLElement {
    #abilityScores = {
        STR: [12, 1],
        DEX: [16, 3],
        CON: [14, 2],
        INT: [12, 1],
        WIS: [13, 1],
        CHA: [10, 0],
    };
    
    set abilityScores (abilityScores) { this.#abilityScores = abilityScores; }
    
    get abilityScores () { return this.#abilityScores; }

    // ""  no proficiency
    // "H" half proficiency
    // "P" proficiency
    // "E" expertise

    #skills = {
        acrobatics: ['P', 'DEX', 7],
        animalHandling: ['P', 'WIS', 5],
        arcana: ['', 'INT', 1],
        athletics: ['', 'STR', 1],
        deception: ['', 'CHA', 0],
        history: ['P', 'INT', 5],
        insight: ['', 'WIS', 1],
        intimidation: ['', 'CHA', 0],
        investigation: ['E', 'INT', 9],
        medicine: ['', 'WIS', 1],
        nature: ['E', 'INT', 9],
        perception: ['E', 'WIS', 9],
        performance: ['', 'CHA', 0],
        persuasion: ['', 'CHA', 0],
        religion: ['', 'INT', 1],
        sleightOfHand: ['E', 'DEX', 11],
        stealth: ['E', 'DEX', 11],
        survival: ['E', 'WIS', 9],
    };

    set skills (skills) { this.#skills = skills; }
    
    get skills () { return this.#skills; }

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
    }
    
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

    static observedAttributes = [
        'class'
    ];

    attributeChangedCallback(name, oldValue, newValue) {
        console.log({
            name,
            oldValue,
            newValue
        })
    }

    connectedCallback() {
        console.log('connected callback');
    }

    disconnectedCallback() {
        console.log('disconnected callback');
    }

    adoptedCallback() {
        console.log('adopted callback');
    }

    constructor() {
        super();
        this.innerHTML = 'ciao';
    }
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