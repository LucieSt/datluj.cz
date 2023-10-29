import typeSound from './sounds/type.wav';
import doneSound from './sounds/done.wav';
import wrongTypeSound from './sounds/wrong-type.wav'

export function playSound(requestedSound) {
    let sound = undefined;
    if (requestedSound === 'typeSound') {
        sound = typeSound;
    } else if (requestedSound === 'doneSound') {
        sound = doneSound;
    } else if (requestedSound === 'wrongTypeSound') {
        sound = wrongTypeSound;
    };
    const audioElement = new Audio(sound);
    audioElement.play();
}