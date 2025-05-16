export const partidosMock = [
  { id: 1, label: "Jugador 1 vs Jugador 2" },
  { id: 2, label: "Jugador 3 vs Jugador 4" },
];

export const jugadoresMock = [
  { nombre: "Jugador 1", puntos: 34 },
  { nombre: "Jugador 2", puntos: 48 },
];

export const seriesMock = [
  { id: 1, puntaje1: 15, puntaje2: 21 },
  { id: 2, puntaje1: 19, puntaje2: 27 },
];

export const bracketData = {
  rounds: [
    {
      title: "Cuartos",
      seeds: [
        { id: 1, teams: ["Jugador 1", "Jugador 2"], score: [0, 0] },
        { id: 2, teams: ["Jugador 3", "Jugador 4"], score: [0, 0] },
      ],
    },
    {
      title: "Semis",
      seeds: [
        { id: 3, teams: ["Ganador 1", "Ganador 2"], score: [0, 0] },
      ],
    },
    {
      title: "Final",
      seeds: [
        { id: 4, teams: ["Ganador Semis", "Ganador Semis"], score: [0, 0] },
      ],
    },
  ],
};
