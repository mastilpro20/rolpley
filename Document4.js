const textElement = document.getElementById('text');
const optionsElement = document.getElementById('options');

let state = {
    inventory: []
};

function startGame() {
    state = { inventory: [] };
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.addEventListener('click', () => selectOption(option));
            optionsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: 'Te despiertas en un bosque oscuro. Puedes ir al norte o al este.',
        options: [
            {
                text: 'Ir al norte',
                nextText: 2
            },
            {
                text: 'Ir al este',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'Llegas a un claro. Ves una casa.',
        options: [
            {
                text: 'Entrar a la casa',
                nextText: 4
            },
            {
                text: 'Volver al bosque',
                nextText: 1
            }
        ]
    },
    {
        id: 3,
        text: 'Encuentras un río. No puedes cruzarlo.',
        options: [
            {
                text: 'Volver al bosque',
                nextText: 1
            }
        ]
    },
    {
        id: 4,
        text: 'Entras a la casa y encuentras un tesoro!',
        options: [
            {
                text: '¡Has ganado! Jugar de nuevo.',
                nextText: -1
            }
        ]
    }
];

startGame();