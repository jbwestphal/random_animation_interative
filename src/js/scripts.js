'use strict';

class AnimationGrid {

	constructor() {
		
	}

	initialize() { 

		let divBlock = '';
		let animaClass = 'main-anima';
		let $container = document.querySelector('.main-grid-wrapper');
		let randomNumber = Math.ceil(Math.random() * 6 + 1);
		let animationOrder = generateRandomOrder();
		let stopAnima = false;
	
		// first, creating a loop for make the grid in html
		for (let i = 1; i < 5; i++) {
			for (let j = 0; j < 8; j++) {
				divBlock+= '<div class="main-grid-wrapper-block" id="grid_block_'+i+'_'+j+'"><span></span></div>';
				$container.innerHTML = divBlock; 
			}
		}

		// Removes the first animation from the first array, to avoid repeating
		animationOrder.splice(animationOrder.indexOf(1), 1);

		// run animation function which it will be called by setinterval in runAnimation
		function runAnimationFunc() {
			// Gets from the array the animation type it will show now
			let animationType = animationOrder.shift();

			// Animates the block
			animateBlock(animationType, $container, animaClass);

			// Checks if the array is empty
			if (animationOrder.length == 0) {
				// Repopulates the array with 7 random numbers
				animationOrder = generateRandomOrder();

				// Removes the last animation from array, to avoid repeating
				animationOrder.splice(animationOrder.indexOf(animationType), 1);
			}
		}

		// types of animations
		function animateBlock(animateType, $container, animaClass) {
			setTimeout(function() {$container.classList.add(animaClass+''+animateType);}, 0);
			setTimeout(function() {$container.classList.add('animate-block-in')}, 0);

			setTimeout(function() {
				if(!stopAnima) {
					$container.classList.remove('animate-block-in');
				}
			}, 2000);
			setTimeout(function() {
				if(!stopAnima) {
					$container.classList.remove(animaClass+''+animateType);
				}
			}, 2700);
		}

		// Generate a random order of 7 uniques animations
		function generateRandomOrder() {
			let array = [];

			while (array.length < 2) {
				let randomNumber = Math.ceil(Math.random() * 7);

				if (array.indexOf(randomNumber) > -1) {
					continue;
				}

				array.push(randomNumber);
			}

			return array;
		}

		// Changes animation every 3 seconds
		let runAnimation = setInterval(runAnimationFunc, 3000);

		runAnimation;
		
		// Stop animation and active blocks for click
		document.querySelector('.main-grid-btn').addEventListener('click', function() {
			stopAnima = !stopAnima;
			clearInterval(runAnimation);
			document.querySelector('.main-grid-wrapper').classList.add('main-grid-inative');

		});

		// Call the random animation
		setTimeout(function() {
			animateBlock(randomNumber, $container, animaClass);
		}, 500);

		// Call the events
		this.attachEvents();

	}

	attachEvents() {

		let obj = this;

		let $wrapperBlock = document.getElementsByClassName('main-grid-wrapper-block');

		Array.from($wrapperBlock).forEach(function(element) {

			element.addEventListener('click', function(){
	
				obj.drawGrid(this);
	
			});

		});
		
	}

	drawGrid(el) {

		let obj = this;
		
		if( el.classList.contains('triangle-downleft') ) {

			el.setAttribute('class', 'main-grid-wrapper-block triangle-downright');

		} else if( el.classList.contains('triangle-downright') ) {

			el.setAttribute('class','main-grid-wrapper-block triangle-topright');

		} else if( el.classList.contains('triangle-topright') ) {

			el.setAttribute('class','main-grid-wrapper-block triangle-topleft');

		} else if( el.classList.contains('triangle-topleft') ) {

			el.setAttribute('class','main-grid-wrapper-block square-full');

		} else if( el.classList.contains('square-full') ) {

			el.setAttribute('class','main-grid-wrapper-block plus-sign');

		} else if( el.classList.contains('plus-sign') ) {

			el.setAttribute('class','main-grid-wrapper-block square-white');

		} else if( el.classList.contains('square-white') ) {

			el.setAttribute('class','main-grid-wrapper-block triangle-downleft');

		} else {
			el.classList.add('triangle-downleft');
		}
		

	}

}

export default AnimationGrid;

window.RandomAnimation = new AnimationGrid();

RandomAnimation.initialize();