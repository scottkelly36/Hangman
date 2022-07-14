const word = document.getElementById('word');
const wrongLetters =
	document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('replay');
const popup = document.getElementById('popup-container');
const notification = document.getElementById(
	'notification-container'
);
const finalMessage =
	document.getElementById('final-message');

const figureParts =
	document.querySelectorAll('.figure-part');
const wrongLettersList = document.getElementById(
	'wrong-letter-list'
);

const words = [
	'CANNY',
	'GANNIN YEM',
	'AM CLAMMING',
	'I DIVVINA',
	'GIZ A DEEK',
	'IN A FETTLE',
	'HOWAY',
	'AYE',
	'HADDAWAY',
	'BAIRN',
	'GADGIE',
	'RADGIE',
	'YEM',
	'BELTA',
	'HINNY',
	'SCRAN',
	'MARRA',
	'SPELK',
	'CLARTY',
	'DOYLEM',
	'KETS',
	'NEBBY',
	'WAZZOCK',
	'MAM',
];

let selectedWord =
	words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLettersArray = [];

function displayWord() {
	selectedWord.split('').forEach((letter) => {
		if (letter === ' ') {
			let newLetter = document.createElement('div');
			newLetter.classList.add('space');
			word.appendChild(newLetter);
		} else {
			let newLetter = document.createElement('div');
			newLetter.classList.add('right-letter');
			newLetter.classList.add(`${letter}`);
			word.appendChild(newLetter);
		}
	});
}

function displayLetters(letter) {
	if (correctLetters.includes(letter)) {
		const selection = document.querySelectorAll(
			`.${letter}`
		);
		selection.forEach((newLetter) => {
			newLetter.innerText = `${letter}`;
		});
	}

	if (
		correctLetters.length ===
		selectedWord.split(' ').join('').length
	) {
		console.log(
			correctLetters.length,
			selectedWord.split(' ').join('').length
		);
		popup.style.display = 'flex';
	}
}

//updated wrong letters array
function updateWrongLetters(letter) {
	//display worng letters
	if (wrongLettersArray.length > 0) {
		wrongLetters.style.display = 'flex';
	}
	//input wrong letters
	const badLetter = document.createElement('li');
	badLetter.classList.add('letter');
	badLetter.innerText = `${letter}`;
	wrongLettersList.appendChild(badLetter);

	const errors = wrongLettersArray.length;

	figureParts.forEach((part, index) => {
		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	//check if lost
	if (errors === figureParts.length) {
		finalMessage.innerText = 'aw na yee lost man!';
		popup.style.display = 'flex';
	}
}

//show notification

function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

//check if won
function checkWon() {
	if (
		correctLetters.length ===
		selectedWord.split(' ').join('').length
	) {
		popup.style.display = 'flex';
	}
}

window.addEventListener('keydown', (e) => {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;

		if (selectedWord.includes(letter.toUpperCase())) {
			if (!correctLetters.includes(letter.toUpperCase())) {
				correctLetters.push(letter.toUpperCase());
				displayLetters(letter.toUpperCase());
			} else {
				showNotification();
			}
		} else {
			if (
				!wrongLettersArray.includes(letter.toUpperCase())
			) {
				wrongLettersArray.push(letter.toUpperCase());
				updateWrongLetters(letter);
			} else {
				showNotification();
			}
		}
	}
});

//restart game
playAgainBtn.addEventListener('click', () => {
	correctLetters.splice(0);
	wrongLettersArray.splice(0);

	selectedWord =
		words[Math.floor(Math.random() * words.length)];

	updateWrongLetters();
	window.location.reload();
	//popup.style.display = 'none';
});

displayWord();
