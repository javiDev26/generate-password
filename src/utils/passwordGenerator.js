const CHARACTER_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const AMBIGUOUS_CHARACTERS = new Set(["O", "0", "l", "1", "I"]);

function removeAmbiguousCharacters(characters) {
  return [...characters]
    .filter((character) => !AMBIGUOUS_CHARACTERS.has(character))
    .join("");
}

function randomInteger(max) {
  if (window.crypto?.getRandomValues) {
    const value = new Uint32Array(1);
    window.crypto.getRandomValues(value);
    return value[0] % max;
  }

  return Math.floor(Math.random() * max);
}

function pickRandom(characters) {
  return characters[randomInteger(characters.length)];
}

function shuffleCharacters(characters) {
  const shuffled = [...characters];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInteger(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.join("");
}

export function getActiveTypes(options) {
  return ["uppercase", "lowercase", "numbers", "symbols"].filter(
    (type) => options[type],
  );
}

export function generatePassword(options) {
  const length = Math.min(Math.max(Number(options.length) || 16, 6), 32);
  const activeTypes = getActiveTypes(options);

  if (activeTypes.length === 0) {
    return {
      password: "",
      error: "Selecciona al menos un tipo de caracter.",
    };
  }

  const enabledSets = activeTypes
    .map((type) => {
      const characters = options.excludeAmbiguous
        ? removeAmbiguousCharacters(CHARACTER_SETS[type])
        : CHARACTER_SETS[type];

      return { type, characters };
    })
    .filter(({ characters }) => characters.length > 0);

  const characterPool = enabledSets.map(({ characters }) => characters).join("");

  if (!characterPool) {
    return {
      password: "",
      error: "No hay caracteres disponibles con esta configuracion.",
    };
  }

  const requiredCharacters = enabledSets
    .slice(0, length)
    .map(({ characters }) => pickRandom(characters));

  const remainingCharacters = Array.from(
    { length: length - requiredCharacters.length },
    () => pickRandom(characterPool),
  );

  return {
    password: shuffleCharacters([...requiredCharacters, ...remainingCharacters]),
    error: "",
  };
}

export function calculateStrength({ length, uppercase, lowercase, numbers, symbols }) {
  const variety = [uppercase, lowercase, numbers, symbols].filter(Boolean).length;
  let score = 0;

  if (length >= 10) score += 1;
  if (length >= 14) score += 1;
  if (length >= 20) score += 1;
  if (variety >= 2) score += 1;
  if (variety >= 3) score += 1;
  if (variety === 4) score += 1;

  if (score <= 2) {
    return {
      label: "Débil",
      value: 25,
      className: "bg-rose-500",
      badgeClassName: "border-rose-400/50 bg-rose-500/15 text-rose-100",
    };
  }

  if (score <= 4) {
    return {
      label: "Media",
      value: 50,
      className: "bg-amber-400",
      badgeClassName: "border-amber-300/50 bg-amber-400/15 text-amber-100",
    };
  }

  if (score <= 5) {
    return {
      label: "Fuerte",
      value: 75,
      className: "bg-emerald-400",
      badgeClassName: "border-emerald-300/50 bg-emerald-400/15 text-emerald-100",
    };
  }

  return {
    label: "Muy fuerte",
    value: 100,
    className: "bg-cyan-300",
    badgeClassName: "border-cyan-300/50 bg-cyan-300/15 text-cyan-100",
  };
}
