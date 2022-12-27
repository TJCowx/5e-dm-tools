type Combatant = {
  id: string;
  name: string;
  initiative: number;
  initiativeModifier: number;
  isPlayer: boolean;
  isDead: boolean;
};

export default Combatant;
